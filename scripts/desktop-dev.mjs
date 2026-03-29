import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { setTimeout as delay } from 'node:timers/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const require = createRequire(import.meta.url)
const electronBinary = require('electron')

const managedChildren = []
let shuttingDown = false

function getFreePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer()
    server.unref()

    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Could not allocate a free TCP port')))
        return
      }

      server.close(error => {
        if (error) {
          reject(error)
          return
        }
        resolvePort(address.port)
      })
    })
  })
}

function spawnManaged(label, command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...extraEnv,
    },
  })

  managedChildren.push(child)

  child.once('exit', code => {
    if (shuttingDown) return
    if (code === 0) return
    console.error(`[desktop] ${label} exited with code ${code ?? 'unknown'}`)
    void shutdown(code ?? 1)
  })

  child.once('error', error => {
    if (shuttingDown) return
    console.error(`[desktop] ${label} failed to start`, error)
    void shutdown(1)
  })

  return child
}

async function waitForUrl(url, label, timeoutMs = 30000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Keep polling until the process is reachable.
    }

    await delay(500)
  }

  throw new Error(`${label} did not become ready within ${timeoutMs}ms`)
}

async function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true

  for (const child of managedChildren) {
    if (!child.killed) child.kill('SIGTERM')
  }

  await delay(250)

  for (const child of managedChildren) {
    if (!child.killed) child.kill('SIGKILL')
  }

  process.exit(code)
}

process.on('SIGINT', () => {
  void shutdown(130)
})

process.on('SIGTERM', () => {
  void shutdown(143)
})

const apiPort = await getFreePort()
const rendererPort = await getFreePort()

console.log(`[desktop] api port: ${apiPort}`)
console.log(`[desktop] renderer port: ${rendererPort}`)

spawnManaged('api server', process.execPath, ['server/index.js'], {
  PORT: String(apiPort),
})
await waitForUrl(`http://127.0.0.1:${apiPort}/api/health`, 'API server')

spawnManaged('vite renderer', process.execPath, [
  'node_modules/vite/bin/vite.js',
  '--host',
  '127.0.0.1',
  '--port',
  String(rendererPort),
  '--strictPort',
], {
  VITE_API_URL: `http://127.0.0.1:${apiPort}/api`,
})
await waitForUrl(`http://127.0.0.1:${rendererPort}`, 'Vite renderer')

const electron = spawnManaged('electron shell', electronBinary, ['.'], {
  ELECTRON_RENDERER_URL: `http://127.0.0.1:${rendererPort}`,
})

electron.once('exit', code => {
  void shutdown(code ?? 0)
})
