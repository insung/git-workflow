# git-workflow

A Codex and Claude Code plugin that connects Issue intent, scope and acceptance criteria to plans, implementation evidence, PR review and approved delivery.

Issue → plan/todos → implementation, tests and scoped commits → PR → spec-it review → approved merge.

| Skill | Responsibility |
| --- | --- |
| git-workflow | Stage routing, shared boundaries, plan/todo implementation |
| issue-create | Reuse/create or complete the Issue intent, scope and acceptance criteria |
| plan-create | Write the Issue-based plan, verification/deployment plans and task todos |
| pr-create | Prepare the implemented change and its PR/review handoff |
| pr-review | Review intent, plan/todos, diff/commits, pinned policy and test evidence |
| pr-merge | Match reviewed HEAD, apply human approval, confirm the actual merge |
| commit-rule | Scoped commits, messages and index preservation |
| branch-strategy | dev/feature/prod/hotfix roles, branching and integration policy |
| git-release | Fixed-range release notes, approved tags/releases |

[한국어 안내](README.ko.md) · [Full workflow and forms](docs/workflow.md) · [Local pilot](docs/testing/local-pilot.md)

## Package layout

```text
skills/
├── git-workflow/       # router + shared change/writing conventions, labels and links
├── issue-create/       # Issue form in references/
├── plan-create/        # Plan and focused todo forms in references/
├── pr-create/          # PR and implementation handoff forms
├── pr-review/          # policy and intent review form
├── pr-merge/           # approved merge and result confirmation
├── commit-rule/        # commit-message and scope references
├── branch-strategy/    # branch strategy reference
└── git-release/        # release-note reference
```

Read the current stage's reference when writing the corresponding output. Forms live in these authoritative references. Feature and bug Issues use separate template files; there is no duplicate root templates/ tree. Existing target-repository templates and policy pins take precedence. GitHub forms are not automatically installed into target repositories.

## Documentation and labels

Store plan.md, todos.md or 01-todos.md, handoff.md and review.md according to the [canonical plan path rules](skills/plan-create/references/plan.md#경로와-준비-조건). Every plan connects the Issue context and intent to work units, verification and deployment/rollback. Issue/PR updates contain summaries and verified document links.

PR creation and merging require an Issue field verified against an actual remote Issue, its scope and acceptance criteria. PR references, inaccessible or mismatched Issues block those actions; a local-draft is not a substitute. See the [Issue linkage contract](skills/git-workflow/references/issue-link.md).

Use existing repository labels and automation rules. Create only necessary missing labels when creation is authorized and write access is available; never force-update existing labels or provision the entire suggested list. Missing access is a reported limitation, not proof that labels do not exist.

## Installation

Version 0.2.0 is prepared on `feat/issue-review-workflow`. Pin the marketplace to that branch for this version; the default branch is updated only after its merge is approved. These commands install the remote branch after it has been pushed.

```sh
codex plugin marketplace add insung/git-workflow --ref feat/issue-review-workflow
codex plugin add git-workflow@git-workflow
claude plugin marketplace add insung/git-workflow@feat/issue-review-workflow
claude plugin install git-workflow@git-workflow
```

If the marketplace is already registered, verify that its configured ref is `feat/issue-review-workflow`, refresh that marketplace, and update the installed plugin. Follow the installed CLI’s result before claiming that an existing registration changed.

After publishing/updating, verify discovery in a fresh session. Claude's plugin skill form is `/git-workflow:issue-create`; Codex's actual names are verified at host loading time. Use explicit source-file instructions for the current local pilot.

## Validation and limits

```sh
node --test tests/package.test.mjs
node scripts/check-package.mjs
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
git diff --check
```

Node.js 18+; no dependencies. Structural checks do not prove semantic review accuracy or actual host loading. The package provides instructions, not an Actions/EC2 executor or automatic CI enforcement. Merge and deployment are separate states and permissions. `.superpowers/` is ignored execution scratch; shared plans and evidence remain in docs/.

## Examples (illustrative)

These examples explain the workflow. They are not evidence of actual ownership, test results, deployment or authorization.

### 1. Commit from a shared working tree

The user identifies src/retry.ts and tests/retry.test.ts as the current change and docs/team-plan.md as separate work. Review the diff and commit conventions before staging only the approved changes.

```bash
git add -- src/retry.ts tests/retry.test.ts
git diff --cached --check
git diff --cached
```

Run the required checks, record actual results and create the requested commit. Confirm that docs/team-plan.md remains untouched. If changes share a file, use [scope](skills/commit-rule/references/scope.md) to separate them.

### 2. Define the branch strategy

Use [branch-strategy](skills/branch-strategy/SKILL.md) to compare the repository with the confirmed development flow: feature branches start from dev and return to dev; deployment changes move from dev to prod. Hotfix branches normally start from prod, return to prod and are then reflected in dev. Releases record tags on the selected prod commit.

Check the actual deployment trigger and merge policy before changing repository configuration. A strategy review alone does not authorize creating branches or changing protection settings.

### 3. Write release notes from Git history

Fix the previous release and target prod commit, then compare ancestry, history and changed files.

```bash
git merge-base --is-ancestor v1.4.0 <target>
git log --first-parent --format='%h %s' v1.4.0..<target>
git log --format='%H %s%n%b' v1.4.0..<target>
git diff --name-status v1.4.0 <target>
```

Group related commits by the observable user outcome. For example:

> Temporary request failures explain whether retry is possible; expired requests do not suggest retrying.

Do not add unverified test results, deployment claims or dates. If the target is not a confirmed release point, keep the notes as an Unreleased draft.

Wiki writing is deferred to a future separate skill and is outside the current plugin scope.
