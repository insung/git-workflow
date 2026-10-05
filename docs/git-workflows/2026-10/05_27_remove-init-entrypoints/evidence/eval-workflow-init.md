# Plugin Eval Report: workflow-init

## At a Glance
- Score: 72/100
- Grade: C
- Risk: high
- Checks: 1 fail, 3 warn, 2 info
- Active budget: 346 tokens (moderate)
- Observed usage: not supplied

## Why It Matters
- 1 failing error check are driving the highest-confidence problems.
- 3 warning signals still need cleanup before this feels polished.
- budget is the largest source of score loss at -14 points.
- Budget pressure is not the dominant issue right now.
- No observed usage is attached yet, so budget conclusions are still based on static estimates.

## Fix First
- [fail/error] deferred_cost_tokens is excessive relative to the current Codex baseline. Why: Budget pressure matters because always-loaded or frequently-loaded text can make the workflow feel expensive fast. Fix: Reduce repeated instruction text and move detail into deferred supporting files.
- [warn/warning] The description does not clearly advertise when the skill should trigger. Why: Best-practice gaps usually do not break the workflow immediately, but they make the skill harder to understand and improve. Fix: Rewrite the description to include a clear 'Use when ...' trigger sentence.
- [warn/warning] Python source files were found without matching test files. Why: Best-practice gaps usually do not break the workflow immediately, but they make the skill harder to understand and improve. Fix: Add `test_*.py` or `tests/` coverage for the main Python logic.

## Recommended Next Step
- Fix the top findings and rerun the report
- Why: A short pass on the highest-value findings will improve trust, readability, and the signal quality of future benchmarks.
- Chat request: "What should I fix first?"
- Local command: `plugin-eval start <implementation-worktree>/skills/workflow-init --request 'What should I fix first?' --format markdown`

## Details
<details>
<summary>Watch next</summary>

- [warn/warning] At least one Python function has high cyclomatic complexity. Why: Complexity findings matter because they increase review cost and make generated or helper code harder to change safely. Fix: Split complex functions into smaller helpers or guard clauses.
</details>
<details>
<summary>Improvement brief</summary>

- Raise the evaluation from grade C (72/100) with a focus on the highest-signal structural and budget issues first.
- Goal: Rewrite the description to include a clear 'Use when ...' trigger sentence.
- Goal: Reduce repeated instruction text and move detail into deferred supporting files.
- Goal: Split complex functions into smaller helpers or guard clauses.
- Goal: Add `test_*.py` or `tests/` coverage for the main Python logic.
- Measure: token-usage-observer
- Measure: task-outcome-scorecard
- Suggested prompt: Use the skill-creator guidance to improve workflow-init. Keep the structure compact and move bulky details into references or scripts. Define success measures with these toolsets: token-usage-observer, task-outcome-scorecard. Address deferred_cost_tokens-budget-high: deferred_cost_tokens is excessive relative to the current Codex baseline. Address description-trigger-weak: The description does not clearly advertise when the skill should trigger. Address py-complexity-high: At least one Python function has high cyclomatic complexity. Address py-tests-missing: Python source files were found without matching test files.
</details>
<details>
<summary>Budgets and observed usage</summary>

- trigger_cost_tokens: 26 (good)
- invoke_cost_tokens: 320 (moderate)
- deferred_cost_tokens: 4246 (excessive)
- total_tokens: 4592 (excessive)

- No observed usage supplied.
</details>
<details>
<summary>Measurement plan</summary>

Combine cost, outcome, and trust signals so you can tell whether the skill or plugin is genuinely helping instead of only looking well-structured on paper.

- Token Usage Observer [high] Measure how many tokens the skill or plugin actually burns in representative runs. Signals: observed_usage_sample_count, observed_input_tokens_avg, observed_total_tokens_avg, estimate_vs_observed_input_ratio. Evidence: Responses API usage logs, Codex-like session exports, JSONL traces captured from local benchmarking harnesses.
- Task Outcome Scorecard [high] Measure whether the skill helps users finish the intended job with fewer retries and less cleanup. Signals: task_success_rate, first_pass_success_rate, retry_rate, human_override_rate. Evidence: Task run logs, Structured user acceptance checklist, Before/after comparison runs on the same prompts.
- Tool Call Audit [medium] Check whether the agent uses the right tools, arguments, and sequencing when the skill is active. Signals: tool_call_success_rate, invalid_tool_argument_rate, recoverable_tool_failure_rate. Evidence: Tool invocation traces, Recorded sessions, Golden-path scenario replays.
- Latency And Efficiency [medium] Track whether the skill speeds users up enough to justify its cost. Signals: p50_time_to_first_acceptable_answer_seconds, p95_time_to_task_completion_seconds, tokens_per_successful_run. Evidence: Benchmark harness timings, Manual stopwatch runs on canonical tasks, Responses API timestamps combined with usage logs.
- Human Rubric Review [medium] Capture clarity, trust, and usefulness signals that automated checks will miss. Signals: clarity_score_avg, confidence_score_avg, follow_up_question_rate. Evidence: Reviewer scorecards, Team rubric sheets, Annotated transcripts.
- Regression Suite [medium] Protect the repository behavior that the skill is supposed to improve. Signals: test_pass_rate, lint_pass_rate, regression_escape_count. Evidence: Unit and integration test runs, Coverage deltas, Snapshot or golden-file checks.
</details>
<details>
<summary>Use From Codex Chat</summary>

Start with a natural chat request, then let plugin-eval show the exact local command sequence behind it.

Start with this chat request: "Evaluate this skill."
Why this path: Plugin Eval recommended Evaluate Skill from the current local state for this skill.
Quick local entrypoint: plugin-eval start <implementation-worktree>/skills/workflow-init --request 'Evaluate this skill.' --format markdown
Plugin Eval will run first: plugin-eval analyze <implementation-worktree>/skills/workflow-init --format markdown

Other chat requests you can use:
- Full Skill Analysis: say "Give me a full analysis of this skill, including benchmark setup." -> plugin-eval analyze <implementation-worktree>/skills/workflow-init --format markdown
- Evaluate Skill: say "Evaluate this skill." -> plugin-eval analyze <implementation-worktree>/skills/workflow-init --format markdown
- Explain Token Budget: say "Explain the token budget for this skill." -> plugin-eval explain-budget <implementation-worktree>/skills/workflow-init --format markdown
- Measure Real Token Usage: say "Measure the real token usage of this skill." -> plugin-eval init-benchmark <implementation-worktree>/skills/workflow-init
- Benchmark With Starter Scenarios: say "Help me benchmark this skill." -> plugin-eval init-benchmark <implementation-worktree>/skills/workflow-init
- Start Here: say "What should I run next?" -> plugin-eval analyze <implementation-worktree>/skills/workflow-init --format markdown
</details>
<details>
<summary>Checks</summary>

- [WARN] description-trigger-weak: The description does not clearly advertise when the skill should trigger. Evidence: Descriptions are the primary auto-load surface in Codex. Remediation: Rewrite the description to include a clear 'Use when ...' trigger sentence.
- [FAIL] deferred_cost_tokens-budget-high: deferred_cost_tokens is excessive relative to the current Codex baseline. Evidence: Value: 4246 tokens Baseline samples: skills=0, plugins=176 Remediation: Reduce repeated instruction text and move detail into deferred supporting files.
- [WARN] py-complexity-high: At least one Python function has high cyclomatic complexity. Evidence: Max complexity: 59 Remediation: Split complex functions into smaller helpers or guard clauses.
- [WARN] py-tests-missing: Python source files were found without matching test files. Evidence: Source files: 1 Remediation: Add `test_*.py` or `tests/` coverage for the main Python logic.
- [INFO] coverage-artifacts-unavailable: No coverage artifacts were found for this target. Evidence: skills/workflow-init Remediation: Generate `lcov.info`, `coverage.xml`, or an Istanbul coverage JSON file if you want coverage scoring.
</details>
<details>
<summary>Metrics</summary>

- skill_line_count: 28 lines (good)
- description_length_chars: 87 chars (good)
- relative_link_count: 5 links (good)
- code_fence_count: 0 blocks (good)
- support_file_count: 11 files (good)
- trigger_cost_tokens: 26 tokens (good)
- invoke_cost_tokens: 320 tokens (moderate)
- deferred_cost_tokens: 4246 tokens (excessive)
- py_file_count: 1 files (good)
- py_function_count: 9 functions (good)
- py_max_cyclomatic_complexity: 59 score (heavy)
- py_average_function_length: 15.67 lines (good)
- py_max_nesting_depth: 8 levels (heavy)
- py_comment_ratio: 0.021 ratio (moderate)
- py_test_file_count: 0 files (moderate)
- coverage_artifact_count: 0 files (info)
</details>
<details>
<summary>Score details</summary>

- Starting score: 100
- Total deductions: -27.75
- Final score: 72
- Risk: Contains 1 failing error check (deferred_cost_tokens-budget-high).
- Risk: Contains 3 warning signals that still need attention.

- -14 points: deferred_cost_tokens-budget-high [fail/error] deferred_cost_tokens is excessive relative to the current Codex baseline.
- -4.5 points: description-trigger-weak [warn/warning] The description does not clearly advertise when the skill should trigger.
- -4.5 points: py-complexity-high [warn/warning] At least one Python function has high cyclomatic complexity.
- -4.5 points: py-tests-missing [warn/warning] Python source files were found without matching test files.
- -0.25 points: coverage-artifacts-unavailable [info/info] No coverage artifacts were found for this target.

- budget: -14 points across 1 check
- best-practice: -9 points across 2 checks
- complexity: -4.5 points across 1 check
- coverage: -0.25 points across 1 check
</details>
