import path from 'node:path';

async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  return JSON.parse(raw || '{}');
}

function editedPaths(toolInput = {}) {
  const candidates = [toolInput.file_path, toolInput.filePath, toolInput.path];
  return candidates.filter(candidate => typeof candidate === 'string' && candidate.trim());
}

function resolveCandidate(candidate, cwd) {
  return path.resolve(cwd, candidate);
}

function isSensitivePath(filePath) {
  const normalized = path.normalize(filePath);
  const parts = normalized.split(path.sep).filter(Boolean);
  const lower = normalized.toLowerCase();

  return (
    parts.some(part => {
      const segment = part.toLowerCase();
      return segment.startsWith('.env') || segment.includes('keystore');
    }) || ['.jks', '.p12', '.pem', '.key'].some(extension => lower.endsWith(extension))
  );
}

function deny(reason) {
  process.stdout.write(
    `${JSON.stringify(
      {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: reason,
        },
      },
      null,
      2,
    )}\n`,
  );
}

try {
  const input = await readHookInput();
  const cwd = path.resolve(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
  const blockedPaths = editedPaths(input.tool_input)
    .map(candidate => resolveCandidate(candidate, cwd))
    .filter(isSensitivePath);

  if (blockedPaths.length > 0) {
    const displayPaths = blockedPaths
      .map(filePath => path.relative(cwd, filePath) || path.basename(filePath))
      .join(', ');

    deny(`Sensitive file edit blocked by project policy: ${displayPaths}`);
  }
} catch (error) {
  deny(`Sensitive edit guard could not parse hook input: ${error.message}`);
}
