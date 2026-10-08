"""Verify raw fixture integrity, not the model's skill-following behavior."""
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('fixture', Path(__file__).parent / 'fixtures/git-history/create_fixture.py')
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class HistoryFixtureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.root = MODULE.create_fixture(Path(cls.temp.name) / 'input')
        cls.records = json.loads((cls.root / 'github.json').read_text())
        cls.cases = json.loads((cls.root / 'requests.json').read_text())

    @classmethod
    def tearDownClass(cls):
        cls.temp.cleanup()

    def git(self, *args, ok=True):
        result = subprocess.run(['git', '-C', str(self.root / 'repo'), *args], text=True, capture_output=True)
        if ok:
            self.assertEqual(result.returncode, 0, result.stderr)
        return result

    def test_all_requests_resolve_at_pinned_revision(self):
        self.assertEqual(len(self.cases), 12)
        for case in self.cases:
            self.git('show', f"{case['revision']}:{case['path']}")

    def test_no_refs_still_has_pr_and_request(self):
        self.assertNotIn('Refs:', self.git('show', '-s', '--format=%B', 'no-refs').stdout)
        sha = self.git('rev-parse', 'no-refs').stdout.strip()
        self.assertEqual(self.records['commit_prs'][sha]['items'], [22])
        self.assertIn('/issues/12', self.records['prs']['22']['body'])

    def test_squash_original_is_not_ancestor(self):
        self.assertEqual(self.git('merge-base', '--is-ancestor', 'batch-original', 'squash', ok=False).returncode, 1)
        self.assertNotIn('Refs:', self.git('show', '-s', '--format=%B', 'squash').stdout)
        self.assertIn('batch.py', self.records['prs']['23']['diff'])

    def test_merge_has_two_parents_and_feature_diff(self):
        self.assertEqual(len(self.git('rev-list', '--parents', '-n', '1', 'merge').stdout.split()), 3)
        self.assertIn('worker.py', self.git('diff', '--name-only', 'merge^1', 'merge').stdout)
        self.assertIn('return 5', self.git('show', 'merge:worker.py').stdout)

    def test_move_and_refactor_lead_back_to_behavior_commit(self):
        self.assertIn('R100', self.git('diff-tree', '--no-commit-id', '-r', '-M', '--name-status', 'moved').stdout)
        history = self.git('log', '--follow', '--format=%s', 'format', '--', 'retry.py').stdout
        self.assertIn('limit guest retries', history)
        self.assertIn('return 1 if is_guest else 3', self.git('show', 'direct:policy.py').stdout)
        self.assertIn('return 1', self.git('show', 'format:retry.py').stdout)

    def test_followup_and_dirty_worktree_are_distinct(self):
        self.assertIn('return 2', self.git('show', 'later:retry.py').stdout)
        self.assertIn('return 99', (self.root / 'repo/retry.py').read_text())
        self.assertIn('retry.py', self.git('status', '--porcelain').stdout)

    def test_cross_repo_numbers_and_access_status_are_not_collapsed(self):
        self.assertNotEqual(self.records['issues']['fixture/design#7']['body'], self.records['issues']['fixture/service#7']['body'])
        self.assertEqual(self.records['issues']['fixture/service#99']['status'], 404)
        sha = self.git('rev-parse', 'private').stdout.strip()
        self.assertEqual(self.records['commit_prs'][sha]['status'], 403)
        orphan = self.git('rev-parse', 'orphan').stdout.strip()
        self.assertEqual(self.records['commit_prs'][orphan], {'status': 200, 'items': []})

    def test_similar_title_is_unrelated_to_target_diff(self):
        self.assertEqual(self.records['issues']['fixture/service#17']['title'], 'Guest retry budget')
        self.assertIn('session.py', self.records['prs']['28']['diff'])
        self.assertNotIn('session.py', self.records['prs']['29']['diff'])
        self.assertIn('PR #28', (self.root / 'repo/docs/decisions.md').read_text())


if __name__ == '__main__':
    unittest.main()
