"""Exercise the CLI as a subprocess with a persistent fake gh executable."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True

SCRIPT = Path(__file__).resolve().parents[1] / 'skills/workflow-init/scripts/sync-labels.py'
FAKE = r'''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
p=Path(os.environ['FAKE_STATE']); s=json.loads(p.read_text()); a=sys.argv[1:]
s['calls'].append(a)
if a[0]=='api':
    s['reads']=s.get('reads',0)+1
    if s.get('lookup_error'): p.write_text(json.dumps(s)); sys.exit(1)
    if s.get('invalid_json'): p.write_text(json.dumps(s)); print('bad'); sys.exit(0)
    if s.get('concurrent') and s['reads']==2: s['labels'].append(s['concurrent'])
    page=int(a[1].split('page=')[-1]); values=s['labels'][(page-1)*100:page*100]
    p.write_text(json.dumps(s)); print(json.dumps(values)); sys.exit(0)
if a[:2]==['label','create']:
    assert '--force' not in a
    assert '--repo' in a and a[a.index('--repo')+1]=='owner/repo'
    if not s.get('create_fail'): s['labels'].append(dict(name=a[2],description=a[a.index('--description')+1],color=a[a.index('--color')+1]))
    p.write_text(json.dumps(s)); sys.exit(1 if s.get('ambiguous') or s.get('create_fail') else 0)
p.write_text(json.dumps(s)); sys.exit(9)
'''


class LabelSync(unittest.TestCase):
    def run_cli(self, labels=None, apply=False, text=None, repo='owner/repo', **options):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            gh = tmp / 'gh'; gh.write_text(FAKE); gh.chmod(0o755)
            state = tmp / 'state.json'; state.write_text(json.dumps(dict(labels=labels or [], calls=[], **options)))
            definitions = tmp / 'labels.yml'
            definitions.write_text(text if text is not None else 'labels:\n  - name: enhancement\n    description: 기능 개선\n    color: "A2EEEF"\n  - name: bug\n    description: 오류 수정\n    color: "D73A4A"\n')
            env = dict(os.environ, PATH=str(tmp)+os.pathsep+os.environ['PATH'], FAKE_STATE=str(state))
            command = [sys.executable, str(SCRIPT), '--repo', repo, '--definitions', str(definitions)] + (['--apply'] if apply else [])
            result = subprocess.run(command, env=env, text=True, capture_output=True)
            return result, json.loads(state.read_text())

    def test_preview_has_no_writes_and_reports_differences(self):
        old = dict(name='bug', description='old', color='FFFFFF')
        result, state = self.run_cli([old])
        self.assertEqual(result.returncode, 0, result.stderr)
        out = json.loads(result.stdout)
        self.assertEqual([x['name'] for x in out['missing']], ['enhancement'])
        self.assertEqual(out['differences'][0]['existing'], old)
        self.assertTrue(all(call[0]=='api' for call in state['calls']))
        self.assertEqual(state['labels'], [old])

    def test_apply_creates_missing_only_and_preserves_metadata(self):
        old = dict(name='BUG', description='custom', color='FFFFFF')
        result, state = self.run_cli([old], apply=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(state['labels'][0], old)
        creates = [c for c in state['calls'] if c[0]=='label']
        self.assertEqual(len(creates), 1)
        self.assertEqual(creates[0][2], 'enhancement')
        self.assertEqual(state['calls'][-1][0], 'api')

    def test_ambiguous_create_confirmed_by_requery(self):
        result, state = self.run_cli(apply=True, ambiguous=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue(all(x['status']=='confirmed-after-ambiguous-response' for x in json.loads(result.stdout)['confirmed']))

    def test_failed_create_unconfirmed_stops(self):
        result, state = self.run_cli(apply=True, create_fail=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('unconfirmed', result.stderr)
        self.assertEqual(len([c for c in state['calls'] if c[0]=='label']), 1)

    def test_concurrent_create_preserved(self):
        added = dict(name='enhancement', description='concurrent', color='000000')
        result, state = self.run_cli(apply=True, concurrent=added)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(state['labels'][0], added)
        self.assertEqual([c[2] for c in state['calls'] if c[0]=='label'], ['bug'])

    def test_lookup_failures_do_not_create(self):
        for option in ['lookup_error','invalid_json']:
            with self.subTest(option=option):
                result, state = self.run_cli(apply=True, **{option:True})
                self.assertNotEqual(result.returncode, 0)
                self.assertTrue(all(c[0]=='api' for c in state['calls']))

    def test_pagination_checks_beyond_first_page(self):
        labels=[dict(name=f'old{i}',description='',color='000000') for i in range(100)]
        labels += [dict(name='bug',description='오류 수정',color='D73A4A')]
        result, state = self.run_cli(labels)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(state['calls']), 2)
        self.assertEqual([x['name'] for x in json.loads(result.stdout)['missing']], ['enhancement'])

    def test_invalid_definitions_and_repo_fail_before_gh(self):
        inputs=['labels: []','labels: [!!python/object:bad {}]', 'labels:\n - name: a\n   name: b\n   description: x\n   color: "000000"', 'labels:\n - name: bug\n   description: x\n   color: "bad"', 'labels:\n - name: bug\n   description: x\n   color: "000000"\n - name: BUG\n   description: x\n   color: "000000"']
        for source in inputs:
            with self.subTest(source=source):
                result, state = self.run_cli(text=source, apply=True)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(state['calls'], [])
        result, state = self.run_cli(repo='https://github.com/owner/repo', apply=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(state['calls'], [])

    def test_create_transport_failure_requeries_existence(self):
        import importlib.util
        spec=importlib.util.spec_from_file_location('sync_timeout',SCRIPT)
        module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        desired=dict(name='bug',description='오류 수정',color='D73A4A')
        calls=[]
        def response(args, **kwargs):
            calls.append(args[1:])
            if args[1]=='label':
                raise subprocess.TimeoutExpired(args,60)
            labels=[desired] if any(c[0]=='label' for c in calls) else []
            return subprocess.CompletedProcess(args,0,json.dumps(labels),'')
        from unittest.mock import patch
        with patch.object(module.subprocess, 'run', response):
            result=module.sync('owner/repo',[desired],True)
        self.assertEqual(calls[-1][0],'api')
        self.assertEqual(result['confirmed'][0]['status'],'confirmed-after-ambiguous-response')

    def test_page_bound_without_spawning_thousand_processes(self):
        import importlib.util
        spec=importlib.util.spec_from_file_location('sync_labels',SCRIPT)
        module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        calls=[]
        def response(args):
            calls.append(args)
            page=len(calls)
            return subprocess.CompletedProcess(args,0,json.dumps([dict(name=f'p{page}-{i}',description='',color='000000') for i in range(100)]),'')
        module.gh=response
        with self.assertRaisesRegex(module.SyncError,'1000-page'):
            module.remote_labels('owner/repo')
        self.assertEqual(len(calls),1000)

if __name__ == '__main__':
    unittest.main()
