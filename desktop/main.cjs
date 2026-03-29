const { app, BrowserWindow, shell } = require('electron')
const { once } = require('node:events')
const { join } = require('node:path')
const { pathToFileURL } = require('node:url')

const rendererDevUrl = process.env.ELECTRON_RENDERER_URL?.trim() || 'http://127.0.0.1:5173'
const isDev = !app.isPackaged

let mainWindow = null
let appUrl = isDev ? rendererDevUrl : null
let embeddedServer = null

function isAllowedNavigation(targetUrl) {
  if (!targetUrl) return false
  if (appUrl && targetUrl.startsWith(appUrl)) return true
  return /^https?:\/\/127\.0\.0\.1(?::\d+)?/i.test(targetUrl)
}

function configureDesktopStorage() {
  const userDataDir = app.getPath('userData')
  process.env.NODE_ENV = process.env.NODE_ENV?.trim() || 'development'
  process.env.JWT_SECRET = process.env.JWT_SECRET?.trim() || 'desktop-local-secret'
  process.env.DB_PATH = process.env.DB_PATH?.trim() || join(userDataDir, 'data', 'gym.db')
  process.env.WORKSPACE_FILES_ROOT = process.env.WORKSPACE_FILES_ROOT?.trim()
    || join(userDataDir, 'workspace-files')
  // Test account seeded on first launch (only if no account with this name exists)
  process.env.SEED_TEST_NAME = 'test'
  process.env.SEED_TEST_HASH = '$2b$10$TCLh1eB5c.GcOJpvY3tKn.i5o8q4zhsWBYzBGuxHkIdlsjS7bqT4i'
}

async function startEmbeddedServer() {
  if (embeddedServer) {
    const address = embeddedServer.address()
    if (address && typeof address !== 'string') {
      return `http://127.0.0.1:${address.port}`
    }
  }

  configureDesktopStorage()

  const serverModuleUrl = pathToFileURL(join(__dirname, '..', 'server', 'app.js')).href
  const { createApp } = await import(serverModuleUrl)
  const serverApp = createApp({ env: process.env, enableStatic: true })
  embeddedServer = serverApp.listen(0, '127.0.0.1')
  await once(embeddedServer, 'listening')

  const address = embeddedServer.address()
  if (!address || typeof address === 'string') {
    throw new Error('Embedded desktop server did not bind to a TCP port')
  }

  return `http://127.0.0.1:${address.port}`
}

function bindExternalLinkHandling(window) {
  window.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  window.webContents.on('will-navigate', (event, url) => {
    if (isAllowedNavigation(url)) return
    event.preventDefault()
    void shell.openExternal(url)
  })
}

async function createMainWindow() {
  if (!appUrl) {
    appUrl = await startEmbeddedServer()
  }

  const window = new BrowserWindow({
    width: 1480,
    height: 960,
    minWidth: 1180,
    minHeight: 760,
    show: false,
    backgroundColor: '#0d1117',
    title: 'Training Calculator',
    autoHideMenuBar: true,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  bindExternalLinkHandling(window)
  window.once('ready-to-show', () => window.show())
  await window.loadURL(appUrl)

  if (isDev) {
    window.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow = window
}

async function closeEmbeddedServer() {
  if (!embeddedServer) return
  const server = embeddedServer
  embeddedServer = null
  await new Promise(resolve => server.close(() => resolve()))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    void createMainWindow()
  }
})

app.once('before-quit', () => {
  void closeEmbeddedServer()
})

app.whenReady()
  .then(createMainWindow)
  .catch(error => {
    console.error('[desktop] failed to start', error)
    app.exit(1)
  })
