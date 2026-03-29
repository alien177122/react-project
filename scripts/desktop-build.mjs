import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import process from 'node:process'

const require = createRequire(import.meta.url)
const electronBuilderCli = require.resolve('electron-builder/cli.js')
const mode = process.argv.includes('--dir') ? 'dir' : 'pack'
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(command, args, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: process.env,
    })

    child.once('exit', code => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`${label} exited with code ${code ?? 'unknown'}`))
    })

    child.once('error', error => {
      reject(error)
    })
  })
}

try {
  await run(npmCommand, ['run', 'build'], 'web build')
  await run(process.execPath, [electronBuilderCli, 'install-app-deps'], 'electron native deps rebuild')

  const builderArgs = mode === 'dir'
    ? [electronBuilderCli, '--mac', 'dir']
    : [electronBuilderCli, '--mac', 'dmg', 'zip']

  await run(process.execPath, builderArgs, 'electron-builder')
} finally {
  await run(npmCommand, ['rebuild', 'better-sqlite3'], 'restore better-sqlite3 for Node runtime')
}
