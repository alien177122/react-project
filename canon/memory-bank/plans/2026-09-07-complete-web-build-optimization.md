# План: довести web build optimization (todos плана)

## Цель

Закрыть все 6 todos плана оптимизации: baseline/контракты, cleanup assets, lazy tabs, CSS/Tailwind, web-only deps/imports, финальная верификация с метриками vs BASELINE. Критерий: JS ≤300 KB gzip, CSS ≤45 KB gzip, gates зелёные, smoke-сценарии покрыты.

## Пункты

1. baseline-contracts — сверить BASELINE, ios/lint, дополнить e2e smoke.
2. cleanup-assets-legacy — dead inventory, wallpaper tooling archive, favicon/backgrounds.
3. split-tabs — подтвердить lazy TabPanel + TrainingContainer + preloadError.
4. split-css — feature CSS chunks; удалить Tailwind pipeline после audit.
5. normalize-web-architecture — @training/shared imports, Eruda prod-off, deps prune.
6. verify-targets — quality:quick, build metrics, browser 390, обновить BASELINE.
