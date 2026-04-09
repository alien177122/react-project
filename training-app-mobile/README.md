# training-app-mobile

Expo-подпроект для мобильной миграции текущего тренировочного калькулятора.

## Что уже готово

- Expo Router shell: `login` + 3 вкладки
- Перенесены `types`, `data`, `utils/calc`, `utils/training`, `utils/muscles`, `utils/geometry`
- Адаптированы `api.ts` и `useAuthSession.ts` под Expo/SecureStore
- Добавлена тема на основе веб-CSS-переменных

## Что ещё не перенесено

- Полноценные RN-версии `ExerciseWheel`, `ProgressionBlock`, `VolumeDonut`, `WaveChart`
- Детальный UI вкладок `Training`, `Theory`
- `react-native-svg`-графика и production-polish

## Как запускать

```bash
cd training-app-mobile
npm install
npm start
```

## API

Expo теперь читает конфиг из `app.config.ts`, а не из статического `app.json`.

`app.config.ts` остаётся тонким adapter-слоем над `@training/shared/config`, поэтому mobile использует тот же источник истины для API-конфигов, что и остальные платформы.

### Environment variables

| Variable | Type | Purpose | Example |
| --- | --- | --- | --- |
| `EXPO_PUBLIC_API_ENV` | `dev \| stage \| prod` | Выбор профиля API | `stage` |
| `EXPO_PUBLIC_API_URL` | `string` | Прямой override базового URL | `http://192.168.1.10:3001/api` |
| `EXPO_PUBLIC_API_TIMEOUT_MS` | `number` | Override timeout | `12000` |
| `EXPO_PUBLIC_API_RETRY_COUNT` | `number` | Override retry count | `2` |
| `EXPO_PUBLIC_ENABLE_LOGGING` | `boolean` | Включение API-логов | `true` |
| `EXPO_PUBLIC_ALLOW_OFFLINE_MODE` | `boolean` | Разрешение offline fallback | `false` |

### Priority order

1. `EXPO_PUBLIC_API_URL`
2. Авто-определение LAN IP для `dev` в `development`
3. Профильный URL из `@training/shared/config`

### Examples

Переключение окружения без `eas build`:

```bash
# training-app-mobile/.env.local
EXPO_PUBLIC_API_ENV=stage
```

После изменения перезапусти Expo:

```bash
npx expo start --clear
```

Для физического устройства можно задать прямой LAN-адрес сервера:

```bash
# training-app-mobile/.env.local
EXPO_PUBLIC_API_URL=http://192.168.1.10:3001/api
```

Проверить итоговый конфиг можно так:

```bash
cd training-app-mobile
npx expo config --type public
```
