import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'
import {
  LAUNCHD_LABEL,
  assertStableConfig,
  buildLaunchdPlist,
  ensureLogDir,
  getLaunchAgentPath,
  getPublicConfig,
} from './public-utils.mjs'

function runLaunchctl(args, { allowFailure = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('launchctl', args, { stdio: 'pipe' })
    let stderr = ''

    child.stderr.on('data', chunk => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('exit', code => {
      if (code === 0 || allowFailure) {
        resolve()
        return
      }
      reject(new Error(stderr.trim() || `launchctl ${args.join(' ')} exited with code ${code ?? 'null'}`))
    })
  })
}

async function main() {
  const cwd = process.cwd()
  const config = getPublicConfig({ cwd })
  assertStableConfig(config)

  const logDir = ensureLogDir(cwd)
  const plistPath = getLaunchAgentPath()
  const plistDir = path.dirname(plistPath)
  const plist = buildLaunchdPlist({
    nodePath: process.execPath,
    scriptPath: path.join(cwd, 'scripts', 'public-run.mjs'),
    cwd,
    stdoutPath: path.join(logDir, 'public.launchd.out.log'),
    stderrPath: path.join(logDir, 'public.launchd.err.log'),
  })

  mkdirSync(plistDir, { recursive: true })
  writeFileSync(plistPath, plist, 'utf8')

  const domain = `gui/${process.getuid()}`
  const job = `${domain}/${LAUNCHD_LABEL}`
  await runLaunchctl(['bootout', job], { allowFailure: true })
  await runLaunchctl(['bootstrap', domain, plistPath])
  await runLaunchctl(['kickstart', '-k', job])

  console.log(`[launchd] Installed ${LAUNCHD_LABEL}`)
  console.log(`[launchd] plist: ${plistPath}`)
  console.log('[launchd] It will start automatically after login and restart on crashes.')
}

main().catch(error => {
  console.error(`[launchd] ${error.message}`)
  process.exit(1)
})
