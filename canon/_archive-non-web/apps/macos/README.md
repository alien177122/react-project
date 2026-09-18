# training-app-macos

Нативный `react-native-macos` shell для этого репозитория.

Что здесь уже есть:

- отдельный macOS target в [macos](/Users/steve_gordiyenko/Desktop/React_Project/apps/macos/macos)
- desktop sidebar navigation вместо нижнего tab bar
- прямое использование общего ядра из [packages/shared](/Users/steve_gordiyenko/Desktop/React_Project/packages/shared)
- demo-экраны `Calculator / Training / Theory / Files`, показывающие shared data и shared utils

## Запуск

1. Установить зависимости:

```bash
cd /Users/steve_gordiyenko/Desktop/React_Project/apps/macos
npm install
```

2. Один раз установить pods:

```bash
npm run pods:macos
```

3. Основной dev-режим:

```bash
npm run dev
```

Что делает `npm run dev`:

- поднимает backend на `http://127.0.0.1:3001`
- поднимает Metro на `http://127.0.0.1:8081`
- запускает `react-native run-macos`

4. Ручной режим, если нужно раздельно управлять процессами:

В корне репозитория:

```bash
cd /Users/steve_gordiyenko/Desktop/React_Project
npm run server
```

В `apps/macos`:

```bash
npm run start:macos
npm run macos
```

## Проверки

```bash
npm run typecheck
npm run lint
```

## Что дальше

- подключить реальный auth/api слой поверх текущего shell
- перенести UI-компоненты с parity к web/mobile
- решить, оставлять ли [desktop](/Users/steve_gordiyenko/Desktop/React_Project/desktop) как Electron fallback после доведения macOS shell до feature parity
