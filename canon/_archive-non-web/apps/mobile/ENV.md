# Mobile API URL (Phase 0)

Release / physical device must **not** use `localhost` (iOS Simulator resolves `localhost` to the sim loopback). Use `127.0.0.1`.

## Port policy (locked)

| How you start API                        | Port     |
| ---------------------------------------- | -------- |
| `npm run server` (Express default)       | **3001** |
| `npm run dev` / `dev-all` when 3001 busy | **3002** |

**Do not** spin a second gym API just for Expo. Point mobile at the instance that is already up:

```bash
# preferred when API is on the default Express port
EXPO_PUBLIC_API_URL=http://127.0.0.1:3001

# only if health is on 3002 (dev-all fallback)
# EXPO_PUBLIC_API_URL=http://127.0.0.1:3002
```

Check: `curl -s http://127.0.0.1:3001/api/health` (or `:3002`).

| Target                    | Example                                              |
| ------------------------- | ---------------------------------------------------- |
| iOS Simulator             | `http://127.0.0.1:3001`                              |
| Physical phone (same LAN) | `http://192.168.x.x:3001` (`ipconfig getifaddr en0`) |
| Tunnel                    | Tailscale / ngrok HTTPS URL                          |

`buildApiConfig` adds `/api` if missing.

Auth: existing Express `/api/auth/login` + `/api/auth/register` via shared `useAuthSession` (no new auth logic). JWT in SecureStore; guest only via «Продолжить без аккаунта» on `/auth`.

ATS: `ios.infoPlist.NSAppTransportSecurity.NSAllowsLocalNetworking = true` for HTTP to local API.
