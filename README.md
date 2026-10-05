# git-workflow

**Carry one change from Issue intent to an approved merge on the same evidence.**

**English** · [한국어](README.ko.md)

git-workflow is a Codex and Claude Code plugin for Issue-based changes. It records what the requester wants as Issue acceptance criteria, splits the work into a plan and step todos, and carries those IDs through implementation, tests, the PR and review. Each stage reads the previous stage's intent and actual results instead of a summary from memory.

The plugin is a set of instructions, not a CI service. One chat can coordinate the workflow. A session that writes or reads independent review criteria or inputs cannot implement that change; use a separate implementation session.

## Why

- **Intent and evidence stay connected** — acceptance criteria IDs from the Issue are referenced by todos, test cases, the handoff and the review.
- **Reviews cross-check for missing tests** — pr-review maps every acceptance scenario to its implementation and its assertion, and reports scenarios with no test.
- **Each risky step has its own approval** — commit, push, PR, merge, deployment and release are separate actions; approval for one does not extend to another or to a new HEAD.
- **Target repositories use the same forms** — workflow-init installs Issue and PR templates that contain the fields the skills require.

## Choose your next request

Start with the result you want. The router reads the Issue and recorded work to choose the next stage; you can also name a skill directly.

| Your situation | Example request | Skill |
| --- | --- | --- |
| New repository | “Install Issue and PR templates in this repository.” | template-init |
| Adopt the workflow | “Propose a git-workflow declaration for AGENTS.md.” | agents-init; explicit approval before the addition |
| New change | “Create an Issue for retry guidance; keep expired guidance unchanged.” | issue-create |
| Ready Issue | “Write the implementation plan for Issue #12.” | plan-create |
| Prepared step | “Implement step 01 of Issue #12 and record its tests.” | task-implement |
| Implementation ready | “Prepare the handoff and PR for Issue #12.” | pr-create |
| Review needed | “Review this PR against its Issue, plan and actual test evidence.” | pr-review |
| Reviewed HEAD | “Merge this approved PR using the agreed method.” | pr-merge; approval applies to that PR and HEAD |
| Work ended | “Close Issue #12 with its confirmed outcome and close reason.” | issue-close; closure and comments have their own scope |

Use commit-rule for a scoped commit, branch-strategy for branch roles, and git-release for a release. These requests do not authorize the other actions automatically. The skill table below links to each rule.

Read the Issue for the intended result, the plan for shared decisions and stage order, the task for execution results, and the handoff for detailed evidence. A review gives the independent verdict and necessary action. Separate roles share the plan’s purpose and decisions; implementation does not receive the private review inputs. See [document roles and handoff](skills/git-workflow/references/document-links.md).

## How it works

```mermaid
flowchart TD
    A[Request] --> B[issue-create: Issue with acceptance criteria]
    B --> C[plan-create: plan and step todos]
    C --> D[task-implement: implement, test, record and commit each step]
    D --> E[pr-create: handoff and PR]
    E --> F[pr-review: intent, implementation and test cross-check]
    F -->|fail or missing evidence| D
    F -->|pass| G[User approves PR, HEAD and merge method]
    G --> H[pr-merge: merge and confirm MERGED]
    H --> J[Authorized cleanup with preservation checks]
    J --> K[issue-close: close reason and result comment]
    H -. separate approval .-> I[git-release: notes, tag and Release]
```

Cleanup reports remote branches, local branches and worktrees separately. Dirty, shared, locked, protected and post-review work is preserved. Codex managed worktrees use archive management. Read the [cleanup policy](skills/pr-merge/references/post-merge-cleanup.md). Closure comments belong to issue-close when installed; otherwise evidence remains in a local handoff. Small follow-up changes reuse an open Issue only when intent, scope and AC match; a different scope after closure needs a new linked Issue.

| Skill | Use it to |
| --- | --- |
| [git-workflow](skills/git-workflow/SKILL.md) | Start or resume an Issue-based change and choose the next stage |
| [workflow-init](skills/workflow-init/SKILL.md) | Initialize selected templates, AGENTS.md, labels and release categories |
| [agents-init](skills/agents-init/SKILL.md) | Propose a short git-workflow declaration for AGENTS.md and add it after explicit approval |
| [issue-create](skills/issue-create/SKILL.md) | Write or complete an Issue, check for duplicates first |
| [plan-create](skills/plan-create/SKILL.md) | Write the plan and step todos for an Issue |
| [task-implement](skills/task-implement/SKILL.md) | Implement a prepared todo in table order, record results, commit each step and write the handoff |
| [pr-create](skills/pr-create/SKILL.md) | Write the implementation handoff and open the PR |
| [pr-review](skills/pr-review/SKILL.md) | Check that the change meets the Issue intent and that no test is missing |
| [pr-merge](skills/pr-merge/SKILL.md) | Confirm the approved merge, safely clean up the work and hand off closure evidence |
| [issue-close](skills/issue-close/SKILL.md) | Close an Issue with a close reason and a result comment |
| [commit-rule](skills/commit-rule/SKILL.md) | Make scoped commits and write commit messages |
| [branch-strategy](skills/branch-strategy/SKILL.md) | Define branch roles or create a branch |
| [git-release](skills/git-release/SKILL.md) | Prepare release notes, tags and GitHub Releases |
| [template-init](skills/template-init/SKILL.md) | Install the Issue and PR templates into a target repository |

Work documents (plan.md, `task-{nn}-{step-title}.md`, handoff.md, review.md) live in the target repository under the [directory rules](skills/plan-create/references/plan.md#디렉토리-규칙). The review criteria (`review-criteria.md`) and fixed inputs (`review-input-<topic>.md`) are written before implementation and kept on the `review/issue-{n}` branch; they appear in the work directory only after the pr-review record commit. See the [storage rule](skills/plan-create/references/review-criteria.md#보관-위치).

## spec-it

[spec-it](https://github.com/insung/spec-it) is a separate plugin that pins a project's architecture and product policies. A project adopts it by committing `.architecture/manifest.yaml` and `.architecture/lock.yaml`. git-workflow does not require spec-it.

| Project state | pr-review behavior |
| --- | --- |
| Adopted (manifest and lock present) | Runs the intent, implementation and test cross-check, then applies the [spec-it policy check](skills/pr-review/references/spec-it-policy.md) against the pinned rules and records verdicts by rule ID |
| Not adopted | Runs the intent, implementation and test cross-check only, records "spec-it not adopted", and makes no policy verdict |

## Installation

### Claude Code

```sh
claude plugin marketplace add insung/git-workflow
claude plugin install git-workflow@git-workflow
```

### Codex

```sh
codex plugin marketplace add insung/git-workflow
codex plugin add git-workflow@git-workflow
```

Start a new session after installing or updating. In Claude Code the skills appear as `/git-workflow:<skill>`.

### First run in a target repository

Use [workflow-init](skills/workflow-init/SKILL.md) to select templates, an AGENTS.md declaration, GitHub labels, or release categories. Broad installation requests wait for selection; explicit partial requests apply only those items. Labels preview differences before approved missing-only creation; existing release settings are preserved.

Ask the agent to install the GitHub templates, for example "Install the git-workflow Issue and PR templates in this repository". template-init copies only the files that do not exist yet and reports how existing templates differ.

Ask "Initialize this project’s AGENTS.md for git-workflow" to use [agents-init](skills/agents-init/SKILL.md): it proposes a declaration for an individual project or a root containing multiple projects, then adds it only after explicit approval while preserving existing bytes. The declaration makes the main agent coordinate approved stages and independently validate a separate implementer’s work; see the skill for the declaration and the [role-specific reading order](skills/git-workflow/references/document-links.md#문서별-역할과-읽기-순서) for shared context and handoff.

## Architecture

```text
skills/
├── git-workflow/      router, execution boundaries, conventions, labels, links
├── agents-init/       approved short AGENTS.md declaration
├── issue-create/      Issue content rules
├── plan-create/       plan and todo forms
├── task-implement/    step implementation and todo recording rules
├── pr-create/         PR rules and handoff form
├── pr-review/         review form and spec-it policy check
├── pr-merge/          approved merge
├── issue-close/       close reasons and closing comment form
├── commit-rule/       commit message and scope rules
├── branch-strategy/   branch roles and creation
├── git-release/       release notes
├── workflow-init/     selected setup, canonical assets and label tool
└── template-init/     template compatibility entrypoint
```

Each rule has one canonical file. SKILL.md files link to their references instead of repeating them.

## Development

Requirements: Node.js 18 or newer. No dependencies.

```sh
node --test tests/package.test.mjs
node scripts/check-package.mjs
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
git diff --check
```

These checks cover package structure, manifests, required files and relative links. They do not measure skill selection or review quality; skill changes are checked with before-and-after scenarios, run as defined in [verification runners](skills/git-workflow/references/execution-boundaries.md#검증-실행-주체).

## Examples

The [examples](docs/examples/README.md) show filled document sets and flows. The [before-and-after records](docs/examples/readable-records/README.md) show how to preserve meaning while making the conclusion and next action easier to find.

| Example | Flow |
| --- | --- |
| [git-workflow v0.3.0 (real case)](docs/examples/git-workflow-v0.3.0/README.md) | Review, Issue, plan with comments, fixed review criteria, separate implementation session, independent review, merge and release |
| [Python version upgrade](docs/examples/python-version-upgrade/README.md) | Issue, plan, step todos, handoff, PR and review |
| [Resume an existing Issue](docs/examples/resume-existing-issue/README.md) | Continue another session's work from its documents |
| [Review rework](docs/examples/review-rework/README.md) | Fix review findings and review the new HEAD |
| [Crawler startup hotfix](docs/examples/crawler-startup-hotfix/README.md) | Fix from prod and reflect the fix into dev |
| [Production release](docs/examples/production-release/README.md) | dev to prod, deployment and release notes |
| [Local pilot](docs/examples/python-version-upgrade/local-pilot.md) | Prepare documents without GitHub access |

## License

[MIT](LICENSE)
