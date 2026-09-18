# План: этап 4 — web-only bootstrap (без Ionic/Capacitor)

## Цель

Убрать Ionic/Capacitor из root bootstrap и JS bundle web-приложения. Критерий: нет импортов `@ionic/*` / `@capacitor/*` в `src/` и `index.tsx`, layout/auth без регрессий, gates зелёные.

## Пункты

1. `IonApp` → `<div className="app-root">`, убрать Ionic CSS и `setupIonicReact`.
2. `ionic-theme.css` → `app-root.css`, селекторы `ion-app` → `.app-root`.
3. `detectPlatform` / `initNativeShell` — web-only stubs.
4. Удалить `@ionic/react`, `@capacitor/*` из `package.json`.
5. Gates + build metrics.
