import {spawnSync} from 'node:child_process';
import {existsSync, statSync} from 'node:fs';
import path from 'node:path';

async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  return JSON.parse(raw || '{}');
}

function editedPath(toolInput = {}) {
  const candidate = toolInput.file_path || toolInput.filePath || toolInput.path;
  return typeof candidate === 'string' && candidate.trim() ? candidate : null;
}

function isInsideProject(filePath, projectDir) {
  const relative = path.relative(projectDir, filePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

try {
  const input = await readHookInput();
  const projectDir = path.resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
  const cwd = path.resolve(input.cwd || projectDir);
  const candidate = editedPath(input.tool_input);

  if (!candidate) {
    process.exit(0);
  }

  const filePath = path.resolve(cwd, candidate);

  if (
    !isInsideProject(filePath, projectDir) ||
    !existsSync(filePath) ||
    !statSync(filePath).isFile()
  ) {
    process.exit(0);
  }

  const prettierArgs = [
    '--no-install',
    'prettier',
    '--write',
    '--ignore-unknown',
    '--no-config',
    '--tab-width',
    '2',
    '--arrow-parens',
    'avoid',
    '--bracket-same-line',
    '--bracket-spacing',
    'false',
    '--single-quote',
    '--trailing-comma',
    'all',
    '--print-width',
    '100',
    '--semi',
    filePath,
  ];

  const result = spawnSync('npx', prettierArgs, {
    cwd: projectDir,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Prettier hook failed to start: ${result.error.message}`);
    process.exit(2);
  }

  if (result.status !== 0) {
    console.error(`Prettier hook failed for ${path.relative(projectDir, filePath)}`);
    process.exit(2);
  }
} catch (error) {
  console.error(`Prettier hook failed: ${error.message}`);
  process.exit(2);
}
