#!/usr/bin/env node
/**
 * Cloudflare quick tunnel → local Vite (:5173 by default).
 * Writes URL to .logs/quick-tunnel-url.txt and notifies Telegram (if configured).
 *
 * While the tunnel runs, starts `caffeinate -ims -w <cloudflared>` so the Mac
 * stays awake (CPU/network) but the display may sleep — lock screen OK.
 *
 * Usage:
 *   npm run tunnel:quick
 *   node scripts/quick-tunnel-5173.mjs [--port 5173] [--no-notify]
 *
 * cloudflared is started detached with stdio → log file so it survives after this
 * process exits (pipe-to-parent would kill the tunnel on exit).
 */
import {spawn} from 'node:child_process';
import {createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOG_DIR = path.join(ROOT, '.logs');
const URL_FILE = path.join(LOG_DIR, 'quick-tunnel-url.txt');
const LOG_FILE = path.join(LOG_DIR, 'cloudflared-quick.log');
const PID_FILE = path.join(LOG_DIR, 'cloudflared-quick.pid');
const CAFFEINATE_PID_FILE = path.join(LOG_DIR, 'tunnel-caffeinate.pid');
const TUNNEL_TIMEOUT_MS = 45_000;
const DEFAULT_PORT = 5173;

function parseArgs(argv) {
  let port = DEFAULT_PORT;
  let notify = true;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--port' && argv[i + 1]) {
      port = Number(argv[i + 1]);
      i += 1;
    } else if (argv[i] === '--no-notify') {
      notify = false;
    }
  }
  if (!Number.isFinite(port) || port < 1) {
    throw new Error(`Invalid --port: ${port}`);
  }
  return {port, notify};
}

function stripAnsi(text) {
  return text.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '');
}

async function assertLocalHealthy(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`, {redirect: 'manual'});
    if (res.status >= 200 && res.status < 500) return;
  } catch {}
  throw new Error(`Nothing healthy on http://127.0.0.1:${port}. Start Vite first: npm run dev`);
}

function extractUrl(text) {
  const match = stripAnsi(text).match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
  return match?.[0] ?? null;
}

async function waitForUrlInLog(logPath, child) {
  const startedAt = Date.now();
  let lastSize = 0;
  while (Date.now() - startedAt < TUNNEL_TIMEOUT_MS) {
    if (child.exitCode != null) {
      throw new Error(`cloudflared exited before URL (code ${child.exitCode})`);
    }
    if (existsSync(logPath)) {
      const text = readFileSync(logPath, 'utf8');
      if (text.length > lastSize) {
        const chunk = text.slice(lastSize);
        lastSize = text.length;
        for (const line of chunk.split(/\r?\n/)) {
          const clean = stripAnsi(line).trim();
          if (clean) console.log(`[tunnel] ${clean}`);
        }
        const url = extractUrl(text);
        if (url) return url;
      }
    }
    await delay(300);
  }
  throw new Error(`Tunnel URL not received within ${TUNNEL_TIMEOUT_MS}ms`);
}

async function notifyTelegram(url) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [path.join(__dirname, 'notify-tunnel-telegram.mjs'), url],
      {
        cwd: ROOT,
        stdio: 'inherit',
      },
    );
    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`notify-tunnel-telegram exited with code ${code ?? 'null'}`));
    });
  });
}

function killPidFile(pidFile, label) {
  if (!existsSync(pidFile)) return;
  const raw = readFileSync(pidFile, 'utf8').trim();
  const pid = Number(raw);
  if (!Number.isFinite(pid) || pid <= 0) return;
  try {
    process.kill(pid, 'SIGTERM');
    console.log(`[tunnel:quick] Stopped previous ${label} pid ${pid}`);
  } catch {
    // already gone
  }
}

function killExistingQuickTunnel() {
  killPidFile(CAFFEINATE_PID_FILE, 'caffeinate');
  killPidFile(PID_FILE, 'cloudflared');
}

/**
 * Keep Mac awake while cloudflared lives; allow display sleep (no -d).
 * -i idle sleep · -m disk idle · -s system sleep on AC · -w exit with tunnel.
 */
function startTunnelKeepAwake(cloudflaredPid) {
  const child = spawn('caffeinate', ['-ims', '-w', String(cloudflaredPid)], {
    cwd: ROOT,
    stdio: 'ignore',
    detached: true,
    env: process.env,
  });
  if (!child.pid) {
    console.warn('[tunnel:quick] caffeinate failed to start — Mac may sleep');
    return;
  }
  writeFileSync(CAFFEINATE_PID_FILE, `${child.pid}\n`, 'utf8');
  child.unref();
  console.log(
    `[tunnel:quick] Keep-awake: caffeinate -ims -w ${cloudflaredPid} (pid ${child.pid}; display may sleep)`,
  );
}

async function main() {
  const {port, notify} = parseArgs(process.argv.slice(2));
  mkdirSync(LOG_DIR, {recursive: true});
  killExistingQuickTunnel();
  // Also clear any leftover quick tunnels to this port (named --token tunnels untouched).
  try {
    spawn('pkill', ['-f', `cloudflared tunnel --url http://127.0.0.1:${port}`], {
      stdio: 'ignore',
    });
  } catch {}
  await delay(800);

  await assertLocalHealthy(port);
  console.log(`[tunnel:quick] Local OK → http://127.0.0.1:${port}`);

  writeFileSync(LOG_FILE, '');
  const out = createWriteStream(LOG_FILE, {flags: 'a'});
  await new Promise((resolve, reject) => {
    out.on('open', resolve);
    out.on('error', reject);
  });

  const child = spawn(
    'cloudflared',
    ['tunnel', '--url', `http://127.0.0.1:${port}`, '--no-autoupdate'],
    {
      cwd: ROOT,
      stdio: ['ignore', out, out],
      detached: true,
      env: process.env,
    },
  );
  if (!child.pid) {
    throw new Error('Failed to start cloudflared');
  }
  writeFileSync(PID_FILE, `${child.pid}\n`, 'utf8');
  child.unref();
  startTunnelKeepAwake(child.pid);

  const url = await waitForUrlInLog(LOG_FILE, child);
  writeFileSync(URL_FILE, `${url}\n`, 'utf8');
  console.log('');
  console.log(`[tunnel:quick] Public URL: ${url}`);
  console.log(`[tunnel:quick] Saved → ${path.relative(ROOT, URL_FILE)}`);
  console.log(`[tunnel:quick] cloudflared pid ${child.pid} (background)`);

  if (notify) {
    try {
      await notifyTelegram(url);
    } catch (error) {
      console.warn(`[tunnel:quick] Telegram notify failed: ${error.message}`);
    }
  }

  // Close our write handle; cloudflared keeps its own fd to the log.
  out.end();
  console.log(
    `[tunnel:quick] Stop later: kill $(cat ${path.relative(ROOT, PID_FILE)})  # caffeinate exits with it`,
  );
  process.exit(0);
}

main().catch(error => {
  console.error(`[tunnel:quick] ${error.message}`);
  process.exit(1);
});
