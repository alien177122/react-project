# Venus + Mac: полный handoff (LAN, SSH, SMB, Docker, проект)

**Дата:** 2026-08-10  
**Для кого:** открыть в Cursor на Windows (`desktop-e907gup`) или на Mac; можно переслать в Telegram как один файл.  
**Проект:** Training Calculator / React*Project*Журнал_Сплит (монорепо: Vite React, Express+SQLite, Docker, Expo mobile).

---

## 0. Суть в одном абзаце

Домашняя сеть `192.168.100.0/24`. **Mac** — основная разработка. **Windows PC (Venus)** — второй узел: клон проекта, Docker, файловый мост **MacVenus_Bridge** (SMB). После **сброса Windows (август 2026)** машина стала **`desktop-e907gup`**, IP **`192.168.100.59`** (раньше `DESKTOP-SHUEJU8` и **`.54`**). SSH с Mac настроен заново (ключ). SMB-шару нужно создать на Windows вручную. Полные бэкапы лежат на внешнем диске **MacArchive** и частично на **DATA_500**.

---

## 1. Карта устройств (актуально на 2026-08-10)

| Узел                     | Имя               | IP (LAN)                                                         | Роль                                                                              |
| ------------------------ | ----------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Роутер                   | —                 | `192.168.100.1`                                                  | Шлюз, DHCP                                                                        |
| **Mac** (разработка)     | —                 | `192.168.100.56` (Wi‑Fi) или **`192.168.100.27`** (USB‑Ethernet) | `npm run dev` :5173, API :3001, Tailscale                                         |
| **Windows Venus**        | `desktop-e907gup` | **`192.168.100.59`**                                             | Docker, клон React, SMB-мост                                                      |
| Старый Venus (до сброса) | `DESKTOP-SHUEJU8` | `192.168.100.54`                                                 | **не использовать** — ПК переустановлен                                           |
| win-pc (исторически)     | —                 | `192.168.100.27`                                                 | **конфликт:** этот IP может быть на **Mac** (USB‑LAN); отдельный ПК не обязателен |

**Tailscale (Mac):** `100.112.244.105` (mesh VPN, для удалённого SSH к Mac — см. `docs/REMOTE-ACCESS.md`).

**mDNS:** Windows виден как `desktop-e907gup.local` → обычно резолвится в `.59`.

---

## 2. Учётные данные Windows (после сброса)

| Поле    | Значение                                             |
| ------- | ---------------------------------------------------- |
| Логин   | `user`                                               |
| Пароль  | `12345678` (временный — **сменить** после настройки) |
| Имя ПК  | `DESKTOP-E907GUP`                                    |
| Профиль | `C:\Users\user\`                                     |

**Безопасность:** пароль светился в чатах — после того как SSH-ключ и SMB заработают, смени пароль в Windows. В git и в публичные репозитории `.env` и пароли **не** класть.

---

## 3. Что уже сделано на Mac (2026-08-08 … 2026-08-10)

### 3.1. Архив на внешний диск

- Диск **SequoiaInstaller** переформатирован в **APFS `MacArchive`** (~1 TB).
- Скопировано:
  - **`VENUS_MAC_ARCHIVE_2026-08-08/`** — снимок со старого Venus (SSH + SMB): полный `React_Project` ~2.3 GB, мост, handoff, инструкции.
  - **`MAC_CURRENT_2026-08-08/`** — `source.tar.gz` с Mac (~53 MB), актуальнее клона на Venus от 06.08.
  - **`BACKUP/`** — канон: AI-инструкции, shared-knowledge, cursor config, версии релизов v0.001, v0.002, Mac_Current.
- Дубль стейджа: `/Volumes/DATA_500/VENUS_STAGING_2026-08-08/`.
- В корне диска: `README.md`, `README.pdf`, `05_NETWORK_AND_DOCKER.md`.

### 3.2. SSH Mac → Windows (новый ПК)

Файл **`~/.ssh/config`** на Mac:

```
Host venus desktop-e907gup
  HostName 192.168.100.59
  User user
  IdentityFile ~/.ssh/id_ed25519_win
  IdentitiesOnly yes
  PreferredAuthentications publickey,password
  ServerAliveInterval 30
  ServerAliveCountMax 6
```

Публичный ключ Mac: `~/.ssh/id_ed25519_win.pub` (комментарий `mac-to-win-lan`).

**Важно для Windows OpenSSH:** если пользователь в группе **Администраторы**, ключ должен лежать в:

`C:\ProgramData\ssh\administrators_authorized_keys`

а не только в `C:\Users\user\.ssh\authorized_keys`. Иначе ключ «добавлен», но вход только по паролю.

Проверка с Mac:

```bash
ssh-add ~/.ssh/id_ed25519_win   # если ключ с passphrase
ssh venus whoami
# ожидается: desktop-e907gup\user
```

### 3.3. Скрипт SMB на Mac

`~/mnt/remount-MacVenus_Bridge.sh`:

- `HOST="192.168.100.59"`
- `USER="user"`
- `SHARE="MacVenus_Bridge"`
- Монтирование: `~/mnt/MacVenus_Bridge` → симлинк `~/Desktop/MacVenus_Bridge`

### 3.4. Документация в репо

- `docs/REMOTE-ACCESS.md` — Tailscale, cloudflared, SSH, релизы (IP Venus обновлён на `.59`).

---

## 4. Что нужно сделать на Windows (чеклист после сброса)

### 4.1. Сеть

1. Параметры → Сеть → Ethernet или Wi‑Fi → убедиться: **Подключено**, IPv4 из `192.168.100.x`, шлюз `192.168.100.1`.
2. PowerShell:
   ```powershell
   ipconfig
   ping 192.168.100.1
   ping 192.168.100.56
   ```
   (или ping IP Mac, если он на `.27` по USB.)

Ping с Mac на Windows **может не отвечать** — брандмауэр Windows часто блокирует ICMP. Это **не** значит, что ПК offline. Проверяй **SSH 22** и **SMB 445**.

### 4.2. OpenSSH Server

1. Параметры → Приложения → Дополнительные компоненты → **OpenSSH Server** → Установить.
2. Служба **OpenSSH SSH Server** — **Запущена**, тип запуска **Автоматически**.
3. Брандмауэр: правило **OpenSSH SSH Server (sshd)** — разрешено для частной сети.

Повторная установка ключа с Mac (если сбросили SSH снова):

```bash
# на Mac
ssh-copy-id -i ~/.ssh/id_ed25519_win.pub venus
```

Если `ssh-copy-id` не помогает (админ) — вручную на Windows в `administrators_authorized_keys` одна строка из `id_ed25519_win.pub`.

### 4.3. SMB — MacVenus_Bridge (чтобы Finder / Mac не ругался)

Ошибка macOS «не удалось подключиться к серверу desktop-e907gup» = **нет SMB (порт 445)** или шара не создана.

**На Windows:**

1. Создать папку, например: `C:\MacVenus_Bridge`
2. ПКМ → **Свойства** → **Доступ** → **Расширенная настройка** → **Открыть общий доступ** → имя шары: **`MacVenus_Bridge`**
3. Разрешения: пользователь **`user`** — чтение и запись.
4. Параметры → Сеть и Интернет → **Дополнительные параметры общего доступа**:
   - Включить **сетевое обнаружение**
   - Включить **общий доступ к файлам и принтерам**
5. Брандмауэр Windows → разрешить **Общий доступ к файлам и принтерам** (частная сеть).

**На Mac:**

- **⌘K** → `smb://192.168.100.59/MacVenus_Bridge` (логин `user`, пароль Windows).
- Или: `zsh ~/mnt/remount-MacVenus_Bridge.sh`

**Рекомендуемая структура внутри шары** (как было раньше):

```
MacVenus_Bridge/
  README.md
  00-СЕЙЧАС.md
  01-ДЛЯ-MAC-CURSOR.md
  02-ДЛЯ-VENUS-CURSOR.md
  03-SSH-CONFIG-MAC.txt
  React_Project_Versions/
    VERSIONS.md
    React_Project_YYYY-MM-DD_v0.00N/
      source.tar.gz
      NOTES.md
  inbox/
  outbox/
  Windows-Tunnel-Docker-2026-08-05/   # если восстанавливаешь из архива
  REMOTE-INTERNET/
```

Старые тексты инструкций лежат в архиве:  
`MacArchive/VENUS_MAC_ARCHIVE_2026-08-08/01_smb_MacVenus_Bridge/`.

### 4.4. BIOS — виртуализация для Docker

Симптом: Docker Desktop — **«Virtualization support not detected»**,  
`VirtualizationFirmwareEnabled: False`.

**Действия:**

1. Перезагрузка → BIOS/UEFI (Del / F2 / F12).
2. Включить **SVM Mode** (AMD) или **Intel VT-x / Virtualization Technology**.
3. Сохранить (F10), загрузить Windows.
4. PowerShell:
   ```powershell
   powershell -ExecutionPolicy Bypass -File C:\Users\user\verify-docker-setup.ps1
   ```
5. Установить/запустить **Docker Desktop**, дождаться Running.
6. WSL2: `wsl -l -v` — дистрибутивы в версии 2.

Проверка:

```powershell
(Get-CimInstance Win32_ComputerSystem).HypervisorPresent
```

### 4.5. Проект React на Windows

**Откуда взять код:**

| Источник                     | Путь                                              |
| ---------------------------- | ------------------------------------------------- |
| Свежий tarball с Mac         | `MacArchive/MAC_CURRENT_2026-08-08/source.tar.gz` |
| Полный клон со старого Venus | `MacArchive/.../02_venus_desktop/React_Project`   |
| Micro-релиз                  | `.../React_Project_Versions/.../source.tar.gz`    |

**Развёртывание:**

```powershell
cd C:\Users\user\Desktop
# распаковать source.tar.gz или скопировать папку
cd React_Project_*
copy .env.docker.example .env.docker
# заполнить .env.docker (не коммитить)
npm install
```

**Запуск (типично):**

```powershell
# вариант A: Docker
docker compose up -d

# вариант B: локально
npm run server
npm run dev
```

- Vite: `http://localhost:5173`
- API: `http://localhost:3001` (порт см. `.env.docker` / README проекта)
- БД: `gym.db` (SQLite, локально, не в git)

**С Mac в браузере на телефон/другой ПК в LAN:**  
`http://<IP-Mac>:5173` и API на `<IP-Mac>:3001` (на Android emulator иногда `10.0.2.2`).

---

## 5. Подключения: сценарии

### 5.1. Mac → Windows (терминал, Cursor Remote-SSH)

```bash
ssh venus
# или
ssh user@192.168.100.59
```

Cursor: Remote-SSH → host `venus`.

### 5.2. Windows → Mac (если включён Remote Login)

На Mac: Системные настройки → Общий доступ → **Удалённый вход**.

```powershell
ssh stevengord@192.168.100.56
# или Tailscale IP Mac
```

### 5.3. Файлы Mac ↔ Windows

- **Предпочтительно:** SMB `MacVenus_Bridge`
- **Альтернатива:** `scp` / `rsync` через SSH:
  ```bash
  scp -r venus:Desktop/React_Project ./backup-from-venus
  ```

### 5.4. Релиз «после сессии» (с Mac)

```bash
cd ~/Desktop/React_Project_Журнал_Сплит
npm run release:pack          # tarball + копия на MacVenus_Bridge если смонтирован
npm run release:pack:serve    # + HTTP :8765 на IP Mac
```

Локальная лента: `releases/VERSIONS.md`.  
На Venus (Windows): `F:\MacVenus_Bridge\React_Project_Versions\` или `C:\MacVenus_Bridge\...`.

### 5.5. Удалённый доступ в интернет (не путать с LAN)

- **Сайт наружу:** `npm run public:stable` (Cloudflare Tunnel) — см. `docs/DEPLOYMENT.md`, `.env.public.example`
- **Shell Mac:** Tailscale + SSH — см. `docs/REMOTE-ACCESS.md`
- **Не делать:** проброс порта 22 на роутере в интернет без VPN

---

## 6. Разблокировка типичных проблем

### «ПК не виден в сети»

1. Проверить кабель / Wi‑Fi, IP не `169.254.x.x`.
2. Ping роутера `192.168.100.1`.
3. **Конфликт IP:** Mac на USB может занять `.27` — Windows не должен использовать тот же статический IP.
4. ARP на Mac: `arp -a | grep 192.168.100` — есть ли MAC у `.59`?
5. `nc -zv 192.168.100.59 22` — SSH открыт?

### Finder: «проблема при подключении к desktop-e907gup»

- Это **SMB**, не SSH.
- Включить общий доступ и брандмауэр (раздел 4.3).
- Подключаться по IP: `smb://192.168.100.59/MacVenus_Bridge`.

### SSH: Permission denied (publickey)

- Ключ не в `administrators_authorized_keys` (админ).
- Неверный `User` в `~/.ssh/config` (должен быть `user`).
- `ssh-add ~/.ssh/id_ed25519_win`

### SSH: Connection timed out

- Неверный IP (старый `.54`).
- ПК выключен / другая подсеть / гостевая Wi‑Fi с изоляцией клиентов.

### Docker: нет виртуализации

- BIOS SVM/VT-x (раздел 4.4).

### gym.db locked при копировании

- Остановить Docker / `node` / сервер на Windows, затем копировать снова.

---

## 7. Историческая справка (чтобы не путаться)

| Период        | Venus Windows                                   | Mac                                           |
| ------------- | ----------------------------------------------- | --------------------------------------------- |
| до 2026-08-10 | `192.168.100.54`, SHUEJU8                       | SSH `User О` (кириллица), SMB `macbridge@.54` |
| после сброса  | **`192.168.100.59`, E907GUP**, логин **`user`** | SSH обновлён, SMB `user@.59`                  |

Старые записи в PDF/архивах с `.54` — **устарели** для SSH/SMB; содержимое проекта в архивах всё ещё полезно.

---

## 8. Команды-шпаргалка

**Mac:**

```bash
# SSH на Venus
ssh venus whoami

# SMB-мост
zsh ~/mnt/remount-MacVenus_Bridge.sh

# Dev
cd ~/Desktop/React_Project_Журнал_Сплит
npm run dev
npm run server

# Проверки
npm run typecheck && npm test
```

**Windows (PowerShell):**

```powershell
hostname
ipconfig
ping 192.168.100.1
wsl -l -v
docker version
powershell -ExecutionPolicy Bypass -File C:\Users\user\verify-docker-setup.ps1
```

---

## 9. Файлы в репозитории проекта (на Mac)

| Файл                               | Назначение                          |
| ---------------------------------- | ----------------------------------- |
| `docs/REMOTE-ACCESS.md`            | Tailscale, tunnel, SSH              |
| `docs/DEPLOYMENT.md`               | Docker, production, public tunnel   |
| `docker-compose.yml`               | Полный стек в контейнерах           |
| `.env.docker.example`              | Шаблон env для Docker               |
| `scripts/release-pack-lan.sh`      | Релиз + Venus bridge                |
| `~/mnt/remount-MacVenus_Bridge.sh` | Монтирование SMB (вне репо, на Mac) |

**Этот handoff:** `docs/VENUS-MAC-LAN-HANDOFF-2026-08-10.md`

---

## 10. Cursor / агент на Venus

1. Открыть папку проекта: `C:\Users\user\Desktop\React_Project` (или куда распаковал).
2. Положить рядом или в проект копию **этого MD** (из Telegram).
3. Читать в репо/архиве (если скопировал с Mac):
   - `01-ДЛЯ-MAC-CURSOR.md`
   - `02-ДЛЯ-VENUS-CURSOR.md`
   - `memory-bank/` (контекст агента на Mac; на Windows можно symlink или копию)

Правило: секреты только в `.env*` локально; tunnel и API URL — по `ENV.md` в `apps/mobile/` для телефона.

---

## 11. Контрольный список «всё завелось»

- [ ] Windows: IP `192.168.100.59`, ping роутера
- [ ] OpenSSH Server запущен
- [ ] С Mac: `ssh venus whoami` без пароля (ключ)
- [ ] Папка `C:\MacVenus_Bridge` расшарена
- [ ] С Mac: монтируется SMB или ⌘K успешен
- [ ] BIOS: SVM/VT-x включён
- [ ] Docker Desktop Running
- [ ] `verify-docker-setup.ps1` без критических ошибок
- [ ] `npm install` + `npm run dev` / docker compose на проекте
- [ ] Пароль Windows сменён с временного `12345678`

---

_Документ собран для переноса через Telegram и работы в Cursor. При смене IP или hostname обнови `~/.ssh/config`, `remount-MacVenus_Bridge.sh` и этот файл._
