const DEV_JWT_SECRET = 'gym-secret-dev'

function envNumber(value, fallback, min = 0) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, parsed)
}

export function getServerConfig(env = process.env) {
  const nodeEnv = env.NODE_ENV?.trim() || 'development'
  const isDevelopment = nodeEnv === 'development'
  const jwtSecret = env.JWT_SECRET?.trim()

  if (!isDevelopment && !jwtSecret) {
    throw new Error('JWT_SECRET is required when NODE_ENV is not development')
  }

  return {
    nodeEnv,
    isDevelopment,
    jwtSecret: jwtSecret || DEV_JWT_SECRET,
    port: envNumber(env.PORT, 3001, 1),
    authWindowMs: envNumber(env.AUTH_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000, 1000),
    loginMaxAttempts: envNumber(env.LOGIN_MAX_ATTEMPTS, 7, 1),
    registerMaxAttempts: envNumber(env.REGISTER_MAX_ATTEMPTS, 5, 1),
  }
}
