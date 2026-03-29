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

3. Поднять Metro:

```bash
npm run start:macos
```

4. В отдельном терминале запустить приложение:

```bash
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
