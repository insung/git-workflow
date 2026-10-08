import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyReply } from '../skills/git-workflow/scripts/verify-reply.mjs';
const expected = { host: 'github.com', repo: 'o/r', pr: 7, parentId: 100, replyId: 101, author: 'insung', body: '部分反映\n작성 AI: Codex' };
function actual() { return { id: 101, html_url: 'https://github.com/o/r/pull/7#discussion_r101', body: expected.body, user: { login: 'insung' }, pull_request_url: 'https://api.github.com/repos/o/r/pulls/7', in_reply_to_id: 100 }; }
test('confirms only the complete stored response and returns its actual URL', () => {
  assert.deepEqual(verifyReply(expected, actual()), { confirmed: true, id: 101, url: actual().html_url });
});
for (const field of ['id', 'html_url', 'body', 'user', 'pull_request_url', 'in_reply_to_id']) {
  test(`does not confirm a success summary missing ${field}`, () => {
    const response = actual(); delete response[field];
    const result = verifyReply(expected, response);
    assert.equal(result.confirmed, false);
    assert.equal(result.url, undefined);
  });
}
for (const [label, change] of [
  ['wrong reply ID', r => { r.id = 102; }],
  ['wrong body', r => { r.body = '전부 완료'; }],
  ['wrong author', r => { r.user.login = 'other'; }],
  ['wrong parent', r => { r.in_reply_to_id = 99; }],
  ['wrong PR', r => { r.pull_request_url = 'https://api.github.com/repos/o/r/pulls/8'; }],
  ['wrong URL target', r => { r.html_url = 'https://github.com/o/r/pull/8#discussion_r101'; }],
  ['URL with other reply ID', r => { r.html_url = 'https://github.com/o/r/pull/7#discussion_r99'; }],
]) test(`does not confirm ${label}`, () => {
  const response = actual(); change(response);
  const result = verifyReply(expected, response);
  assert.equal(result.confirmed, false);
  assert.equal(result.url, undefined);
});
test('normalizes only line endings and rejects meaningful whitespace changes', () => {
  const response = actual(); response.body = expected.body.replaceAll('\n', '\r\n');
  assert.equal(verifyReply(expected, response).confirmed, true);
  response.body += ' ';
  assert.equal(verifyReply(expected, response).confirmed, false);
});
test('does not accept an expected contract with omitted target/body fields', () => {
  assert.equal(verifyReply({ body: expected.body }, actual()).confirmed, false);
});
test('accepts a verified enterprise host without borrowing github.com URLs', () => {
  const contract = { ...expected, host: 'git.example.com' }, response = actual();
  response.html_url = 'https://git.example.com/o/r/pull/7#discussion_r101';
  response.pull_request_url = 'https://git.example.com/api/v3/repos/o/r/pulls/7';
  assert.equal(verifyReply(contract, response).confirmed, true);
});
