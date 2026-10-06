"""Execute the documented replacement command against real temporary files."""
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(sys.argv.pop(1)) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
DOC = ROOT / 'skills/workflow-init/references/templates.md'
ASSETS = ROOT / 'skills/workflow-init/assets/.github'


class TemplateReplacementTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name).resolve()
        self.target = self.root / 'template.md'
        self.target.write_text('---\nname: old team template\n---\n\n## Team section\n')
        self.source = ASSETS / 'ISSUE_TEMPLATE/FEATURE_REQUEST.md'

    def run_command(self, source=None, target=None):
        match = re.search(r"python3 - .* <<'PY'\n([\s\S]*?)\nPY\n", DOC.read_text())
        self.assertIsNotNone(match, 'missing executable template replacement procedure')
        return subprocess.run(
            [sys.executable, '-', str(source or self.source), str(target or self.target), str(self.root)],
            input=match.group(1), text=True, capture_output=True,
        )

    def assert_no_temporary_files(self):
        self.assertEqual(list(self.root.glob('.git-workflow-template-*')), [])

    def test_replaces_each_kind_with_complete_canonical_bytes(self):
        for asset, name in [
            ('ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'feature_request.md'),
            ('ISSUE_TEMPLATE/BUG_REPORT.md', 'Bug_Report.md'),
            ('PULL_REQUEST_TEMPLATE.md', 'pull_request_template.md'),
        ]:
            with self.subTest(asset=asset):
                target = self.root / name
                target.write_text('old custom front matter and team section\n')
                source = ASSETS / asset
                source_before = source.read_bytes()
                result = self.run_command(source, target)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual(target.read_bytes(), source_before)
                self.assertEqual(source.read_bytes(), source_before)
                self.assertIn('갱신:', result.stdout)
                self.assert_no_temporary_files()
        names = {item.name for item in self.root.iterdir()}
        self.assertNotIn('FEATURE_REQUEST.md', names)
        self.assertNotIn('BUG_REPORT.md', names)
        self.assertNotIn('PULL_REQUEST_TEMPLATE.md', names)

    def test_identical_second_run_does_not_rewrite_file(self):
        first = self.run_command()
        self.assertEqual(first.returncode, 0, first.stderr)
        before = self.target.stat()
        second = self.run_command()
        self.assertEqual(second.returncode, 0, second.stderr)
        self.assertIn('이미 최신:', second.stdout)
        after = self.target.stat()
        self.assertEqual((after.st_ino, after.st_mtime_ns), (before.st_ino, before.st_mtime_ns))
        self.assert_no_temporary_files()

    def test_missing_source_preserves_existing_target(self):
        before = self.target.read_bytes()
        result = self.run_command(self.root / 'missing-source.md')
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.target.read_bytes(), before)
        self.assert_no_temporary_files()

    def test_symbolic_link_is_not_followed_for_writing(self):
        link = self.root / 'linked-template.md'
        link.symlink_to(self.target)
        before = self.target.read_bytes()
        result = self.run_command(target=link)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('보류:', result.stderr)
        self.assertTrue(link.is_symlink())
        self.assertEqual(self.target.read_bytes(), before)
        self.assert_no_temporary_files()

    def test_directory_target_is_not_modified(self):
        folder = self.root / 'templates'
        folder.mkdir()
        result = self.run_command(target=folder)
        self.assertNotEqual(result.returncode, 0)
        self.assertTrue(folder.is_dir())
        self.assertEqual(list(folder.iterdir()), [])
        self.assert_no_temporary_files()

    def test_symbolic_link_parent_is_not_followed_for_writing(self):
        with tempfile.TemporaryDirectory() as other:
            outside = Path(other).resolve()
            target = outside / 'template.md'
            target.write_text('outside template')
            alias = self.root / 'linked-directory'
            alias.symlink_to(outside, target_is_directory=True)
            result = self.run_command(target=alias / 'template.md')
            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(target.read_text(), 'outside template')
            self.assert_no_temporary_files()

    def test_target_outside_repository_root_is_not_modified(self):
        with tempfile.TemporaryDirectory() as other:
            target = Path(other).resolve() / 'template.md'
            target.write_text('outside template')
            result = self.run_command(target=target)
            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(target.read_text(), 'outside template')
            self.assert_no_temporary_files()

    def test_replacement_retains_file_permissions(self):
        self.target.chmod(0o640)
        result = self.run_command()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.target.stat().st_mode & 0o777, 0o640)
        self.assertEqual(self.target.read_bytes(), self.source.read_bytes())
        self.assert_no_temporary_files()


if __name__ == '__main__':
    unittest.main()
