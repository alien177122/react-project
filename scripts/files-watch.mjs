import { analyzeWorkspaceFile, ensureFileWorkspace, getFileWorkspacePaths, listWorkspaceFiles } from '../server/file-workspace.js'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const POLL_INTERVAL_MS = 2000
const ANALYZE_DEBOUNCE_MS = 1200

const { inboxDir, analysisDir } = getFileWorkspacePaths()
const knownFiles = new Map()
const pendingTimers = new Map()

function log(message) {
  console.log(`[files:watch] ${message}`)
}

async function listInboxEntries() {
  const entries = await readdir(inboxDir)
  return entries.filter(name => !name.startsWith('.')).sort((a, b) => a.localeCompare(b))
}

async function getSignature(fileName) {
  const filePath = join(inboxDir, fileName)
  const fileStat = await stat(filePath)
  return `${fileStat.size}:${fileStat.mtimeMs}`
}

function scheduleAnalyze(fileName, reason) {
  const existing = pendingTimers.get(fileName)
  if (existing) clearTimeout(existing)

  const timer = setTimeout(async () => {
    pendingTimers.delete(fileName)
    try {
      const analysis = await analyzeWorkspaceFile(fileName)
      log(`${fileName} -> ${analysis.summary} (${reason})`)
    } catch (error) {
      log(`${fileName} -> error: ${error instanceof Error ? error.message : 'unknown error'}`)
    }
  }, ANALYZE_DEBOUNCE_MS)

  pendingTimers.set(fileName, timer)
}

async function seedInitialState() {
  const workspace = await listWorkspaceFiles()
  for (const file of workspace.files) {
    knownFiles.set(file.name, await getSignature(file.name))
    if (!file.hasAnalysis) scheduleAnalyze(file.name, 'initial')
  }
}

async function scanInbox() {
  const names = await listInboxEntries()
  const seen = new Set(names)

  for (const fileName of names) {
    const signature = await getSignature(fileName)
    const previous = knownFiles.get(fileName)
    if (!previous) {
      knownFiles.set(fileName, signature)
      scheduleAnalyze(fileName, 'new')
      continue
    }
    if (previous !== signature) {
      knownFiles.set(fileName, signature)
      scheduleAnalyze(fileName, 'updated')
    }
  }

  for (const fileName of [...knownFiles.keys()]) {
    if (!seen.has(fileName)) {
      knownFiles.delete(fileName)
      const existing = pendingTimers.get(fileName)
      if (existing) clearTimeout(existing)
      pendingTimers.delete(fileName)
      log(`${fileName} removed from inbox`)
    }
  }
}

await ensureFileWorkspace()

log(`watching inbox: ${inboxDir}`)
log(`analysis output: ${analysisDir}`)

await seedInitialState()
await scanInbox()

setInterval(() => {
  void scanInbox()
}, POLL_INTERVAL_MS)

