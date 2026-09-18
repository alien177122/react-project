# In-place update when folder is locked (Cursor open). Preserves tunnel + DB.
param(
  [string]$TargetDir = "$env:USERPROFILE\Desktop\React_Project",
  [Parameter(Mandatory = $true)]
  [string]$Archive
)

$ErrorActionPreference = "Stop"
$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$extract = Join-Path (Split-Path $TargetDir -Parent) "_react_extract_$stamp"

Write-Host "== In-place update =="
Write-Host "Target: $TargetDir"

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

$preserveNames = @(".env", ".env.local", ".env.public", ".env.public.local", ".env.docker", "gym.db")
$tempPreserve = Join-Path $env:TEMP "react-preserve-$stamp"
New-Item -ItemType Directory -Force -Path $tempPreserve | Out-Null

foreach ($name in $preserveNames) {
  $src = Join-Path $TargetDir $name
  if (Test-Path $src) {
    Copy-Item -Recurse -Force $src (Join-Path $tempPreserve $name)
    Write-Host "Preserved: $name"
  }
}
foreach ($dir in @("docker-data", "workspace-files")) {
  $src = Join-Path $TargetDir $dir
  if (Test-Path $src) {
    Copy-Item -Recurse -Force $src (Join-Path $tempPreserve $dir)
    Write-Host "Preserved: $dir/"
  }
}

New-Item -ItemType Directory -Force -Path $extract | Out-Null
tar -xzf $Archive -C $extract
$srcDir = Get-ChildItem $extract -Directory | Select-Object -First 1
if (-not $srcDir) { throw "Extracted folder not found" }

$robocopyArgs = @(
  $srcDir.FullName, $TargetDir,
  "/E", "/XD", "node_modules", ".git", "dist",
  "/XF", "gym.db", ".env", ".env.local", ".env.public", ".env.docker",
  "/R:2", "/W:2"
)
& robocopy @robocopyArgs | Out-Null
# robocopy: 0-7 ok; 8+ may include locked files (Cursor) — continue if < 16
if ($LASTEXITCODE -ge 16) { throw "robocopy failed with code $LASTEXITCODE" }

# Remove legacy paths dropped in web-only bundle
$legacyPaths = @("src\ionic", "src\capacitor")
foreach ($rel in $legacyPaths) {
  $p = Join-Path $TargetDir $rel
  if (Test-Path $p) {
    Remove-Item -Recurse -Force $p -ErrorAction SilentlyContinue
    Write-Host "Removed legacy: $rel"
  }
}

foreach ($name in $preserveNames) {
  $src = Join-Path $tempPreserve $name
  if (Test-Path $src) {
    Copy-Item -Recurse -Force $src (Join-Path $TargetDir $name)
    Write-Host "Restored: $name"
  }
}
foreach ($dir in @("docker-data", "workspace-files")) {
  $src = Join-Path $tempPreserve $dir
  if (Test-Path $src) {
    Copy-Item -Recurse -Force $src (Join-Path $TargetDir $dir)
    Write-Host "Restored: $dir/"
  }
}

Push-Location $TargetDir
npm install
npm run build
Pop-Location

Remove-Item -Recurse -Force $extract -ErrorAction SilentlyContinue
Write-Host "Done in-place. cloudflared/npm public unchanged - restart node server if needed."
