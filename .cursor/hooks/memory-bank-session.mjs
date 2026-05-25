import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const MEMORY_FILES = [
  'memory-bank/tasks.md',
  'memory-bank/activeContext.md',
  'memory-bank/projectbrief.md',
];

async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  return JSON.parse(raw || '{}');
}

function extractSection(markdown, heading) {
  const pattern = new RegExp(`## ${heading}\\s+([\\s\\S]*?)(?=\\n## |$)`);
  const match = markdown.match(pattern);
  return match ? match[1].trim() : null;
}

try {
  const input = await readHookInput();
  const projectDir = path.resolve(process.env.CURSOR_PROJECT_DIR || input.cwd || process.cwd());

  const missing = MEMORY_FILES.filter(
    relativePath => !existsSync(path.join(projectDir, relativePath)),
  );

  const lines = [
    '## Memory Bank (обязательно)',
    'Перед любой задачей прочитай: memory-bank/tasks.md, activeContext.md, projectbrief.md.',
    'При UI — style-guide.md и CLAUDE.md. При техрешениях — techContext.md, systemPatterns.md.',
    'Канон: memory-bank/ + .cursor/. cursor-memory-bank-main/ — только справочник, не источник правды.',
    '',
    '## Превью UI',
    'Открывай превью ТОЛЬКО через MCP cursor-ide-browser (browser_navigate, browser_snapshot).',
    'НЕ используй macOS open, xdg-open или системный браузер. Dev URL: http://localhost:5173',
  ];

  if (missing.length > 0) {
    lines.push('', `⚠ Отсутствуют файлы Memory Bank: ${missing.join(', ')}`);
  } else {
    const activePath = path.join(projectDir, 'memory-bank/activeContext.md');
    const activeContext = readFileSync(activePath, 'utf8');
    const focus = extractSection(activeContext, 'Текущий фокус');
    const preferences = extractSection(
      activeContext,
      'Предпочтения пользователя \\(обязательно\\)',
    );

    if (focus) {
      lines.push('', '### Текущий фокус', focus.slice(0, 600));
    }

    if (preferences) {
      lines.push('', '### Предпочтения', preferences.slice(0, 400));
    }
  }

  console.log(
    JSON.stringify({
      additional_context: lines.join('\n'),
    }),
  );
} catch (error) {
  console.error(`Memory bank session hook failed: ${error.message}`);
  process.exit(0);
}
