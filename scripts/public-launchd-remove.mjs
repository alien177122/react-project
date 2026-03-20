import { existsSync, rmSync } from 'node:fs'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { LAUNCHD_LABEL, getLaunchAgentPath } from './public-utils.mjs'

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
  const plistPath = getLaunchAgentPath()
  const job = `gui/${process.getuid()}/${LAUNCHD_LABEL}`

  await runLaunchctl(['bootout', job], { allowFailure: true })

  if (existsSync(plistPath)) {
    rmSync(plistPath)
  }

  console.log(`[launchd] Removed ${LAUNCHD_LABEL}`)
}

main().catch(error => {
  console.error(`[launchd] ${error.message}`)
  process.exit(1)
})
