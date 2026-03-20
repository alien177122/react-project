import { listWorkspaceFiles, getFileWorkspacePaths } from '../server/file-workspace.js'

const { inboxDir, analysisDir } = getFileWorkspacePaths()
const result = await listWorkspaceFiles()

console.log(`[files] inbox: ${inboxDir}`)
console.log(`[files] analysis: ${analysisDir}`)

if (!result.files.length) {
  console.log('[files] inbox is empty')
  process.exit(0)
}

for (const file of result.files) {
  console.log(`- ${file.name} :: ${file.sizeLabel} :: ${file.hasAnalysis ? 'analyzed' : 'pending'}`)
}
