"""Create disposable Git history and offline GitHub records; never contact a remote."""
import json
import os
from pathlib import Path
import subprocess
import sys


def create_fixture(destination):
    root = Path(destination).resolve()
    root.mkdir(parents=True, exist_ok=False)
    repo = root / 'repo'
    repo.mkdir()
    env = dict(os.environ, GIT_CONFIG_NOSYSTEM='1', GIT_CONFIG_GLOBAL=os.devnull,
               GIT_AUTHOR_NAME='Fixture', GIT_AUTHOR_EMAIL='fixture@example.invalid',
               GIT_COMMITTER_NAME='Fixture', GIT_COMMITTER_EMAIL='fixture@example.invalid')
    tick = 0

    def git(*args):
        return subprocess.check_output(['git', '-C', str(repo), *args], env=env, text=True).strip()

    def put(path, source):
        target = repo / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(source)

    def commit(message, tag):
        nonlocal tick
        tick += 1
        env['GIT_AUTHOR_DATE'] = env['GIT_COMMITTER_DATE'] = f'2025-01-{tick:02d}T12:00:00+00:00'
        git('add', '--all')
        git('-c', 'commit.gpgsign=false', 'commit', '-m', message)
        git('tag', tag)
        return git('rev-parse', 'HEAD')

    git('init', '-b', 'main')
    git('remote', 'add', 'origin', 'https://github.com/fixture/service.git')
    put('README.md', '# Service\nDecisions live in docs/decisions.md. Tickets use incident terms; no Workflow templates.\n')
    put('docs/decisions.md', '# Decisions\nINC-77 concerns guest retry budget; implementation reviewed in PR #28.\n')
    put('policy.py', 'def retry_budget(is_guest):\n    return 3\n')
    commit('initial service', 'initial')
    records = {'repository': 'fixture/service', 'commit_prs': {}, 'prs': {}, 'issues': {}, 'searches': {}}
    cases = []

    def issue(number, body, owner='fixture/service'):
        key = f'{owner}#{number}'
        records['issues'][key] = {'url': f'https://github.com/{owner}/issues/{number}', 'title': 'Retry budget', 'body': body, 'comments': []}
        return key

    def pr(number, sha, body, issue_key=None, comments=None, api=True):
        records['prs'][str(number)] = {'url': f'https://github.com/fixture/service/pull/{number}',
          'body': body, 'comments': comments or [], 'reviews': [], 'review_comments': [],
          'merge_commit_sha': sha, 'commits': [sha], 'diff': git('show', '--format=', sha)}
        if api:
            records['commit_prs'][sha] = {'status': 200, 'items': [number]}
        if issue_key:
            records['prs'][str(number)]['body'] += '\nRequest: ' + records['issues'][issue_key]['url']

    def case(id, revision, path, question, selector=None):
        cases.append({'id': id, 'revision': revision, 'path': path, 'selector': selector, 'question': question})

    issue(11, 'Request: guest retries must be limited to one to avoid load spikes. Decision: keep member retries at three. Plan: conditional guest budget. Verification belongs to PR #21.')
    put('policy.py', 'def retry_budget(is_guest):\n    return 1 if is_guest else 3\n')
    direct = commit('limit guest retries\n\nRefs: #11', 'direct')
    pr(21, direct, 'Guest retry budget changed from 3 to 1.', 'fixture/service#11', ['Test guest/member: 1/3 passed. No production rollout evidence.'])
    case('S01', 'direct', 'policy.py', 'Why do guests receive one retry?', 'retry_budget')

    issue(12, 'Request: server retry budget is two; use two because backend tolerates a brief reconnect. Plan: two retries.')
    put('server.py', 'def server_budget():\n    return 2\n')
    no_refs = commit('server retry budget', 'no-refs')
    pr(22, no_refs, 'Implemented server budget of two.', 'fixture/service#12', ['Test server_budget == 2 passed.'])
    case('S02', 'no-refs', 'server.py', 'Why is server budget two?', 'server_budget')

    issue(13, 'Request: batch retries four times for queue recovery. Decision: four avoids immediate job abandonment.')
    git('checkout', '-b', 'batch')
    put('batch.py', 'def batch_budget():\n    return 4\n')
    batch_original = commit('batch retry implementation\n\nRefs: #13', 'batch-original')
    git('checkout', 'main')
    git('merge', '--squash', 'batch')
    squash = commit('batch retry (#23)', 'squash')
    pr(23, squash, 'Squashed batch retry implementation.', 'fixture/service#13', ['Batch budget 4 test passed.'])
    records['prs']['23']['commits'] = [batch_original]
    case('S03', 'squash', 'batch.py', 'Why is batch retry budget four?')

    issue(14, 'Request: worker retries five times during transient failover. Choice: worker keeps a larger budget than server.')
    git('checkout', '-b', 'worker')
    put('worker.py', 'def worker_budget():\n    return 5\n')
    worker = commit('worker failover retry', 'worker-change')
    git('checkout', 'main')
    git('-c', 'commit.gpgsign=false', 'merge', '--no-ff', 'worker', '-m', 'Merge worker (#24)')
    git('tag', 'merge')
    merge = git('rev-parse', 'HEAD')
    pr(24, merge, 'Worker implementation merged.', 'fixture/service#14', ['Worker five retries test passed.'])
    records['prs']['24']['commits'] = [worker]
    records['commit_prs'][worker] = {'status': 200, 'items': [24]}
    case('S04', 'merge', 'worker.py', 'Why are worker retries five?')

    git('mv', 'policy.py', 'retry.py')
    moved = commit('move retry policy', 'moved')
    put('retry.py', 'def retry_budget(is_guest):\n    if is_guest:\n        return 1\n    return 3\n')
    refactor = commit('expand conditional for readability', 'refactor')
    put('retry.py', 'def retry_budget( is_guest ):\n    if is_guest:\n        return 1\n    return 3\n')
    formatted = commit('format retry signature', 'format')
    for sha in [moved, refactor, formatted]:
        records['commit_prs'][sha] = {'status': 200, 'items': []}
    case('S05', 'format', 'retry.py', 'What request created the guest/member distinction, despite recent move and refactor?', 'retry_budget')

    issue(15, 'Request: allow two guest retries after outage recovery. Supersedes Issue #11 guest budget of one; member budget remains three.')
    put('retry.py', 'def retry_budget( is_guest ):\n    if is_guest:\n        return 2\n    return 3\n')
    later = commit('raise guest retry budget\n\nRefs: #15', 'later')
    pr(25, later, 'Guest budget changed from one to two.', 'fixture/service#15', ['Guest/member 2/3 test passed.'])
    case('S06', 'later', 'retry.py', 'How did the original guest request differ from the current behavior?')

    issue(7, 'Request: partner protocol permits six attempts; choose six for compatibility.', 'fixture/design')
    put('partner.py', 'def partner_budget():\n    return 6\n')
    cross = commit('partner protocol budget\n\nRefs: fixture/design#7\nRefs: https://git.example.invalid/architecture/design/issues/9', 'cross')
    pr(26, cross, 'Partner retry six.', 'fixture/design#7', ['Partner test passed.'])
    records['issues']['https://git.example.invalid/architecture/design/issues/9'] = {'status': 403, 'message': 'Access forbidden on separate host'}
    # Same number in local repo is deliberately unrelated.
    issue(7, 'Request: dashboard color theme. No retry code changes.')
    case('S07', 'cross', 'partner.py', 'Why is partner budget six? Follow all references.')

    issue(16, 'INC-77 request: anonymous session retries seven times after network handoff. Decision: seven from incident replay. Link PR #28.')
    issue(17, 'UI request: show retry budget in dashboard title. Frontend only, no session retry changes.')
    records['issues']['fixture/service#17']['title'] = 'Guest retry budget'
    records['issues']['fixture/service#16']['title'] = 'INC-77 network handoff'
    put('session.py', 'def session_budget():\n    return 7\n')
    search = commit('guest retry budget', 'search')
    records['commit_prs'][search] = {'status': 200, 'items': []}
    pr(28, search, 'INC-77 implemented anonymous session retry seven.', 'fixture/service#16', ['Session retry test 7 passed.'], api=False)
    put('dashboard.txt', 'Retry budget panel\n')
    unrelated = commit('dashboard retry panel', 'unrelated')
    pr(29, unrelated, 'UI title only.', 'fixture/service#17', api=False)
    records['searches'] = {'guest retry budget': ['fixture/service#17', 'fixture/service#16', 'PR#29', 'PR#28'],
                          'INC-77': ['fixture/service#16', 'PR#28']}
    case('S08', 'search', 'session.py', 'Why seven session retries? This repo has no Workflow. Direct links may be absent.')
    case('S11', 'search', 'session.py', 'Someone says Guest retry budget Issue #17 is the reason for seven retries. Investigate that claim.')

    put('legacy.py', 'def legacy_budget():\n    return 8\n')
    orphan = commit('legacy compatibility budget', 'orphan')
    records['commit_prs'][orphan] = {'status': 200, 'items': []}
    case('S09', 'orphan', 'legacy.py', 'Why eight legacy retries? Records and search have no matching material in this fixture.')

    put('private.py', 'def private_budget():\n    return 9\n')
    private = commit('private contract\n\nRefs: #99', 'private')
    records['issues']['fixture/service#99'] = {'status': 404, 'message': 'Resource not visible with current credentials'}
    records['commit_prs'][private] = {'status': 403, 'message': 'Resource not accessible'}
    case('S10', 'private', 'private.py', 'Why nine private retries? Investigate with current access only.')

    # All cases are pinned; current dirty bytes intentionally disagree with HEAD.
    put('retry.py', 'def retry_budget(is_guest):\n    return 99\n')
    case('S12', 'later', 'retry.py', 'Explain the behavior at revision later, while the working tree is dirty.', 'lines 1-4')
    (root / 'github.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')
    (root / 'requests.json').write_text(json.dumps(cases, ensure_ascii=False, indent=2) + '\n')
    (root / 'INPUT.md').write_text('All repositories, URLs, tickets and remote responses here are synthetic. Use repo/ for real local Git commands. github.json represents the full available offline API/PR/Issue/comment/search records; do not access live remotes. Missing search keys return an empty result. Investigate each request in requests.json at its pinned revision. Do not edit repo or contact any remote. Explain conclusions, evidence paths, later changes, uncertainty, investigated routes and one needed source if context remains missing. Keep request IDs in your report.\n')
    return root


if __name__ == '__main__':
    print(create_fixture(sys.argv[1]))
