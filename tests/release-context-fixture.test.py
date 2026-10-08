"""Check the synthetic history supports distinct introduction and release requests."""
import importlib.util
from pathlib import Path
import subprocess
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('release_fixture', Path(__file__).parent / 'fixtures/release-context/create_fixture.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class History(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'input'
        self.data = module.create(self.root)

    def git(self, *args):
        return subprocess.check_output(['git', '-C', str(self.root / 'repo'), *args], text=True).strip()

    def test_initial_and_later_timeout_have_distinct_sources(self):
        commits = self.data['commits']
        self.assertEqual(self.git('show', commits['intro'] + ':policy.py'), 'TIMEOUT = 5')
        self.assertEqual(self.git('show', 'HEAD:policy.py'), 'TIMEOUT = 10')
        self.assertIn('Refs: #8', self.git('show', '-s', '--format=%B', commits['intro']))
        self.assertIn('Refs: #10', self.git('show', '-s', '--format=%B', commits['timeout']))

    def test_cleanup_and_version_are_separate_changes(self):
        commits = self.data['commits']
        self.assertEqual(self.git('diff', '--name-only', commits['version'] + '^', commits['version']), 'manifest.json')
        self.assertEqual(self.git('diff', '--name-status', commits['cleanup'] + '^', commits['cleanup']), 'D\tlogs.md\nA\tresults.md')
        self.assertIn('verbose trace', self.git('show', commits['cleanup'] + '^:logs.md'))

    def test_orphan_reason_and_clean_graph(self):
        self.assertEqual(self.data['prs'][-1]['scope'], 'operator note; reason not recorded')
        self.assertEqual(self.git('rev-list', '--count', 'HEAD'), '5')
        self.assertEqual(self.git('status', '--porcelain'), '')

    def test_existing_input_is_not_overwritten(self):
        with self.assertRaises(FileExistsError):
            module.create(self.root)
        self.assertEqual(self.git('rev-parse', 'HEAD'), self.data['head'])


if __name__ == '__main__':
    unittest.main()
