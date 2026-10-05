"""Independent CLI effects checks; fake backend, no network access."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

TARGET = Path(sys.argv.pop(1)).resolve()
FAKE = r'''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
p = Path(os.environ['LABEL_FIXTURE'])
s = json.loads(p.read_text())
a = sys.argv[1:]
s.setdefault('calls', []).append(a)
if a[:1] == ['api']:
    if s.get('read_error'):
        p.write_text(json.dumps(s)); print('read forbidden', file=sys.stderr); sys.exit(1)
    import re
    page = int(re.search(r'(?:\?|&)page=(\d+)', ' '.join(a)).group(1)) if re.search(r'(?:\?|&)page=(\d+)', ' '.join(a)) else 1
    rows = s['labels'][(page-1)*100:page*100]
    p.write_text(json.dumps(s)); print(json.dumps(rows)); sys.exit(0)
if a[:2] == ['label', 'create']:
    name = a[2]
    def arg(flag): return a[a.index(flag)+1]
    if not s.get('create_never'):
        s['labels'].append({'name':name,'description':arg('--description'),'color':arg('--color')})
    p.write_text(json.dumps(s))
    if s.get('ambiguous') or s.get('create_never'):
        print('response lost', file=sys.stderr); sys.exit(1)
    print('created'); sys.exit(0)
p.write_text(json.dumps(s)); print('unexpected mutation', file=sys.stderr); sys.exit(2)
'''

class Effects(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name)
        self.store=self.root/'state.json'
        (self.root/'gh').write_text(FAKE); (self.root/'gh').chmod(0o755)
        self.defs=self.root/'labels.yml'
        self.defs.write_text('labels:\n  - name: release\n    description: 릴리즈 준비\n    color: "5319E7"\n  - name: bug\n    description: 버그 수정\n    color: "d73a4a"\n')
        self.state(labels=[{'name':'bug','description':'custom','color':'abcdef'}])
    def state(self, **kwargs): self.store.write_text(json.dumps(kwargs))
    def calls(self): return json.loads(self.store.read_text()).get('calls',[])
    def runcli(self, apply=False):
        env=os.environ.copy(); env['PATH']=str(self.root)+os.pathsep+env['PATH']; env['LABEL_FIXTURE']=str(self.store)
        return subprocess.run([sys.executable,str(TARGET),'--repo','fixture/project','--definitions',str(self.defs),*(['--apply'] if apply else [])],env=env,text=True,capture_output=True)
    def test_preview_has_no_mutation(self):
        r=self.runcli(); self.assertEqual(r.returncode,0,r.stderr)
        self.assertTrue(self.calls()); self.assertTrue(all(c[0]=='api' for c in self.calls()))
        json.loads(r.stdout)
    def test_apply_creates_missing_preserves_existing(self):
        r=self.runcli(True); self.assertEqual(r.returncode,0,r.stderr)
        mutations=[c for c in self.calls() if c[0]!='api']; self.assertEqual(len(mutations),1)
        self.assertEqual(mutations[0][:3],['label','create','release']); self.assertNotIn('--force',mutations[0])
        s=json.loads(self.store.read_text()); self.assertEqual(s['labels'][0],{'name':'bug','description':'custom','color':'abcdef'})
        self.assertEqual(self.calls()[-1][0],'api')
    def test_second_apply_is_idempotent(self):
        self.assertEqual(self.runcli(True).returncode,0); before=len(self.calls())
        self.assertEqual(self.runcli(True).returncode,0)
        self.assertTrue(all(c[0]=='api' for c in self.calls()[before:]))
    def test_read_failure_never_creates(self):
        self.state(labels=[],read_error=True); r=self.runcli(True)
        self.assertNotEqual(r.returncode,0); self.assertTrue(all(c[0]=='api' for c in self.calls()))
    def test_ambiguous_success_requeries(self):
        self.state(labels=[],ambiguous=True); r=self.runcli(True)
        self.assertEqual(r.returncode,0,r.stderr)
        self.assertEqual(len([c for c in self.calls() if c[:3]==['label','create','release']]),1)
    def test_failed_create_not_claimed_success(self):
        self.state(labels=[],create_never=True); r=self.runcli(True)
        self.assertNotEqual(r.returncode,0)
        self.assertEqual(self.calls()[-1][0],'api')
    def test_pagination_preserves_later_label(self):
        labels=[{'name':f'old-{i}','description':'x','color':'aaaaaa'} for i in range(100)]+[{'name':'release','description':'existing','color':'bbbbbb'},{'name':'bug','description':'custom','color':'abcdef'}]
        self.state(labels=labels); r=self.runcli(True); self.assertEqual(r.returncode,0,r.stderr)
        self.assertTrue(all(c[0]=='api' for c in self.calls()))
        self.assertTrue(any('page=2' in ' '.join(c) for c in self.calls()))
    def test_invalid_color_stops_before_network(self):
        self.defs.write_text('labels:\n  - name: release\n    description: x\n    color: "badhex"\n')
        r=self.runcli(True); self.assertNotEqual(r.returncode,0); self.assertEqual(self.calls(),[])
    def test_duplicate_definition_stops_before_network(self):
        self.defs.write_text('labels:\n  - name: release\n    description: x\n    color: "5319E7"\n  - name: release\n    description: y\n    color: "abcdef"\n')
        r=self.runcli(True); self.assertNotEqual(r.returncode,0); self.assertEqual(self.calls(),[])
    def test_yaml_object_tag_rejected(self):
        self.defs.write_text('!!python/object/apply:os.system ["echo invalid"]')
        r=self.runcli(True); self.assertNotEqual(r.returncode,0); self.assertEqual(self.calls(),[])

class TimeoutEffects(unittest.TestCase):
    def test_transport_timeout_with_remote_success_is_requeried(self):
        import importlib.util
        from unittest.mock import patch
        spec=importlib.util.spec_from_file_location('independent_sync',TARGET)
        mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
        rows=[]; calls=[]
        def backend(args, **kwargs):
            calls.append(args)
            if args[1]=='api':
                return subprocess.CompletedProcess(args,0,json.dumps(rows),'')
            rows.append({'name':'release','description':'prepared','color':'5319E7'})
            raise subprocess.TimeoutExpired(args,60)
        with patch.object(mod.subprocess,'run',side_effect=backend):
            result=mod.sync('fixture/project',[{'name':'release','description':'prepared','color':'5319E7'}],True)
        self.assertTrue(result['confirmed']); self.assertEqual(calls[-1][1],'api')

unittest.main()
