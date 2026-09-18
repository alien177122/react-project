import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';

async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) {
    raw += chunk;
  }
  return JSON.parse(raw || '{}');
}

try {
  const input = await readHookInput();
  const projectDir = path.resolve(process.env.CURSOR_PROJECT_DIR || input.cwd || process.cwd());
  const script = path.join(projectDir, 'scripts/venus-inbox-pull.mjs');

  const lines = [
    '## Venus inbox (авто)',
    'Канон: D:\\Mac\\INBOX → memory-bank/venus-inbox/. Venus пишет, Mac читает сам.',
    'Не проси пользователя вставить инструкции Venus. Не печатай MCP-токены в чат.',
  ];

  if (!existsSync(script)) {
    lines.push('Скрипт pull не найден — работай без inbox.');
    console.log(JSON.stringify({additional_context: lines.join('\n')}));
    process.exit(0);
  }

  const result = spawnSync(process.execPath, [script], {
    cwd: projectDir,
    encoding: 'utf8',
    timeout: 18000,
  });

  const out = `${result.stdout || ''}${result.stderr || ''}`.trim();
  if (out) {
    lines.push('', out.slice(0, 1500));
  }
  if (result.error) {
    lines.push(`Venus inbox skip: ${result.error.message}`);
  }
  lines.push('', 'Прочитай NEW/UPDATED в memory-bank/venus-inbox/ и выполни.');

  console.log(JSON.stringify({additional_context: lines.join('\n')}));
} catch (error) {
  console.log(
    JSON.stringify({
      additional_context:
        '## Venus inbox (авто)\nНе удалось проверить INBOX. Продолжай задачу без него.',
    }),
  );
  process.exit(0);
}
