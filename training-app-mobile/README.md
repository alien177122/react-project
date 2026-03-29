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
yarn install
yarn start
```

## API

По умолчанию мобильный проект смотрит в `http://127.0.0.1:3001/api`.
Для физического устройства задай LAN-адрес сервера через `expo.extra.apiUrl` в `app.json`.
