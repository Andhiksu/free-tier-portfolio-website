import { spawnSync } from "node:child_process";
import console from "node:console";
import process from "node:process";

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const placeholderEnvironment = {
  ...process.env,
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID || "ci000000",
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET || "ci",
};

const checks = [
  { command: "git", args: ["diff", "--check", "HEAD"] },
  { command: pnpm, args: ["format:check"] },
  { command: pnpm, args: ["lint"] },
  { command: pnpm, args: ["type-check"] },
  { command: pnpm, args: ["test"] },
  { command: pnpm, args: ["starter:validate"] },
  {
    command: pnpm,
    args: ["schema:validate"],
    environment: placeholderEnvironment,
  },
  {
    command: pnpm,
    args: ["build"],
    environment: placeholderEnvironment,
  },
];

for (const check of checks) {
  const result = spawnSync(check.command, check.args, {
    cwd: process.cwd(),
    env: check.environment ?? process.env,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
