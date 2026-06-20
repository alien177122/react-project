import {randomUUID} from 'node:crypto';
import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

const PROJECT = 'react-training-journal-split';
const AGENTMEMORY_URL = process.env.AGENTMEMORY_URL || 'http://127.0.0.1:3111';
const STATE_DIR = join(tmpdir(), 'agentmemory-codex');
const STATE_FILE = join(STATE_DIR, 'session.json');

async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function main() {
  const input = await readHookInput();
  const sessionId =
    typeof input.session_id === 'string' && input.session_id.trim()
      ? input.session_id.trim()
      : `codex-${randomUUID()}`;
  const cwd = typeof input.cwd === 'string' && input.cwd.trim() ? input.cwd.trim() : process.cwd();

  await mkdir(STATE_DIR, {recursive: true});
  await writeFile(
    STATE_FILE,
    JSON.stringify({sessionId, project: PROJECT, cwd, agent: 'codex'}),
    'utf8',
  );

  const live = await fetchJson(`${AGENTMEMORY_URL}/agentmemory/livez`);
  if (live?.status !== 'ok') {
    process.stdout.write(
      [
        '## agentmemory',
        'Server is not running. Start: `agentmemory` or `npx @agentmemory/agentmemory`.',
        'MCP tools `memory_smart_search` / `memory_save` need the server on :3111.',
        '',
      ].join('\n'),
    );
    return;
  }

  const [start, search] = await Promise.all([
    fetchJson(`${AGENTMEMORY_URL}/agentmemory/session/start`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({sessionId, project: PROJECT, cwd, agent: 'codex'}),
    }),
    fetchJson(`${AGENTMEMORY_URL}/agentmemory/smart-search`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: 'active context architecture UI decisions recent',
        project: PROJECT,
        limit: 8,
      }),
    }),
  ]);

  const lines = [
    '## agentmemory (shared with Cursor)',
    `Project: \`${PROJECT}\` · Viewer: http://localhost:3113`,
    '',
    '**Before work:** `memory_smart_search` · **After decisions:** `memory_save` (same project id).',
    'Backup: `memory-bank/` · UI canon: `memory-bank/reference/README.md`',
    '',
  ];

  if (typeof start?.context === 'string' && start.context.trim()) {
    lines.push('### Session context', start.context.trim(), '');
  }

  if (Array.isArray(search?.results) && search.results.length > 0) {
    lines.push('### Recent memories');
    for (const item of search.results.slice(0, 8)) {
      const date = typeof item.timestamp === 'string' ? item.timestamp.slice(0, 10) : '?';
      lines.push(`- [${item.type || 'note'}] ${item.title} (${date})`);
    }
    lines.push('', 'Expand with `memory_smart_search` + `expandIds` if needed.', '');
  }

  process.stdout.write(`${lines.join('\n')}\n`);
}

main().catch(error => {
  process.stdout.write(`## agentmemory\nHook warning: ${error.message}\n`);
});
