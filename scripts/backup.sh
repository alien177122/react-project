#!/bin/zsh

# macOS Offline Backup Script
# Automatically back up working folder and git repositories to local targets
# (Google Drive and connected external drives)

# Paths and configuration
PROJECT_DIR="/Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит"
PROJECT_NAME="React_Project_Журнал_Сплит"

# Auto-detect Google Drive folder in CloudStorage
GDRIVE_ROOT=""
for dir in /Users/steve_gordiyenko/Library/CloudStorage/GoogleDrive-*; do
  if [ -d "$dir" ]; then
    GDRIVE_ROOT="$dir"
    break
  fi
done

# If found, configure Google Drive destinations
if [ -n "$GDRIVE_ROOT" ]; then
  GDRIVE_BACKUP_BASE="$GDRIVE_ROOT/Другие компьютеры/Мое устройство Ноутбук/Backups/$PROJECT_NAME"
  GDRIVE_BARE="$GDRIVE_BACKUP_BASE/repo.git"
  GDRIVE_FILES="$GDRIVE_BACKUP_BASE/files"
else
  GDRIVE_BACKUP_BASE=""
fi

# Auto-detect external drives under /Volumes
EXTERNAL_ROOT=""
for v in /Volumes/*; do
  # Exclude system mounts and virtual drives (e.g. RoadToVostok dmg)
  if [[ -d "$v" && "$v" != "/Volumes/Macintosh HD" && "$v" != *".timemachine"* && "$v" != *".localsnapshots"* && "$v" != *"/Volumes/RoadToVostok"* ]]; then
    # Verify the volume is writable
    if [ -w "$v" ]; then
      EXTERNAL_ROOT="$v"
      break
    fi
  fi
done

if [ -n "$EXTERNAL_ROOT" ]; then
  EXTERNAL_BACKUP_BASE="$EXTERNAL_ROOT/Backups/$PROJECT_NAME"
  EXTERNAL_BARE="$EXTERNAL_BACKUP_BASE/repo.git"
  EXTERNAL_FILES="$EXTERNAL_BACKUP_BASE/files"
else
  EXTERNAL_BACKUP_BASE=""
fi

# Rsync ignore parameters
EXCLUDE_FLAGS=(
  --exclude="node_modules"
  --exclude="dist"
  --exclude="desktop-dist"
  --exclude="build"
  --exclude=".vite"
  --exclude=".yarn"
  --exclude=".git"
  --exclude=".gradle"
  --exclude="ios/Pods"
  --exclude="android/.gradle"
  --exclude="*.db"
  --exclude="*.db-journal"
)

echo "============================================="
echo "   STARTING OFFLINE BACKUP ON MACOS"
echo "============================================="

# ----------------- VALIDATION CHECKS -----------------
echo "--> Running validation checks (non-blocking)..."
TYPECHECK_STATUS="SKIPPED"
LINT_STATUS="SKIPPED"
TEST_STATUS="SKIPPED"

if npm run typecheck > /dev/null 2>&1; then
  TYPECHECK_STATUS="PASSED"
else
  TYPECHECK_STATUS="FAILED"
fi

if npm run lint > /dev/null 2>&1; then
  LINT_STATUS="PASSED"
else
  LINT_STATUS="FAILED"
fi

if npm run test > /dev/null 2>&1; then
  TEST_STATUS="PASSED"
else
  TEST_STATUS="FAILED"
fi

# ----------------- LOCAL GIT SYNC -----------------
CURRENT_BRANCH=$(git branch --show-current || echo "main")

# 1. Sync with Google Drive Bare Repository
if [ -n "$GDRIVE_BACKUP_BASE" ]; then
  echo "--> Syncing with Google Drive..."
  mkdir -p "$GDRIVE_BACKUP_BASE"

  # Initialize Bare repository on Google Drive if not exists
  if [ ! -d "$GDRIVE_BARE" ]; then
    echo "Initializing bare Git repository on Google Drive..."
    git init --bare "$GDRIVE_BARE"
  fi

  # Add or update remote in workspace
  if git remote | grep -q "^gdrive$"; then
    git remote set-url gdrive "$GDRIVE_BARE"
  else
    git remote add gdrive "$GDRIVE_BARE"
  fi

  # Push current branch
  echo "Pushing branch '$CURRENT_BRANCH' to Google Drive..."
  git push gdrive "$CURRENT_BRANCH" --force || echo "[WARNING] Git push to Google Drive failed."

  # Sync files via rsync
  echo "Syncing working files to Google Drive..."
  mkdir -p "$GDRIVE_FILES"
  rsync -av --delete "${EXCLUDE_FLAGS[@]}" "$PROJECT_DIR/" "$GDRIVE_FILES/"
  echo "Google Drive backup complete."
else
  echo "[WARNING] Google Drive sync path not found. Skipping Google Drive backup."
fi

echo "---------------------------------------------"

# 2. Sync with External Drive
if [ -n "$EXTERNAL_BACKUP_BASE" ]; then
  echo "--> Syncing with External Drive ($EXTERNAL_ROOT)..."
  mkdir -p "$EXTERNAL_BACKUP_BASE"

  # Initialize Bare repository on External Drive if not exists
  if [ ! -d "$EXTERNAL_BARE" ]; then
    echo "Initializing bare Git repository on External Drive..."
    git init --bare "$EXTERNAL_BARE"
  fi

  # Add or update remote in workspace
  if git remote | grep -q "^external$"; then
    git remote set-url external "$EXTERNAL_BARE"
  else
    git remote add external "$EXTERNAL_BARE"
  fi

  # Push current branch
  echo "Pushing branch '$CURRENT_BRANCH' to External Drive..."
  git push external "$CURRENT_BRANCH" --force || echo "[WARNING] Git push to External Drive failed."

  # Sync files via rsync
  echo "Syncing working files to External Drive..."
  mkdir -p "$EXTERNAL_FILES"
  rsync -av --delete "${EXCLUDE_FLAGS[@]}" "$PROJECT_DIR/" "$EXTERNAL_FILES/"
  echo "External Drive backup complete."
else
  echo "[INFO] No writable external drive connected. Skipping external backup."
fi

echo "============================================="
echo "   BACKUP SUMMARY REPORT"
echo "============================================="
echo "Validation checks (for information only):"
echo "  - Typecheck:  $TYPECHECK_STATUS"
echo "  - Lint:       $LINT_STATUS"
echo "  - Test:       $TEST_STATUS"
echo ""
echo "Backup execution finished."
echo "============================================="
