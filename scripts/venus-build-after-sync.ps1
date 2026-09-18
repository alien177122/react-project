$TargetDir = "$env:USERPROFILE\Desktop\React_Project"
$preserve = Get-ChildItem $env:TEMP -Directory -Filter "react-preserve-*" |
  Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($preserve) {
  foreach ($name in @(".env.public", ".env.local", ".env.docker", "gym.db")) {
    $src = Join-Path $preserve.FullName $name
    if (Test-Path $src) {
      Copy-Item -Force $src (Join-Path $TargetDir $name)
      Write-Host "Restored: $name"
    }
  }
}

Set-Location $TargetDir
Write-Host "npm install..."
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "npm run build..."
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "BUILD_OK"
