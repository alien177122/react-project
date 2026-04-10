import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, rmSync, symlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const workspaceRoot = path.resolve(projectRoot, '..')
function readVersion(dir) {
  const pkgPath = path.join(dir, 'package.json')
  if (!existsSync(pkgPath)) return null
  return JSON.parse(readFileSync(pkgPath, 'utf8')).version
}

function syncPackageCopy({ sourceDir, targetDir, label }) {
  if (!existsSync(sourceDir)) {
    console.error(`Missing ${label} at ${sourceDir}`)
    process.exit(1)
  }

  const sourceVersion = readVersion(sourceDir)
  const targetVersion = readVersion(targetDir)

  if (sourceVersion !== targetVersion) {
    mkdirSync(path.dirname(targetDir), { recursive: true })
    rmSync(targetDir, { recursive: true, force: true })
    cpSync(sourceDir, targetDir, { recursive: true })
    console.log(`Synced ${label} ${sourceVersion ?? ''}`.trim())
  }
}

function ensureWorkspaceSymlink({ sourceDir, targetDir, label }) {
  if (!existsSync(sourceDir)) {
    console.error(`Missing ${label} at ${sourceDir}`)
    process.exit(1)
  }

  const targetExists = existsSync(targetDir)
  if (targetExists) {
    const stat = lstatSync(targetDir)
    if (stat.isSymbolicLink()) {
      const currentTarget = readlinkSync(targetDir)
      if (currentTarget === sourceDir) {
        return
      }
    } else if (readVersion(targetDir) === readVersion(sourceDir)) {
      return
    }
  }

  mkdirSync(path.dirname(targetDir), { recursive: true })
  rmSync(targetDir, { recursive: true, force: true })
  symlinkSync(sourceDir, targetDir, 'junction')
  console.log(`Linked ${label} into workspace root`)
}

syncPackageCopy({
  sourceDir: path.join(workspaceRoot, 'node_modules', 'babel-preset-expo'),
  targetDir: path.join(projectRoot, 'node_modules', 'babel-preset-expo'),
  label: 'local babel-preset-expo',
})

ensureWorkspaceSymlink({
  sourceDir: path.join(projectRoot, 'node_modules', 'expo-asset'),
  targetDir: path.join(workspaceRoot, 'node_modules', 'expo-asset'),
  label: 'expo-asset',
})
