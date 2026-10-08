"""Create a synthetic Git/Issue history for the public Issue #56 scenario."""
import json
from pathlib import Path
import subprocess
import sys


def create(destination):
    root = Path(destination)
    root.mkdir(parents=True, exist_ok=False)
    repo = root / 'repo'
    repo.mkdir()

    def git(*args):
        return subprocess.check_output(['git', '-C', str(repo), *args], text=True).strip()

    git('init', '-q', '-b', 'main')
    git('config', 'user.name', 'Fixture')
    git('config', 'user.email', 'fixture@example.invalid')
    commits = {}

    def commit(key, files, message):
        for name, content in files.items():
            path = repo / name
            if content is None:
                path.unlink()
            else:
                path.write_text(content)
        git('add', '--all')
        git('commit', '-q', '-m', message)
        commits[key] = git('rev-parse', 'HEAD')

    commit('intro', {'policy.py': 'TIMEOUT = 5\n', 'logs.md': '# Raw logs\nverbose trace\n',
                     'manifest.json': '{"version":"1.1.0"}\n'},
           'feat(timeout): initial timeout\n\nRefs: #8')
    commit('version', {'manifest.json': '{"version":"1.2.0"}\n'},
           'chore(release): prepare version\n\nRefs: #10')
    commit('cleanup', {'logs.md': None, 'results.md': '# Results\nCore checks passed; original logs remain in Git history.\n'},
           'docs(records): summarize logs\n\nRefs: #10')
    commit('timeout', {'policy.py': 'TIMEOUT = 10\n'},
           'fix(timeout): update timeout\n\nRefs: #10')
    commit('unknown', {'release-note.md': '# Release\nOperators should use blue mode.\n'},
           'docs(release): add operator note\n\nRefs: #10')
    data = {
        'synthetic': True,
        'issues': {
            '8': {'request': 'Avoid waiting indefinitely; initial timeout is 5.', 'ac': 'Initial timeout 5'},
            '10': {'requests': [
                {'id': 'R1', 'text': 'v1.2.0 preparation', 'ac': 'AC-01'},
                {'id': 'R2', 'text': 'Long raw logs are hard to read. Remove logs and retain core results and an original-history link.', 'ac': 'AC-02'},
                {'id': 'R3', 'text': 'Change production timeout from 5 to 10.', 'ac': 'AC-03'}]}},
        'prs': [
            {'number': 20, 'commit': commits['intro'], 'issue': 8, 'scope': 'initial timeout'},
            {'number': 21, 'commits': [commits['version'], commits['cleanup']], 'issue': 10,
             'mapping': {'manifest.json': 'R1 / AC-01', 'logs.md': 'R2 / AC-02'}},
            {'number': 22, 'commit': commits['timeout'], 'issue': 10, 'scope': 'R3 / AC-03'},
            {'number': 23, 'commit': commits['unknown'], 'issue': 10, 'scope': 'operator note; reason not recorded'}],
        'commits': commits,
        'head': git('rev-parse', 'HEAD')}
    (root / 'github.json').write_text(json.dumps(data, indent=2))
    return data


if __name__ == '__main__':
    print(json.dumps(create(sys.argv[1]), indent=2))
