# Ionic + Capacitor — web bootstrap & native shells

## Architecture

| Layer | Path | Role |
| ----- | ---- | ---- |
| Web UI | `src/` | Single Vite+React source of truth |
| Ionic bootstrap | `index.tsx`, `src/ionic/setupIonic.ts` | `setupIonicReact({ mode: 'ios' })`, core CSS |
| Theme bridge | `src/styles/base/ionic-theme.css` | `--ion-*` ← project tokens |
| Native shell | `ios/`, `android/` | Capacitor 7 wrappers over `dist/` |
| API | `src/platform/resolveApiBase.ts` | `buildApiConfig` with platform `ios`/`android`/`web` |
| Expo (parallel) | `apps/mobile/`, `apps/macos/` | RN Readiness / release track — **not replaced** |

**Primary mobile path:** Capacitor wraps the same web app as PWA/Electron. Expo remains for React Native–specific screens until migrated.

## Usage patterns

### When to use Ionic components

- **Prefer existing app components** (`SectionBlock`, `Button`, tab shell) for current tabs.
- **Use `@ionic/react`** for new native-feel surfaces: `IonModal`, `IonActionSheet`, `IonRefresher`, `IonToast`, `IonHeader`/`IonToolbar` if adding stack navigation later.
- **Do not** add `@ionic/react-router` unless migrating routing away from `useURLState` + `AppShell`.

### Bootstrap (already wired)

```tsx
// index.tsx
import { initIonicReact } from './src/ionic/setupIonic';
initIonicReact();
void initNativeShell();
```

```tsx
// App.tsx
<IonApp><AppShell /></IonApp>
```

### Detect native

```ts
import { isNativeShell, getNativePlatform } from '@/platform/detectPlatform';
```

## npm scripts

| Script | Action |
| ------ | ------ |
| `npm run cap:sync` | `build` + `cap sync` |
| `npm run cap:ios` | sync + open Xcode |
| `npm run cap:android` | sync + open Android Studio |
| `npm run cap:open:ios` | open Xcode only |
| `npm run cap:open:android` | open Android Studio only |

## Dev workflow

1. `npm run dev` — API + Vite
2. Copy `.env.capacitor.example` → set `VITE_API_URL` (emulator: `10.0.2.2`, device: LAN IP)
3. Optional live reload: `CAP_DEV_SERVER_URL=http://<LAN-IP>:5173 npm run cap:sync`
4. `npm run cap:open:ios` or `cap:open:android`

## Production build

```sh
VITE_API_URL=https://your-api.example.com/api npm run cap:sync
```

## Local prerequisites

- **iOS:** Xcode, CocoaPods (`sudo gem install cocoapods`), iOS Simulator
- **Android:** Android Studio, SDK, emulator or device with USB debugging

## Physical iPhone (LAN API)

**Verified device (2026-06-21):** `iPhone Steve Gordiyenko` — iPhone SE (iPhone12,8), iOS 26.5, UDID `00008030-001130501EC3802E`.

**Mac LAN IP (Wi‑Fi en0):** use `ipconfig getifaddr en0` (example: `192.168.18.22`).

### Build for device (not simulator)

`127.0.0.1` in `VITE_API_URL` points at the **phone**, not the Mac. Rebuild with LAN IP baked in:

```sh
# optional: persist in .env.capacitor.local
# VITE_API_URL=http://192.168.18.22:3002/api

VITE_API_URL=http://<MAC-LAN-IP>:3002/api npm run build
npx cap sync ios
```

Start backend on the Mac (`npm run dev` or `npm run server`). API already listens on `0.0.0.0` (`server/index.js`). Vite dev server uses `host: true` for LAN access to `:5173`.

**Optional live reload:**

```sh
CAP_DEV_SERVER_URL=http://<MAC-LAN-IP>:5173 npx cap sync ios
# npm run dev must be running
```

### Deploy to connected device

```sh
npx cap run ios --list
npx cap run ios --target 00008030-001130501EC3802E --no-sync
# or open Xcode: npm run cap:open:ios → select iPhone → Run (⌘R)
```

### Prerequisites on the iPhone (required)

1. **Developer Mode:** Settings → Privacy & Security → **Developer Mode** → On → restart. Without this, `xcodebuild` fails: *Developer Mode disabled*.
2. **Trust Mac:** unlock phone, tap Trust when connecting USB.
3. **Signing in Xcode:** open `ios/App/App.xcworkspace` → target **App** → **Signing & Capabilities** → **Team** (Apple ID) → Automatic signing. Bundle ID: `com.stevegordiyenko.trainingcalculator`.
4. **Trust app (first install):** Settings → General → VPN & Device Management → trust your developer certificate.

### Firewall

If login/API fails on device but works in Simulator: allow incoming connections for Node/Xcode or temporarily disable macOS firewall for port **3002** (and **5173** if using live reload). Phone and Mac must be on the same Wi‑Fi.

### CLI deploy status (2026-06-21)

- `npm run build` + `npx cap sync ios`: **OK**
- `npx cap run ios --target 00008030-001130501EC3802E`: **blocked** until Developer Mode is enabled on the device (signing Team may also be required in Xcode on first run).
