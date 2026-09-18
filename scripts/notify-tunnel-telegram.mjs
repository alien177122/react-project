#!/usr/bin/env node
/**
 * Send a Cloudflare quick-tunnel URL to Telegram via Bot API.
 *
 * Usage:
 *   node scripts/notify-tunnel-telegram.mjs [url]
 *   npm run tunnel:notify -- [url]
 *
 * URL source (first match):
 *   1. argv[2]
 *   2. .logs/quick-tunnel-url.txt
 *
 * Credentials (first match wins per key): process.env, then .env / .env.local /
 * .env.public / .env.public.local — TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.
 *
 * Exit 0 on success or when credentials are missing (prints setup hint).
 * Exit 1 on missing URL or Telegram API failure.
 */
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {parseEnvText} from './public-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const URL_FILE = path.join(ROOT, '.logs', 'quick-tunnel-url.txt');
const ENV_FILES = ['.env', '.env.local', '.env.public', '.env.public.local'];

function loadEnvFiles() {
  const merged = {};
  for (const name of ENV_FILES) {
    const filePath = path.join(ROOT, name);
    if (!existsSync(filePath)) continue;
    Object.assign(merged, parseEnvText(readFileSync(filePath, 'utf8')));
  }
  return {...merged, ...process.env};
}

function readUrlFromFile() {
  if (!existsSync(URL_FILE)) return '';
  const text = readFileSync(URL_FILE, 'utf8').trim();
  const match = text.match(/https:\/\/[^\s]+/i);
  return match?.[0] ?? text.split(/\s+/)[0] ?? '';
}

function printSetupHint() {
  console.log(`
[tunnel:notify] Telegram credentials missing — skip send.

RU: Cursor не связан с Telegram. Чтобы получать ссылку туннеля в чат:
  1. Создайте бота у @BotFather → получите TELEGRAM_BOT_TOKEN
  2. Напишите боту любое сообщение
  3. Узнайте chat id (например @userinfobot или getUpdates API) → TELEGRAM_CHAT_ID
  4. Добавьте в .env.public (gitignored) или .env:
       TELEGRAM_BOT_TOKEN=123456:ABC...
       TELEGRAM_CHAT_ID=123456789
  5. Перезапустите туннель: npm run tunnel:quick

EN: No native Telegram link in Cursor. Create a bot via @BotFather, message it,
get your chat id, put TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID in .env.public
(or .env), then re-run npm run tunnel:quick / tunnel:notify.
`);
}

async function sendTelegramMessage({token, chatId, text}) {
  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: false,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.ok === false) {
    const detail = body.description || res.statusText || `HTTP ${res.status}`;
    throw new Error(`Telegram API error: ${detail}`);
  }
  return body;
}

async function main() {
  const env = loadEnvFiles();
  const url = (process.argv[2] || readUrlFromFile()).trim();
  if (!url) {
    console.error('[tunnel:notify] No URL. Pass argv[2] or write .logs/quick-tunnel-url.txt');
    process.exit(1);
  }
  if (!/^https:\/\//i.test(url)) {
    console.error(`[tunnel:notify] Invalid URL: ${url}`);
    process.exit(1);
  }

  const token = env.TELEGRAM_BOT_TOKEN?.trim() || '';
  const chatId = (env.TELEGRAM_CHAT_ID || env.TELEGRAM_CHATID || '').trim();

  if (!token || !chatId) {
    printSetupHint();
    process.exit(0);
  }

  const text = `Training Calculator — quick tunnel\n${url}`;
  await sendTelegramMessage({token, chatId, text});
  console.log(`[tunnel:notify] Sent to Telegram chat ${chatId}: ${url}`);
}

main().catch(error => {
  console.error(`[tunnel:notify] ${error.message}`);
  process.exit(1);
});
