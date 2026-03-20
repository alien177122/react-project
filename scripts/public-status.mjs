import { existsSync } from 'node:fs'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { getStableConfigIssues, LAUNCHD_LABEL, getLaunchAgentPath, getPublicConfig } from './public-utils.mjs'

function execCapture(command, args) {
  return new Promise(resolve => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', chunk => {
      stdout += chunk.toString()
    })
    child.stderr.on('data', chunk => {
      stderr += chunk.toString()
    })

    child.on('error', error => resolve({ ok: false, code: null, stdout, stderr: error.message }))
    child.on('exit', code => resolve({ ok: code === 0, code, stdout, stderr }))
  })
}

async function probe(url) {
  try {
    const response = await fetch(`${url}/api/health`)
    if (!response.ok) return { ok: false, status: response.status }
    const body = await response.json()
    return { ok: body?.ok === true, status: response.status }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

async function main() {
  const config = getPublicConfig()
  const stableConfigIssues = getStableConfigIssues(config)
  const plistPath = getLaunchAgentPath()
  const launchdStatus = await execCapture('launchctl', ['print', `gui/${process.getuid()}/${LAUNCHD_LABEL}`])
  const localHealth = await probe(`http://127.0.0.1:${config.localPort}`)
  const publicHealth = config.publicUrl && stableConfigIssues.length === 0 ? await probe(config.publicUrl) : null

  console.log(`launchd label: ${LAUNCHD_LABEL}`)
  console.log(`launchd plist: ${existsSync(plistPath) ? plistPath : 'not installed'}`)
  console.log(`launchd loaded: ${launchdStatus.ok ? 'yes' : 'no'}`)
  console.log(`local health: ${localHealth.ok ? 'ok' : `failed (${localHealth.status ?? localHealth.error ?? 'unknown'})`}`)

  if (stableConfigIssues.length > 0) {
    console.log(`stable config: invalid (${stableConfigIssues.join('; ')})`)
  }

  if (config.publicUrl && stableConfigIssues.length === 0) {
    console.log(`public url: ${config.publicUrl}`)
    console.log(`public health: ${publicHealth?.ok ? 'ok' : `failed (${publicHealth?.status ?? publicHealth?.error ?? 'unknown'})`}`)
  } else if (config.publicUrl) {
    console.log(`public url: ${config.publicUrl} (configured, but invalid)`)
  } else {
    console.log('public url: not configured (set PUBLIC_HOSTNAME in .env.public)')
  }
}

main().catch(error => {
  console.error(`[public:status] ${error.message}`)
  process.exit(1)
})
