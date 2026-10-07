import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const id = value => (typeof value === 'string' && /^[1-9]\d*$/.test(value)) || (Number.isSafeInteger(value) && value > 0);
const normalize = value => value.replaceAll('\r\n', '\n');
// No API calls or writes. The response must be the raw GET result, never a
// model-generated success summary. Only emit a URL verified from that response.
export function verifyReply(expected, response) {
  const errors = [];
  if (!expected || !/^[a-z0-9.-]+(?::\d+)?$/i.test(expected.host ?? '') ||
      !/^[\w.-]+\/[\w.-]+$/.test(expected.repo ?? '') ||
      !id(expected.pr) || !id(expected.parentId) || !id(expected.replyId) ||
      typeof expected.author !== 'string' || !expected.author || typeof expected.body !== 'string' || !expected.body)
    return { confirmed: false, errors: ['incomplete expected target/body'] };
  if (!response || !id(response.id) || String(response.id) !== String(expected.replyId)) errors.push('reply ID missing/different');
  if (typeof response?.body !== 'string' || normalize(response.body) !== normalize(expected.body)) errors.push('stored body missing/different');
  if (response?.user?.login !== expected.author) errors.push('stored author missing/different');
  if (!id(response?.in_reply_to_id) || String(response.in_reply_to_id) !== String(expected.parentId)) errors.push('parent missing/different');
  const apiPrefix = expected.host === 'github.com' ? 'https://api.github.com' : `https://${expected.host}/api/v3`;
  if (response?.pull_request_url !== `${apiPrefix}/repos/${expected.repo}/pulls/${expected.pr}`) errors.push('PR missing/different');
  // Construct only a comparison target; never substitute it for a missing URL.
  const target = `https://${expected.host}/${expected.repo}/pull/${expected.pr}#discussion_r${expected.replyId}`;
  if (typeof response?.html_url !== 'string' || response.html_url !== target) errors.push('actual URL missing/different');
  return errors.length ? { confirmed: false, errors } : { confirmed: true, id: response.id, url: response.html_url };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 6 || process.argv[2] !== '--expected' || process.argv[4] !== '--response')
      throw new Error('Usage: --expected expected.json --response stored-reply.json');
    const result = verifyReply(JSON.parse(readFileSync(process.argv[3], 'utf8')), JSON.parse(readFileSync(process.argv[5], 'utf8')));
    console.log(JSON.stringify(result));
    process.exitCode = result.confirmed ? 0 : 2;
  } catch (error) {
    console.error(JSON.stringify({ confirmed: false, errors: [error.message] }));
    process.exitCode = 1;
  }
}
