"""Preview labels, or create only absent definitions. Never overwrite metadata."""
import argparse
import json
from pathlib import Path
import re
import subprocess
import sys


class SyncError(Exception):
    pass


def valid_text(value, maximum, nonempty=False):
    return (isinstance(value, str) and len(value) <= maximum
            and (not nonempty or bool(value.strip()))
            and not any(ord(c) < 32 or ord(c) == 127 for c in value))


def valid_color(value):
    return isinstance(value, str) and re.fullmatch(r'[0-9a-fA-F]{6}', value)


def remote_metadata(label):
    if not isinstance(label, dict):
        raise SyncError('Label lookup returned invalid metadata')
    if (not valid_text(label.get('name'), 50, True)
            or not valid_color(label.get('color'))
            or (label.get('description') is not None
                and not valid_text(label['description'], 100))):
        raise SyncError('Label lookup returned invalid metadata')
    return dict(name=label['name'], description=label.get('description') or '',
                color=label['color'].upper())


def definitions(path):
    try:
        import yaml
    except ImportError as error:
        raise SyncError('PyYAML is required: install it in your Python environment') from error
    # Reject duplicate mapping keys instead of silently accepting the last value.
    class UniqueLoader(yaml.SafeLoader):
        pass
    def mapping(loader, node):
        result = {}
        for key_node, value_node in node.value:
            key = loader.construct_object(key_node)
            if not isinstance(key, str) or key in result:
                raise SyncError('YAML mapping keys must be unique strings')
            result[key] = loader.construct_object(value_node)
        return result
    UniqueLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, mapping)
    try:
        source = yaml.load(Path(path).read_text(encoding='utf-8'), Loader=UniqueLoader)
    except (OSError, UnicodeError, yaml.YAMLError) as error:
        raise SyncError(f'Cannot read safe YAML definitions: {error}') from error
    if (not isinstance(source, dict) or set(source) != {'labels'}
            or not isinstance(source['labels'], list) or not source['labels']):
        raise SyncError('Definitions must contain a nonempty labels list only')
    result, seen = [], set()
    for label in source['labels']:
        if not isinstance(label, dict) or set(label) != {'name', 'description', 'color'}:
            raise SyncError('Each label requires exactly name, description, color')
        name, desc, color = (label[key] for key in ('name', 'description', 'color'))
        if not valid_text(name, 50, True) or name != name.strip():
            raise SyncError('Invalid label name')
        if name.casefold() in seen:
            raise SyncError(f'Duplicate label name: {name}')
        if not valid_text(desc, 100):
            raise SyncError(f'Invalid description: {name}')
        if not valid_color(color):
            raise SyncError(f'Color must be a quoted six digit HEX string: {name}')
        seen.add(name.casefold())
        result.append(dict(name=name, description=desc, color=color.upper()))
    return result


def gh(args):
    try:
        return subprocess.run(['gh', *args], capture_output=True, text=True, timeout=60)
    except (OSError, subprocess.TimeoutExpired) as error:
        raise SyncError(f'gh execution failed: {error}') from error


def remote_labels(repo):
    labels = {}
    for page in range(1, 1001):
        response = gh(['api', f'repos/{repo}/labels?per_page=100&page={page}', '--method', 'GET'])
        if response.returncode:
            raise SyncError(f'Label lookup failed (page {page}): {response.stderr.strip()}')
        try:
            values = json.loads(response.stdout)
        except json.JSONDecodeError as error:
            raise SyncError('Label lookup returned invalid JSON') from error
        if not isinstance(values, list) or len(values) > 100:
            raise SyncError('Label lookup returned an invalid page')
        for label in values:
            metadata = remote_metadata(label)
            key = metadata['name'].casefold()
            if key in labels:
                raise SyncError('Label lookup returned duplicate names across pages')
            labels[key] = metadata
        if len(values) < 100:
            return labels
    raise SyncError('Label lookup reached 1000-page bound; absence cannot be determined')


def sync(repo, desired, apply):
    current = remote_labels(repo)
    missing, differences, preserved = [], [], []
    for label in desired:
        old = current.get(label['name'].casefold())
        if old is None:
            missing.append(label)
        else:
            preserved.append(old['name'])
            if old['description'] != label['description'] or old['color'] != label['color']:
                differences.append(dict(name=old['name'], existing=old, desired=label))
    result = dict(repo=repo, mode='apply' if apply else 'preview',
                  missing=missing, differences=differences,
                  preserved=preserved, confirmed=[])
    if apply:
        for label in missing:
            # Recheck for concurrent additions immediately before creation.
            current = remote_labels(repo)
            old = current.get(label['name'].casefold())
            if old is not None:
                result['confirmed'].append(dict(name=old['name'], status='concurrent-existing'))
                continue
            try:
                response = gh(['label', 'create', label['name'], '--repo', repo,
                               '--description', label['description'],
                               '--color', label['color']])
            except SyncError:
                # A timeout or interrupted transport can occur after server creation.
                response = subprocess.CompletedProcess([], 1, '', 'ambiguous transport response')
            current = remote_labels(repo)
            old = current.get(label['name'].casefold())
            if old is None:
                raise SyncError(f'Creation unconfirmed: {label["name"]} (gh exit {response.returncode})')
            status = 'created' if response.returncode == 0 else 'confirmed-after-ambiguous-response'
            result['confirmed'].append(dict(name=old['name'], status=status, metadata=old))
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', required=True, help='Explicit owner/repo')
    parser.add_argument('--definitions', required=True, help='YAML labels definitions')
    parser.add_argument('--apply', action='store_true', help='Create missing labels only')
    args = parser.parse_args()
    try:
        if (not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9-]*/[A-Za-z0-9_.-]+', args.repo)
                or args.repo.split('/')[1] in {'.', '..'}):
            raise SyncError('Repository must be explicit owner/repo')
        print(json.dumps(sync(args.repo, definitions(args.definitions), args.apply), ensure_ascii=False, indent=2))
    except SyncError as error:
        print(f'Error: {error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
