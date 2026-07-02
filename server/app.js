import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {ipKeyGenerator, rateLimit} from 'express-rate-limit';
import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {getServerConfig} from './config.js';
import {createDb} from './db.js';
import {createFileWorkspace} from './file-workspace.js';
import {normalizeStoredUserData, normalizeUserData} from './schema.js';
import {passwordPolicyError} from './passwordPolicy.js';
import {securityHeaders} from './security.js';
import {applyJournalDemoSeed} from './journalDemoSeed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

function normalizedName(req) {
  return typeof req.body?.name === 'string' ? req.body.name.trim().toLowerCase() : '';
}

function requestIp(req) {
  if (req.app && req.app.get('trust proxy')) {
    const cfIp = req.headers['cf-connecting-ip'];
    if (typeof cfIp === 'string' && cfIp.trim()) return cfIp.trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
}

function isLoopbackIp(ip) {
  const normalized = ip.trim().toLowerCase();
  return (
    normalized === '127.0.0.1' ||
    normalized === '::1' ||
    normalized === '::ffff:127.0.0.1' ||
    normalized === 'localhost'
  );
}

function limitExceeded(_req, res) {
  return res.status(429).json({error: 'Слишком много попыток. Попробуй позже.'});
}

function makeIpLimiter(scope, limit, config) {
  return rateLimit({
    windowMs: config.authWindowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    skip: req => config.isDevelopment && isLoopbackIp(requestIp(req)),
    keyGenerator: req => `${scope}:ip:${ipKeyGenerator(requestIp(req))}`,
    handler: limitExceeded,
  });
}

function makeNameLimiter(scope, limit, config) {
  return rateLimit({
    windowMs: config.authWindowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    skip: req => config.isDevelopment && isLoopbackIp(requestIp(req)),
    keyGenerator: req => `${scope}:name:${normalizedName(req) || ipKeyGenerator(requestIp(req))}`,
    handler: limitExceeded,
  });
}

function resetLimiters(req, scope, ipLimiter, nameLimiter) {
  ipLimiter.resetKey(`${scope}:ip:${ipKeyGenerator(requestIp(req))}`);
  nameLimiter.resetKey(`${scope}:name:${normalizedName(req) || ipKeyGenerator(requestIp(req))}`);
}

export function createApp({
  env = process.env,
  db = createDb({env}),
  enableStatic = existsSync(distDir),
} = {}) {
  const config = getServerConfig(env);
  const app = express();

  if (env.TRUST_PROXY === '1' || env.TRUST_PROXY === 'true') {
    app.set('trust proxy', true);
  }

  const fileWorkspace = createFileWorkspace({env});

  if (env.SEED_TEST_NAME && env.SEED_TEST_HASH) {
    db.seedUser(env.SEED_TEST_NAME, env.SEED_TEST_HASH);
  }

  if (env.SEED_JOURNAL_DEMO === '1') {
    void applyJournalDemoSeed(db, bcrypt);
  }

  const loginIpLimiter = makeIpLimiter('login', config.loginMaxAttempts, config);
  const loginNameLimiter = makeNameLimiter('login', config.loginMaxAttempts, config);
  const registerIpLimiter = makeIpLimiter('register', config.registerMaxAttempts, config);
  const registerNameLimiter = makeNameLimiter('register', config.registerMaxAttempts, config);

  app.use(cors());
  app.use(express.json());
  app.use(securityHeaders(config));
  void fileWorkspace.ensureWorkspace();

  function authAny(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Нет токена'});

    try {
      req.user = jwt.verify(token, config.jwtSecret);
      next();
    } catch {
      res.status(401).json({error: 'Токен недействителен'});
    }
  }

  function auth(req, res, next) {
    authAny(req, res, () => {
      if (req.user.name !== req.params.name) {
        res.status(403).json({error: 'Доступ запрещён'});
        return;
      }
      next();
    });
  }

  app.post('/api/auth/register', registerIpLimiter, registerNameLimiter, async (req, res) => {
    const {name, password} = req.body;
    if (!name?.trim() || !password) return res.status(400).json({error: 'Заполни все поля'});
    if (name.trim().length < 2) return res.status(400).json({error: 'Имя минимум 2 символа'});
    const policyError = passwordPolicyError(password);
    if (policyError) return res.status(400).json({error: policyError});
    if (db.userExists(name.trim()))
      return res.status(409).json({error: 'Пользователь уже существует'});

    const hash = await bcrypt.hash(password, 10);
    db.createUser(name.trim(), hash);
    resetLimiters(req, 'register', registerIpLimiter, registerNameLimiter);
    const token = jwt.sign({name: name.trim()}, config.jwtSecret, {expiresIn: '30d'});
    res.json({token, name: name.trim()});
  });

  app.post('/api/auth/login', loginIpLimiter, loginNameLimiter, async (req, res) => {
    const {name, password} = req.body;
    if (!name?.trim() || !password) return res.status(400).json({error: 'Заполни все поля'});

    const row = db.getUserAuth(name.trim());
    if (!row) return res.status(401).json({error: 'Пользователь не найден'});

    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) return res.status(401).json({error: 'Неверный пароль'});

    resetLimiters(req, 'login', loginIpLimiter, loginNameLimiter);
    const token = jwt.sign({name: row.name}, config.jwtSecret, {expiresIn: '30d'});
    res.json({token, name: row.name});
  });

  app.get('/api/health', (_req, res) => {
    res.json({ok: true});
  });

  app.get('/api/users/:name', auth, (req, res) => {
    const data = db.getUser(req.params.name);
    res.json(normalizeStoredUserData(data, req.params.name));
  });

  app.put('/api/users/:name', auth, (req, res) => {
    const parsed = normalizeUserData(req.body, req.params.name);
    if (parsed.error) return res.status(400).json({error: parsed.error});

    db.putUser(req.params.name, parsed.data);
    res.json({ok: true});
  });

  app.delete('/api/users/:name', auth, (req, res) => {
    db.delUser(req.params.name);
    res.json({ok: true});
  });

  app.get('/api/files/workspace', authAny, async (_req, res) => {
    res.json(await fileWorkspace.listFiles());
  });

  app.post('/api/files/workspace/analyze', authAny, async (_req, res) => {
    res.json(await fileWorkspace.analyzeAllFiles());
  });

  app.post('/api/files/workspace/analyze/:name', authAny, async (req, res) => {
    try {
      await fileWorkspace.analyzeFile(req.params.name);
      res.json(await fileWorkspace.listFiles());
    } catch (err) {
      if (err instanceof Error && err.message.includes('Access denied')) {
        res.status(400).json({error: err.message});
      } else {
        res.status(500).json({error: 'Ошибка при анализе файла'});
      }
    }
  });

  if (enableStatic) {
    app.use(express.static(distDir));
    app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
      res.sendFile(join(distDir, 'index.html'));
    });
  }

  app.locals.config = config;
  app.locals.db = db;
  return app;
}
