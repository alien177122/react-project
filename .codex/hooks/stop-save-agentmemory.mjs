import {readFile, unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

const AGENTMEMORY_URL = process.env.AGENTMEMORY_URL || 'http://127.0.0.1:3111';
const STATE_FILE = join(tmpdir(), 'agentmemory-codex', 'session.json');

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

async function main() {
  await readHookInput();

  let state;
  try {
    state = JSON.parse(await readFile(STATE_FILE, 'utf8'));
  } catch {
    process.stdout.write('{}');
    return;
  }

  const sessionId = state?.sessionId;
  const project = state?.project;

  if (typeof sessionId !== 'string' || typeof project !== 'string') {
    process.stdout.write('{}');
    return;
  }

  try {
    const response = await fetch(`${AGENTMEMORY_URL}/agentmemory/session/end`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({sessionId, project}),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      process.stdout.write('{}');
      return;
    }
  } catch {
    process.stdout.write('{}');
    return;
  } finally {
    await unlink(STATE_FILE).catch(() => {});
  }

  process.stdout.write(
    JSON.stringify({
      systemMessage: 'agentmemory session closed. Use memory_save for important decisions.',
    }),
  );
}

main().catch(() => {
  process.stdout.write('{}');
});
