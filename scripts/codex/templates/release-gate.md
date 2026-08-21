# Portfolio Release Gate

## Target

- Action requiring approval: `<push | create/update PR | merge | deploy | cleanup>`
- Branch: `<branch>`
- Expected head SHA: `<sha>`
- Base branch or production target: `<target>`

## Required evidence

- [ ] Worktree, staging area, and untracked set are clean.
- [ ] Branch and exact head match the approved target.
- [ ] Changed-file scope matches the milestone.
- [ ] Required local checks pass.
- [ ] Applicable CI passes for the exact head.
- [ ] Review threads and serious findings are resolved or explicitly escalated.
- [ ] No secret, private evidence, or unapproved content is included.
- [ ] Rollback or normal revert path is documented.
- [ ] Current deployment and production state are verified rather than inferred.

## Gate rule

Request one explicit approval for the exact action and target above. Do not treat approval for this
gate as approval for a later merge, deployment, production change, or branch cleanup. Do not perform
remote writes while preparing this gate.
