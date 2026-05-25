async function readHookInput() {
  let raw = '';
  process.stdin.setEncoding('utf8');

  for await (const chunk of process.stdin) {
    raw += chunk;
  }

  return JSON.parse(raw || '{}');
}

// Shell commands that open URLs in the system browser (not allowed for UI preview).
const SYSTEM_BROWSER_OPEN =
  /^\s*(open\s+(-a\s+[^\s]+\s+)?['"]?(https?:\/\/|localhost:\d+)|xdg-open\s+['"]?(https?:\/\/|localhost:\d+)|start\s+['"]?https?:\/\/)/i;

const AGENT_MESSAGE =
  'Команда открытия системного браузера заблокирована. Для превью UI используй MCP cursor-ide-browser: browser_tabs → browser_navigate (например http://localhost:5173) → browser_snapshot.';

const USER_MESSAGE =
  'Используй встроенный браузер Cursor (MCP cursor-ide-browser), а не системный open/xdg-open.';

try {
  const input = await readHookInput();
  const command = typeof input.command === 'string' ? input.command : '';

  if (SYSTEM_BROWSER_OPEN.test(command)) {
    console.log(
      JSON.stringify({
        permission: 'deny',
        user_message: USER_MESSAGE,
        agent_message: AGENT_MESSAGE,
      }),
    );
    process.exit(0);
  }

  console.log(JSON.stringify({permission: 'allow'}));
} catch (error) {
  console.error(`Browser preview guard hook failed: ${error.message}`);
  process.exit(0);
}
