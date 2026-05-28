async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  return JSON.parse(raw || '{}');
}

const WRITE_TOOLS = new Set([
  'create-table',
  'delete-record',
  'drop-table',
  'execute',
  'insert-record',
  'transaction',
  'update-record',
  'write-query',
]);

const MUTATING_SQL =
  /^\s*(alter|attach|begin|commit|create|delete|detach|drop|insert|pragma|reindex|replace|rollback|update|vacuum)\b/i;

function toolSlug(toolName = '') {
  return toolName.split('__').pop().replaceAll('_', '-').toLowerCase();
}

function sqlText(toolInput = {}) {
  const value = toolInput.sql || toolInput.query || toolInput.statement;
  return typeof value === 'string' ? value : '';
}

function ask(reason) {
  process.stdout.write(
    `${JSON.stringify(
      {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
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
  const slug = toolSlug(input.tool_name);
  const sql = sqlText(input.tool_input);

  if (WRITE_TOOLS.has(slug) || MUTATING_SQL.test(sql)) {
    ask('SQLite MCP write-like operation requested; confirm before mutating ./gym.db.');
  }
} catch (error) {
  ask(`SQLite MCP guard could not parse hook input: ${error.message}`);
}
