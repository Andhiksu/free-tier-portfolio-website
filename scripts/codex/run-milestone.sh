#!/bin/sh

set -eu

EXIT_HUMAN_GATE=20
EXIT_BLOCKED=30
EXIT_FAILED=40

usage() {
  cat <<'EOF'
Usage:
  scripts/codex/run-milestone.sh [--dry-run] <milestone> <objective...>
  scripts/codex/run-milestone.sh [--dry-run] --resume <session-id> <milestone> <follow-up...>
  scripts/codex/run-milestone.sh --help

Examples:
  scripts/codex/run-milestone.sh maintenance-a11y "Fix the approved keyboard-navigation defect"
  scripts/codex/run-milestone.sh --resume <session-id> maintenance-a11y "The owner answered the exact product gate; continue locally"

Behavior:
  - Provides an optional Codex adapter for the provider-neutral repository milestone loop.
  - Runs Codex in workspace-write with on-request approvals.
  - Loads the repository milestone-loop skill and structured report schema; neither overrides
    docs/GOVERNANCE.md.
  - Stores prompts, JSONL events, reports, and resume state under the system temporary directory.
  - Reject the task before invocation if a secret, credential, or private evidence is required; do
    not pass sensitive values in milestone arguments.
  - Never performs a remote Git, PR, merge, deployment, or branch-cleanup action itself.

Exit codes:
  0   local milestone completed
  20  exact human gate required
  30  milestone blocked
  40  runner, Codex, or structured-report failure
EOF
}

fail() {
  printf '%s\n' "Error: $*" >&2
  exit "$EXIT_FAILED"
}

DRY_RUN=false
RESUME_ID=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --help|-h)
      usage
      exit 0
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --resume)
      [ "$#" -ge 2 ] || fail "--resume requires a session id."
      RESUME_ID=$2
      shift 2
      ;;
    --)
      shift
      break
      ;;
    -*)
      fail "Unknown option: $1"
      ;;
    *)
      break
      ;;
  esac
done

[ "$#" -ge 2 ] || {
  usage >&2
  exit "$EXIT_FAILED"
}

MILESTONE=$1
shift
OBJECTIVE=$*

case "$MILESTONE" in
  *[!a-z0-9._-]*|'') fail "Milestone must use lowercase letters, digits, dots, underscores, or hyphens." ;;
esac

command -v codex >/dev/null 2>&1 || fail "codex CLI is not available."
command -v node >/dev/null 2>&1 || fail "Node.js is not available."

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd -P)
SCHEMA="$SCRIPT_DIR/schemas/milestone-report.schema.json"
TASK_TEMPLATE="$SCRIPT_DIR/templates/milestone-task.md"

[ -f "$SCHEMA" ] || fail "Missing report schema: $SCHEMA"
[ -f "$TASK_TEMPLATE" ] || fail "Missing milestone template: $TASK_TEMPLATE"
[ -f "$REPO_ROOT/AGENTS.md" ] || fail "Repository root could not be verified."

STATE_ROOT="${TMPDIR:-/tmp}/free-tier-portfolio-website-codex"
RUN_DIR="$STATE_ROOT/$MILESTONE-$(date +%Y%m%dT%H%M%S)-$$"
PROMPT_FILE="$RUN_DIR/prompt.md"
EVENT_LOG="$RUN_DIR/events.jsonl"
REPORT_FILE="$RUN_DIR/report.json"
STATE_FILE="$RUN_DIR/resume.txt"

if [ "$DRY_RUN" = true ]; then
  printf '%s\n' "Dry run only; Codex will not start."
  printf '%s\n' "Repository: $REPO_ROOT"
  printf '%s\n' "Milestone: $MILESTONE"
  printf '%s\n' "Mode: $([ -n "$RESUME_ID" ] && printf resume || printf new)"
  printf '%s\n' "Sandbox: workspace-write"
  printf '%s\n' "Approval policy: on-request"
  printf '%s\n' "Schema: $SCHEMA"
  printf '%s\n' "Temporary state root: $STATE_ROOT"
  exit 0
fi

if [ -z "$RESUME_ID" ] && [ -n "$(git -C "$REPO_ROOT" status --porcelain)" ]; then
  fail "A new milestone requires a clean worktree. Resume the prior session or resolve the existing changes first."
fi

mkdir -p "$RUN_DIR"

{
  printf '%s\n\n' 'Use $portfolio-milestone-loop for this task.'
  printf '%s\n\n' 'Read scripts/codex/templates/milestone-task.md and instantiate it from the current repository state and accepted decisions.'
  printf '%s\n\n' '## Current invocation'
  printf '%s\n' "- Milestone: $MILESTONE"
  printf '%s\n' "- Objective or gate follow-up: $OBJECTIVE"
  printf '%s\n' '- Treat docs/GOVERNANCE.md as the sole durable governance authority.'
  printf '%s\n' '- Treat AGENTS.md as the concise operating entry point and accepted ADRs as decision records.'
  printf '%s\n' '- Do not perform remote writes or other human-gated actions.'
} >"$PROMPT_FILE"

cd "$REPO_ROOT"

if [ -n "$RESUME_ID" ]; then
  if ! codex exec resume \
    -c 'sandbox_mode="workspace-write"' \
    -c 'approval_policy="on-request"' \
    --json \
    --output-schema "$SCHEMA" \
    --output-last-message "$REPORT_FILE" \
    "$RESUME_ID" \
    "$(cat "$PROMPT_FILE")" >"$EVENT_LOG"; then
    fail "Codex resume failed. Inspect temporary events at $EVENT_LOG"
  fi
else
  if ! codex exec \
    --cd "$REPO_ROOT" \
    --sandbox workspace-write \
    -c 'approval_policy="on-request"' \
    --json \
    --output-schema "$SCHEMA" \
    --output-last-message "$REPORT_FILE" \
    "$(cat "$PROMPT_FILE")" >"$EVENT_LOG"; then
    fail "Codex execution failed. Inspect temporary events at $EVENT_LOG"
  fi
fi

[ -s "$REPORT_FILE" ] || fail "Codex did not produce a structured report."

THREAD_ID=$(node -e '
const fs = require("fs");
for (const line of fs.readFileSync(process.argv[1], "utf8").split(/\r?\n/)) {
  if (!line) continue;
  try {
    const event = JSON.parse(line);
    if (event.type === "thread.started" && event.thread_id) {
      process.stdout.write(event.thread_id);
      break;
    }
  } catch {}
}
' "$EVENT_LOG")

STATUS=$(node -e '
const fs = require("fs");
const report = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
if (!report || typeof report.status !== "string") process.exit(2);
process.stdout.write(report.status);
' "$REPORT_FILE") || fail "Structured report is not valid JSON with a status."

HUMAN_GATE_REQUIRED=$(node -e '
const fs = require("fs");
const report = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
if (!report || !report.human_gate || typeof report.human_gate.required !== "boolean") process.exit(2);
process.stdout.write(String(report.human_gate.required));
' "$REPORT_FILE") || fail "Structured report is missing a valid human gate."

if { [ "$STATUS" = human_gate_required ] && [ "$HUMAN_GATE_REQUIRED" != true ]; } ||
  { [ "$STATUS" != human_gate_required ] && [ "$HUMAN_GATE_REQUIRED" = true ]; }; then
  fail "Structured report status and human gate are inconsistent."
fi

if [ "$STATUS" = human_gate_required ] && [ -z "$THREAD_ID" ]; then
  fail "A human gate report must include a resumable Codex session id."
fi

{
  printf '%s\n' "Milestone: $MILESTONE"
  printf '%s\n' "Session: $THREAD_ID"
  printf '%s\n' "Report: $REPORT_FILE"
  printf '%s\n' "Events: $EVENT_LOG"
} >"$STATE_FILE"

cat "$REPORT_FILE"
printf '\n%s\n' "Temporary report: $REPORT_FILE" >&2
[ -z "$THREAD_ID" ] || printf '%s\n' "Resume session: $THREAD_ID" >&2

case "$STATUS" in
  completed) exit 0 ;;
  human_gate_required) exit "$EXIT_HUMAN_GATE" ;;
  blocked) exit "$EXIT_BLOCKED" ;;
  failed) exit "$EXIT_FAILED" ;;
  *) fail "Unsupported report status: $STATUS" ;;
esac
