import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, '..');
const repoRoot = resolve(appRoot, '../..');
const reactNativeCli = resolve(appRoot, 'node_modules/react-native/cli.js');

const API_PORT = 3001;
const METRO_PORT = 8081;
const managedChildren = [];
let shuttingDown = false;

function spawnManaged(label, cwd, args, extraEnv = {}) {
  const child = spawn(process.execPath, args, {
    cwd,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });

  managedChildren.push(child);

  child.once('exit', code => {
    if (shuttingDown) return;
    console.error(`[macos-dev] ${label} exited with code ${code ?? 'unknown'}`);
    void shutdown(code ?? 1);
  });

  child.once('error', error => {
    if (shuttingDown) return;
    console.error(`[macos-dev] ${label} failed to start`, error);
    void shutdown(1);
  });

  return child;
}

async function isReachable(url, validate) {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;

    if (!validate) return true;

    const body = await response.text();
    return validate(body);
  } catch {
    return false;
  }
}

async function waitFor(url, label, validate, timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await isReachable(url, validate)) return;
    await delay(500);
  }

  throw new Error(`${label} did not become ready within ${timeoutMs}ms`);
}

async function runLauncher(label, cwd, args) {
  await new Promise((resolveRun, rejectRun) => {
    const child = spawn(process.execPath, args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    });

    child.once('error', rejectRun);
    child.once('exit', code => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`${label} exited with code ${code ?? 'unknown'}`));
    });
  });
}

async function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of managedChildren) {
    if (!child.killed) child.kill('SIGTERM');
  }

  await delay(250);

  for (const child of managedChildren) {
    if (!child.killed) child.kill('SIGKILL');
  }

  process.exit(code);
}

async function ensureApiServer() {
  const healthUrl = `http://127.0.0.1:${API_PORT}/api/health`;

  if (await isReachable(healthUrl)) {
    console.log(`[macos-dev] Reusing API server on ${healthUrl}`);
    return;
  }

  console.log(`[macos-dev] Starting API server on http://127.0.0.1:${API_PORT}`);
  spawnManaged('API server', repoRoot, [resolve(repoRoot, 'server/index.js')], {
    PORT: String(API_PORT),
  });
  await waitFor(healthUrl, 'API server');
}

async function ensureMetroServer() {
  const statusUrl = `http://127.0.0.1:${METRO_PORT}/status`;
  const isMetroStatus = body => body.includes('packager-status:running');

  if (await isReachable(statusUrl, isMetroStatus)) {
    console.log(`[macos-dev] Reusing Metro on http://127.0.0.1:${METRO_PORT}`);
    return;
  }

  console.log(`[macos-dev] Starting Metro on http://127.0.0.1:${METRO_PORT}`);
  spawnManaged('Metro', appRoot, [reactNativeCli, 'start', '--port', String(METRO_PORT)]);
  await waitFor(statusUrl, 'Metro', isMetroStatus);
}

async function main() {
  process.on('SIGINT', () => {
    void shutdown(130);
  });

  process.on('SIGTERM', () => {
    void shutdown(143);
  });

  await ensureApiServer();
  await ensureMetroServer();
  await runLauncher('react-native run-macos', appRoot, [reactNativeCli, 'run-macos']);

  console.log('[macos-dev] App launched. Press Ctrl+C to stop API and Metro.');
  setInterval(() => {}, 60_000);
  await new Promise(() => {});
}

main().catch(error => {
  console.error('[macos-dev] Failed to launch macOS app', error);
  void shutdown(1);
});
