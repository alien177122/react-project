# Pre–Uncle Bob backup (2026-07-30)

Stamp: `2026-07-30_1922`

## Destinations

1. `/Volumes/Mini_hdd/Backups/React_Project_Журнал_Сплит_pre-uncle-bob_2026-07-30_1922`
2. `/Volumes/DATA_1TB/Backups/React_Project/React_Project_Журнал_Сплит_pre-uncle-bob_2026-07-30_1922`

## Contents

rsync of project including `.git`, excluding `node_modules`, `dist`, coverage caches, `gym.db`, and local screenshot PNGs.

## Restore (example)

```sh
rsync -a "/Volumes/DATA_1TB/Backups/React_Project/React_Project_Журнал_Сплит_pre-uncle-bob_2026-07-30_1922/" \
  "/Users/stevengord/Desktop/01_React_Продукт/React_Project_Журнал_Сплит-restore/"
cd "/Users/stevengord/Desktop/01_React_Продукт/React_Project_Журнал_Сплит-restore"
npm ci
```

If Mini_hdd copy was still syncing, prefer DATA_1TB (faster / emptier disk).
