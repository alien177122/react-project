# Удалённый доступ к этому Mac

Практичный мини-гайд: терминал и управление Mac из интернета (телефон / другой ПК).  
Связанные доки: [DEPLOYMENT.md](./DEPLOYMENT.md) (§ Public tunnel — только **публикация приложения**, не shell Mac).

**Правило:** не открывать сырой SSH (`22/tcp`) в интернет. Сначала VPN/mesh или туннель, потом SSH по ключу.

---

## Что выбрать (коротко)

| Цель                                       | Рекомендация                                                              | Тип                        |
| ------------------------------------------ | ------------------------------------------------------------------------- | -------------------------- |
| **Терминал / Cursor Remote-SSH** стабильно | **Tailscale** + SSH                                                       | mesh VPN (опенсорс-клиент) |
| **Публичный URL приложения** (Vite/API)    | **`npm run public:stable`** (`cloudflared`)                               | уже в проекте              |
| **Полный GUI Mac** (экран, мышь)           | **RustDesk** (опенсорс) или встроенный **Screen Sharing** через Tailscale | remote desktop             |

Ниже — установка и «как держать стабильно».

---

## 1. Tailscale + SSH (предпочтительно для терминала)

Mesh VPN: устройства в одной виртуальной сети, стабильный IP вида `100.x.y.z`, без проброса портов роутера.

### На этом Mac

```bash
brew install --cask tailscale
# или: https://tailscale.com/download/mac
open -a Tailscale
# Войти (Google/GitHub/Microsoft или свой control server)
sudo tailscale up
tailscale ip -4          # запомни 100.x.y.z
```

Включи **Remote Login** (SSH):

```bash
sudo systemsetup -setremotelogin on
# или: Системные настройки → Основные → Общий доступ → Удалённый вход
```

Ключ вместо пароля (на клиенте):

```bash
ssh-keygen -t ed25519 -C "phone-or-laptop"
# публичный ключ → ~/.ssh/authorized_keys на Mac
```

Autostart: приложение Tailscale в Login Items; `tailscaled` ставится с cask.

### С телефона / другого ПК

1. Установи Tailscale, войди в **тот же** аккаунт/tailnet.
2. Терминал:
   ```bash
   ssh <user>@100.x.y.z
   ```
3. iOS/Android: приложение Tailscale + клиент SSH (Termius, Prompt, JuiceSSH) на `100.x.y.z:22`.
4. Cursor / VS Code: Remote-SSH → Host = Tailscale IP.

Keepalive в `~/.ssh/config`:

```
Host mac-tailscale
  HostName 100.x.y.z
  User stevengord
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 30
  ServerAliveCountMax 6
```

---

## 2. Cloudflare Tunnel — только веб-приложение (уже в репо)

`cloudflared` уже используется для **публичного HTTP** стека (не для shell Mac):

```bash
cp .env.public.example .env.public
# CLOUDFLARE_TUNNEL_TOKEN=...  PUBLIC_HOSTNAME=...
npm run public:stable
# статус: npm run public:status
# launchd: npm run public:launchd:install
```

Подробности: [DEPLOYMENT.md](./DEPLOYMENT.md) → «Public tunnel», `.env.public.example`.

**Не путать:** `public:stable` отдаёт сайт/API наружу. Для терминала Mac используй Tailscale (или SSH поверх другого VPN), не пробрасывай `:22` через Cloudflare без Zero Trust Access.

Опционально (продвинуто): Cloudflare Zero Trust + `cloudflared` access для SSH — сложнее Tailscale; имеет смысл, если уже живёте в CF Zero Trust.

---

## 3. SSH по ключам (база, только внутри VPN/LAN)

На LAN (как Venus `ssh venus` → `192.168.100.59`, hostname `desktop-e907gup`; ранее `.54`) или внутри Tailscale:

```bash
# На Mac — Remote Login on, authorized_keys
ssh-copy-id -i ~/.ssh/id_ed25519.pub <user>@<host>
ssh <user>@<host>
```

Запрещено как постоянная схема: `sshd` с паролем на белом IP без VPN/fail2ban.

---

## 4. GUI remote desktop (опционально)

| Инструмент                     | Зачем                   | Заметка                                                            |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------ |
| **RustDesk**                   | Опенсорс remote desktop | Свой/публичный ID-сервер; удобно с телефона                        |
| **Screen Sharing** (VNC) macOS | Нативный                | Только через Tailscale (`vnc://100.x.y.z`), не в открытый интернет |
| ZeroTier                       | Альтернатива Tailscale  | Аналогичный mesh                                                   |
| MeshCentral / Guacamole        | Self-host HTML remote   | Для домашнего сервера, тяжелее для «просто Mac»                    |

RustDesk (кратко):

```bash
brew install --cask rustdesk
# Открыть RustDesk → запомнить ID → с телефона то же приложение + пароль/ключ
```

Стабильность: Login Item + не гасить Mac (Energy Saver: «Prevent sleeping when display is off» при питании от сети).

---

## Безопасность (чеклист)

- [ ] Нет проброса `22` / `5900` на роутере в WAN
- [ ] SSH: только ключи, парольный вход выключен (`PasswordAuthentication no` в `sshd_config` при необходимости)
- [ ] Tailscale: MFA на аккаунте; по возможности ACL (кто видит Mac)
- [ ] FileVault включён; экране блокировки короткий timeout
- [ ] `.env*`, `gym.db`, JWT — не светить через публичный tunnel workspace
- [ ] `ENABLE_FILE_WORKSPACE=0` на public tunnel (см. DEPLOYMENT)

---

## Связка с workflow релиза

После сессии разработки:

```bash
# 1) bump + NOTES + source.tar.gz + копия на Venus (MacVenus_Bridge)
npm run release:pack

# 2) опционально: раздача по LAN HTTP
npm run release:pack:serve
# → http://<LAN-IP>:8765/releases/React_Project_…/source.tar.gz

# 3) удалёнка с телефона/другого ПК
#    Tailscale up → ssh user@100.x.y.z
#    приложение: npm run public:stable (если нужен публичный URL)
```

Ручной remount Venus SMB:

```bash
zsh ~/mnt/remount-MacVenus_Bridge.sh
# Windows: F:\MacVenus_Bridge\React_Project_Versions\
```

Локальная лента версий: `releases/VERSIONS.md`, на Venus — `MacVenus_Bridge/React_Project_Versions/`.

---

## Быстрый выбор «с телефона»

1. Нужен **терминал / агент** → Tailscale + SSH (Termius).
2. Нужен **экран Mac** → RustDesk или VNC через Tailscale.
3. Нужен **открыть сайт друзьям** → `npm run public:stable`, не Tailscale.
