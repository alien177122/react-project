
# ЛЕКЦИЯ: Архитектура нативных приложений — от Web к Desktop и Mobile
## 1. Краткое резюме

Эта лекция рассматривает полную архитектуру нативных и гибридных приложений, соединяя мир веб-технологий и нативных платформ. Мы разберём, как разработчики используют JavaScript, React и веб-технологии для создания производительных приложений для десктопа (Electron), мобильных устройств (React Native) и нативных платформ (iOS через Xcode).

Экосистема сильно изменилась. Если раньше разработчикам приходилось выбирать между кроссплатформенностью и нативной производительностью, то современные фреймворки предлагают более продуманные архитектуры, которые заметно уменьшают этот компромисс. Electron доминирует на десктопе благодаря многопроцессной модели на базе Chromium. React Native пережил фундаментальный архитектурный сдвиг с появлением JSI и Fabric, избавившись от асинхронного bridge, который был слабым местом ранних версий. Xcode остаётся золотым стандартом для разработки под iOS/macOS, предлагая не просто компиляцию, а целую интегрированную экосистему: build-системы, управление устройствами, code signing и профилирование во время выполнения.

Чтобы понимать эти архитектуры, нужно разбираться в том, как процессы взаимодействуют друг с другом, как компилируется код, как приложение пакуется и распространяется, а также как обновления доходят до пользователей. Эта лекция даёт такую целостную основу.

**Ключевые выводы:**

- Electron использует модель main / renderer / preload с IPC для общения между процессами.
    
- Новая архитектура React Native (JSI/Fabric) позволяет вызывать нативный код синхронно, без накладных расходов на сериализацию.
    
- Xcode — это не просто компилятор, а интегрированный набор инструментов, управляющий пайплайном сборки, подписью кода, устройствами и профилированием.
    
- Пакеты macOS `.app` — это директории со специальной структурой, а `.dmg` — это контейнер для распространения, а не само приложение.
    
- Современная разработка приложений включает мосты между браузером и нативным кодом через URL schemes, universal links и локальные HTTP-серверы.
    
- Для CI важен Docker, потому что он даёт воспроизводимые сборки и тестирование на разных платформах.
    

---

## 2. Ментальная модель: как связана вся экосистема

Представь три параллельных мира.

### Мир 1: Web (браузер)

JavaScript работает в песочнице. Работа с DOM, обработка событий и API стандартизированы. Доставка приложения предельно проста: URL. Обновления происходят автоматически. Безопасность обеспечивается политикой Same-Origin Policy.

### Мир 2: Desktop (Electron)

Ты берёшь тот же JavaScript + HTML + CSS, заворачиваешь это в Chromium и запускаешь как отдельное приложение. Но теперь у тебя есть доступ к файловой системе, системному меню, нативным уведомлениям и низкоуровневым API ОС. Electron делает это, разделяя приложение на main process (Node.js, полный доступ к ОС) и renderer processes (Chromium, изолированная среда, общающаяся с main через IPC).

### Мир 3: Mobile (React Native)

Ты пишешь JavaScript с синтаксисом React, но он больше не работает с DOM. Вместо этого он работает с нативными компонентами: `UIView` на iOS и `View` на Android. Bridge (который сейчас заменяется на JSI) переводит вызовы JavaScript в вызовы нативных методов. Приложение ощущается как нативное по производительности, потому что UI действительно нативный, а не webview и не эмуляция.

### Мост между мирами

Современные приложения размывают эти границы. Веб-приложение может открыть нативное через URL scheme или universal link. Electron-приложение может поднять локальный HTTP-сервер и общаться с ним как обычное веб-приложение. React Native может встраивать webview. Старое разделение схлопывается в единую модель: **JavaScript — это слой логики; native — это слой представления и интеграции с ОС.**

---

## 3. Карта технологий (таблица сравнения)

|Аспект|Electron|React Native|Swift Native|Web + Localhost Bridge|
|---|---|---|---|---|
|**Покрытие платформ**|Windows, macOS, Linux|iOS, Android|Только iOS/macOS|Везде (браузер + приложение)|
|**UI-технология**|DOM Chromium|Нативные компоненты|Нативные компоненты|Web DOM|
|**Опыт разработки**|Подходит веб-разработчикам|React + нативные модули|Нужен Swift/Obj-C|Чистый web stack|
|**Размер приложения**|Минимум 150–200 МБ|50–100 МБ|20–50 МБ|Минимальный|
|**Время запуска**|1–2 сек|500 мс – 2 сек|300–800 мс|Почти мгновенно|
|**Потребление памяти**|База 200–400 МБ|100–200 МБ|50–150 МБ|Минимальное|
|**Потолок производительности**|Хороший (Chromium)|Отличный (native)|Отличный (native)|Ограничен JS|
|**Доступ к нативным возможностям**|Глубокий (Node.js, system APIs)|Средний (через native modules)|Полный|Ограниченный|
|**Механизм обновления**|Squirrel.Mac, electron-updater|CodePush, EAS Updates|App Store / TestFlight|HTTP + service workers|
|**Переиспользование кода**|Windows / Mac / Linux|iOS / Android|Нет|Все платформы|
|**Порог входа**|Низкий|Средний|Высокий|Низкий|
|**Зрелость в enterprise**|Проверено (VSCode, Slack, Discord)|Проверено (Meta, Microsoft, Shopify)|Проверено экосистемой Apple|Проверено вебом|
|**Сложность архитектуры**|Main + renderers + IPC|JSI + Fabric renderer|Относительно простая|Клиент-сервер|

---

## 4. Подробный разбор

### 4.1 Electron: многопроцессная архитектура

Electron унаследовал свою архитектуру от Chromium. Каждое Electron-приложение содержит два основных типа процессов.

#### Main Process

Main process работает в среде Node.js. Здесь у тебя есть **полный, неограниченный доступ к операционной системе**:

```javascript
// main.js - выполняется в контексте Node.js
const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });
  win.loadFile('index.html');
});

// Прямой доступ к файловой системе (Node.js)
const fs = require('fs');
fs.readFileSync('/path/to/file');

// System tray, menu, native dialogs
const { Menu } = require('electron');
const template = [/* элементы меню */];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

Main process отвечает за:

- создание и управление `BrowserWindow` (renderer-процессами),
    
- жизненный цикл приложения (`quit`, `activate` и т.д.),
    
- системные интеграции (меню, трей, уведомления, file dialogs),
    
- координацию межпроцессного взаимодействия,
    
- применение политик безопасности.
    

**Ключевой принцип: на одно Electron-приложение существует ровно один main process.** Это твоя точка входа и шлюз к ОС.

#### Renderer Processes

Каждый `BrowserWindow` создаёт отдельный renderer process. По сути это вкладка Chromium, изолированная от других renderer-процессов:

```html
<!-- index.html - загружается в renderer process -->
<button id="read-file">Read File</button>

<script>
  // Это выполняется в renderer-контексте — Node.js тут напрямую недоступен
  document.getElementById('read-file').addEventListener('click', async () => {
    // Нужно запросить main process
    const content = await window.electronAPI.readFile('/path/to/file');
  });
</script>
```

**Принцип изоляции:** renderer-процессы не могут напрямую обращаться к файловой системе, системным API или другим renderer-процессам. Это граница безопасности. Если вредоносный код внезапно попадёт в renderer, он не сможет просто так украсть файлы пользователя.

**Изоляция памяти и ресурсов:** у каждого renderer-процесса своя куча памяти, свой event loop и свой контекст. Если один renderer упадёт, это не уронит остальные и не сломает main process.

#### Preload Scripts: безопасный мост

Начиная с Electron v5, `nodeIntegration` по умолчанию выключен, а `contextIsolation` включён. Это значит, что renderer больше не имеет доступа к Node.js. Тогда как ему общаться с main process?

Через **preload script**, который выполняется в контексте renderer, но при этом имеет доступ к Node.js:

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (path) => ipcRenderer.invoke('read-file', path),
  writeFile: (path, content) => ipcRenderer.invoke('write-file', path, content),
  onProgress: (callback) => {
    ipcRenderer.on('update-progress', (_event, value) => {
      callback(value);
    });
  }
});
```

Preload script:

1. Имеет доступ к Node.js и Electron API.
    
2. Загружается до веб-страницы.
    
3. Через `contextBridge` открывает renderer только контролируемый API.
    
4. Выступает как шлюз безопасности: доступны только явно экспортированные методы.
    

Это **намного безопаснее**, чем старый подход с `nodeIntegration: true`, где весь Node.js API был доступен прямо в renderer.

#### Межпроцессное взаимодействие (IPC)

Electron даёт два базовых механизма IPC.

**`ipcRenderer.invoke / ipcMain.handle`:**

```javascript
// Preload или renderer (если API уже проброшен)
const result = await window.electronAPI.readFile('/path');

// Main process
ipcMain.handle('read-file', async (event, path) => {
  return fs.readFileSync(path, 'utf-8');
});
```

Это режим **запрос-ответ**: renderer ждёт, пока main process вернёт результат. Внутри Electron сообщение ставится в очередь, main его обрабатывает и возвращает ответ. В renderer это выглядит как `Promise`.

**`ipcRenderer.send / ipcMain.on`:**

```javascript
// Renderer
window.electronAPI.openFile();

// Main process
ipcMain.on('open-file', (event) => {
  dialog.showOpenDialog(mainWindow).then(result => {
    event.sender.send('file-selected', result.filePaths);
  });
});

// Обратно в preload renderer
ipcRenderer.on('file-selected', (event, paths) => {
  console.log(paths);
});
```

Это **одностороннее сообщение**: renderer отправляет событие и не ждёт ответа. Подходит для событий, где ответ не нужен сразу.

**Важный нюанс:** хотя IPC очень быстрый и тут нет сети, это всё равно не по-настоящему синхронное общение. Сообщения ставятся в очередь и обрабатываются event loop’ами процессов. На практике задержка настолько мала, что почти незаметна.

#### Модель безопасности

Современный Electron включает такие дефолты:

- `nodeIntegration: false` — renderer не может подключать Node.js модули,
    
- `contextIsolation: true` — контекст renderer изолирован от preload,
    
- `enableRemoteModule: false` — renderer не может напрямую вызывать методы main,
    
- Content Security Policy — ограничивает, что можно загружать и исполнять.
    

Философия здесь простая: **principle of least privilege**. Renderer получает только тот доступ, который ему реально нужен, и этот доступ проходит через preload.

---

### 4.2 React Native: от Bridge к JSI и Fabric

React Native начинался с простой, но проблемной архитектуры — **bridge**. Современный React Native проходит через фундаментальную трансформацию с JSI и Fabric.

#### Архитектура Bridge (старый подход)

В раннем React Native:

```text
JavaScript      |  Async Bridge   |  Native
(React code)    |  (Serialization)|  (UIView/View)
                |  (Queuing)      |
```

Когда твой React-компонент обновлялся:

1. JavaScript вычислял новое UI-дерево.
    
2. React Native сериализовал изменения в JSON.
    
3. JSON пересекал bridge асинхронно.
    
4. Нативный код десериализовал JSON.
    
5. Нативный код обновлял `UIView/View`.
    
6. Результат при необходимости летел обратно ещё одним асинхронным прыжком.
    

**Проблемы:**

- накладные расходы на сериализацию,
    
- задержки из-за асинхронности,
    
- очереди при частых обновлениях (например, скролле),
    
- лишние копии данных в памяти.
    

#### Новая архитектура: JSI

JSI (`JavaScript Interface`) — это C++-слой, который позволяет JavaScript:

1. **Хранить ссылки на нативные объекты** без сериализации.
    
2. **Вызывать нативные методы синхронно.**
    
3. **Передавать сложные типы данных** напрямую.
    

```text
JavaScript      |  C++ Bridge   |  Native
(React code)    |  (JSI)        |  (Native code)
                |  Direct refs  |
                |  Sync calls   |
```

Вместо:

```javascript
// СТАРОЕ: нужна сериализация
nativeModule.processFrame(frameData); // ДАННЫЕ КОПИРУЮТСЯ
```

С JSI:

```javascript
// НОВОЕ: прямая ссылка
const camera = new NativeCameraModule();
camera.processFrame(frameBuffer); // ПРЯМАЯ ССЫЛКА, БЕЗ КОПИИ
```

Реальный пример — **VisionCamera**. Эта библиотека использует JSI для обработки кадров камеры на 60 fps, где один буфер кадра может занимать около 30 МБ. Это примерно 2 ГБ/с потока данных. Через старый bridge такое было бы практически невозможно.

**TurboModules** — новый стандарт для нативных модулей, заменяющий старую систему Native Modules. Они используют JSI для общения:

```javascript
import { NativeModules } from 'react-native';

const { FileSystem } = NativeModules;

// Теперь это идёт через JSI, а не через старый bridge
const contents = await FileSystem.readFile('/path/file.txt');
```

#### Fabric: новый рендерер

Старая архитектура гоняла обновления UI через bridge. **Fabric** заменяет это прямым C++-слоем рендера:

```text
React Component |  JSI Layer  |  Fabric Renderer  |  Native UI
(JS)            |  (Direct)   |  (C++, immediate) |  (UIView)
                |             |  (shadow tree)    |
```

Ключевые отличия:

1. **Shadow tree** теперь живёт в C++, а не только в JavaScript.
    
2. **Layout вычисляется синхронно в C++.**
    
3. **Меньше переходов через bridge.**
    
4. **Лучшая совместимость нативных и JS-view.**
    

С Fabric, например, `FlatList` при скролле больше не сериализует все видимые элементы и не отправляет их по bridge. Вместо этого:

1. C++-слой получает событие скролла.
    
2. Вычисляет, какие элементы должны быть видимы.
    
3. Обновляет нативные компоненты напрямую.
    
4. JavaScript при необходимости уведомляется асинхронно.
    

#### Статус внедрения

Начиная с React Native 0.76, **новая архитектура включена по умолчанию**. Это важный рубеж: новые проекты автоматически получают JSI, TurboModules и Fabric.

Старый код под bridge ещё работает через слой совместимости. Но библиотеки, чувствительные к производительности, должны мигрировать на новую архитектуру.

---

### 4.3 Xcode и стек Apple

Xcode — это не «просто компилятор». Это **IDE и оркестратор**, управляющий почти каждым аспектом разработки под iOS/macOS.

#### Что реально делает Xcode

1. **Source Editor** — интерфейс для написания Swift/Objective-C.
    
2. **Build System** — управляет компиляцией, линковкой и подписью кода.
    
3. **Compiler Frontend** — превращает Swift/Obj-C в машинный код.
    
4. **Linker** — собирает объектные файлы и фреймворки в исполняемый файл.
    
5. **Simulator Host** — запускает симуляторы iOS/iPadOS/watchOS/tvOS на macOS.
    
6. **Device Management** — подключает реальные устройства, управляет provisioning profiles.
    
7. **Code Signing** — подписывает бинарники сертификатами.
    
8. **Instruments Profiler** — профилирование и отладка.
    
9. **Интеграция с менеджерами пакетов** — CocoaPods, SPM.
    
10. **Управление командой и capabilities** — аккаунты разработчиков, team ID, entitlements.
    

#### Пайплайн сборки

Когда ты жмёшь Build в Xcode, происходит следующее:

```text
Исходный код (.swift)
        ↓
[Препроцессор — обрабатывает imports, macros]
        ↓
[Компилятор — преобразует Swift → LLVM IR]
        ↓
[LLVM backend — преобразует IR → assembly]
        ↓
[Assembler — превращает assembly в object files]
        ↓
[Linker — объединяет object files + frameworks → executable]
        ↓
[Code Signer — подписывает сертификатом разработчика]
        ↓
[Package — упаковывает в .app bundle]
        ↓
App.app (директория)
```

Главная мысль: **каждый шаг отдельно настраивается**. Можно менять compiler flags, linker flags, identity подписи, entitlements и так далее.

#### Build Settings и Schemes

В **Build Settings** задаются параметры сборки:

- `PRODUCT_NAME` — имя приложения,
    
- `BUNDLE_IDENTIFIER` — уникальный идентификатор (`com.example.MyApp`),
    
- `DEPLOYMENT_TARGET` — минимальная версия iOS,
    
- `CODE_SIGN_IDENTITY` — каким сертификатом подписывать,
    
- `PROVISIONING_PROFILE_SPECIFIER` — какой профиль использовать.
    

**Scheme** объединяет:

- какой target собирать,
    
- какую конфигурацию использовать (`Debug` / `Release`),
    
- какие аргументы передавать,
    
- какие переменные окружения задавать,
    
- какие действия делать до и после сборки.
    

То есть кнопка Run в Xcode фактически означает:  
**собрать в Debug, установить на симулятор, запустить с отладкой и breakpoints.**

#### iOS Simulator

iOS Simulator работает на macOS через эмуляцию. Он симулирует:

- железо (CPU, GPU, память),
    
- ОС (ядро iOS и фреймворки),
    
- особенности устройства (GPS, камера, акселерометр).
    

Когда ты собираешь приложение для симулятора, Xcode компилирует его под архитектуру macOS (`x86_64` или `arm64`), а не под ARM-архитектуру реального iPhone.

**Критично:** некоторые вещи на симуляторе протестировать нельзя, например:

- NFC,
    
- отдельные режимы камеры,
    
- часть сенсоров,
    
- некоторые реальные аппаратные сценарии.
    

Для этого нужен физический девайс.

#### Code Signing и Provisioning

Вот здесь начинается настоящая сложность Xcode. Чтобы приложение запускалось на реальном устройстве, тебе нужны:

1. **Developer Certificate** — приватный ключ + сертификат разработчика.
    
2. **Device ID** — уникальный идентификатор устройства.
    
3. **Provisioning Profile** — подписанный документ, связывающий сертификат, app ID и список устройств.
    

Xcode может делать это автоматически (`Automatically Manage Signing`) или вручную. Но provisioning profile — не опция, а обязательная часть запуска на устройстве. Неподписанное или неправильно подписанное приложение на девайсе не стартует.

---

### 4.4 iOS Simulator: это не реальное устройство

Симулятор нужен в разработке, но у него есть ограничения.

**Поддерживает:**

- большинство UI-фреймворков (`UIKit`, `SwiftUI`),
    
- сеть (`HTTP/HTTPS`, `localhost`, внешние URL),
    
- файловую систему в песочнице,
    
- многие системные фреймворки (`AVFoundation`, `CoreLocation` и др.).
    

**Не поддерживает полноценно:**

- ARKit,
    
- NFC / RFID,
    
- реальный Bluetooth,
    
- отдельные фичи камеры и видео,
    
- push-уведомления (их можно только симулировать).
    

Симулятор запускается на macOS и эмулирует iOS-окружение. Для разработки он хорош, но реальный девайс всегда точнее показывает реальное поведение приложения.

---

### 4.5 Упаковка приложений на macOS: `.app` и `.dmg`

#### Структура `.app`

`.app` на macOS — это не один бинарник. Это **директория со специальной структурой**. То, что Finder показывает как один файл, на самом деле выглядит так:

```text
MyApp.app/
├── Contents/
│   ├── MacOS/
│   │   └── MyApp                    # Исполняемый файл
│   ├── Resources/
│   │   ├── Main.storyboard
│   │   ├── LaunchScreen.storyboard
│   │   ├── Assets.xcassets/
│   │   │   └── AppIcon.appiconset/
│   │   └── Localizable.strings
│   ├── Frameworks/
│   │   ├── CustomFramework.framework
│   │   └── ...
│   ├── PlugIns/
│   │   └── [опциональные плагины]
│   ├── _CodeSignature/
│   │   └── CodeResources
│   └── Info.plist
└── .DS_Store
```

`Info.plist` — центральный файл метаданных:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>My App</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.myapp</string>
    <key>CFBundleExecutable</key>
    <string>MyApp</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.13</string>
    <key>NSPrincipalClass</key>
    <string>NSApplication</string>
</dict>
</plist>
```

Папка `_CodeSignature` хранит информацию о подписи и хэшах файлов.

Когда macOS запускает приложение, она:

1. проверяет подпись,
    
2. загружает executable из `MacOS/`,
    
3. подключает фреймворки из `Frameworks/`,
    
4. загружает ресурсы.
    

**Ключевая мысль:** `.app` можно копировать как будто это один файл, хотя на самом деле это директория. macOS просто обращается с ней как с единым пакетом.

#### Формат `.dmg`

`.dmg` (`Disk Image`) — это виртуальный том, что-то вроде ZIP, который монтируется как диск. Обычно приложение распространяют именно так:

```text
MyApp-1.0.dmg
  └── MyApp.app
  └── Applications (символическая ссылка)
  └── README.txt
  └── License.txt
```

Плюсы `.dmg`:

- drag-and-drop установка,
    
- целостность,
    
- сжатие,
    
- возможность шифрования,
    
- сохранение метаданных.
    

**Важно:** `.dmg` — это контейнер доставки, а не само приложение. Само приложение — это `.app` внутри `.dmg`.

Пример создания `.dmg`:

```bash
create-dmg \
  --volname "My App Installer" \
  --window-pos 200 120 \
  --window-size 800 400 \
  --icon-size 100 \
  --icon MyApp.app 200 190 \
  --hide-extension MyApp.app \
  MyApp-1.0.dmg \
  dist/
```

---

### 4.6 Связь между браузером и нативным приложением

Современные приложения часто состоят и из web-части, и из native-части. Они общаются несколькими способами.

#### URL Schemes

Приложение регистрирует собственную схему, например `myapp://`.

```swift
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
```

Тогда страница может открыть приложение:

```html
<a href="myapp://open?file=document.txt">Open in My App</a>
```

Что происходит:

1. браузер видит схему `myapp://`,
    
2. ОС открывает приложение,
    
3. приложение получает URL,
    
4. разбирает параметры и выполняет действие.
    

Примеры:

```javascript
myapp://documents/123
myapp://share?text=hello&url=https://example.com
myapp://callback?token=abc123&error=none
```

**Ограничения:**

- работает только если приложение установлено,
    
- нет жёсткого стандарта кодирования параметров,
    
- с точки зрения безопасности любая страница может попытаться вызвать твоё приложение.
    

#### Universal Links / App Links

Современный путь — использовать обычные `https`-ссылки вместо кастомных схем.

```text
https://example.com/documents/123
```

На iOS:

1. приложение объявляет, что умеет открывать `example.com`,
    
2. на домене размещается `apple-app-site-association`,
    
3. пользователь жмёт на ссылку,
    
4. ОС проверяет, связано ли приложение с доменом,
    
5. если да — открывает приложение, если нет — браузер.
    

Плюсы:

- есть fallback в браузер,
    
- обычные URL,
    
- выше безопасность, потому что требуется подтверждённое владение доменом.
    

На Android механизм похожий, но используется `assetlinks.json`.

#### Localhost HTTP Bridge

Приложение может поднять локальный HTTP-сервер и принимать запросы как обычный backend.

```javascript
const express = require('express');
const app = express();

app.post('/api/readFile', (req, res) => {
  const filePath = req.body.path;
  fs.readFile(filePath, (err, data) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ content: data.toString() });
  });
});

app.listen(3000);
```

А web-часть делает:

```javascript
const response = await fetch('http://localhost:3000/api/readFile', {
  method: 'POST',
  body: JSON.stringify({ path: '/path/file.txt' })
});
const data = await response.json();
```

**Плюсы:**

- привычный HTTP,
    
- можно использовать REST / GraphQL,
    
- легко дебажить через DevTools.
    

**Минусы:**

- всё равно есть сетевые накладные расходы,
    
- надо следить за портами,
    
- обработка ошибок сложнее.
    

#### WebSocket Bridge

Для real-time двусторонней связи:

```javascript
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
  console.log('From app:', event.data);
};
ws.send('Hello from renderer');
```

Подходит для:

- стриминга логов,
    
- прогресса,
    
- уведомлений,
    
- низколатентной двусторонней связи.
    

---

### 4.7 Системы автообновления

Обновления критичны для production-приложений.

#### Electron Auto-Updater (Squirrel.Mac)

На macOS Electron использует **Squirrel.Mac**.

```javascript
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

Нужен feed URL с метаданными релиза:

```javascript
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'your-org',
  repo: 'your-repo',
});
```

Пример ответа сервера:

```json
{
  "version": "1.1.0",
  "url": "https://releases.example.com/MyApp-1.1.0-mac.zip",
  "releaseDate": "2024-04-02"
}
```

Когда выходит обновление:

1. скачивается `.zip`,
    
2. распаковывается во временную папку,
    
3. проверяется подпись,
    
4. пользователь уведомляется или обновление ставится автоматически,
    
5. при следующем запуске используется новая версия.
    

**Важно:** приложение должно быть подписано. Без подписи автообновления не будут работать нормально.

#### `electron-updater`

Популярная обёртка над Squirrel.Mac:

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', (info) => {
  console.log(`Update available: ${info.version}`);
});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();
});
```

Поддерживает:

- GitHub Releases,
    
- Amazon S3,
    
- кастомные HTTP-сервера,
    
- Bintray.
    

#### React Native CodePush

У React Native нет встроенного автообновления как в Electron. **CodePush** позволяет OTA-обновления:

```javascript
import CodePush from 'react-native-code-push';

const MyApp = () => {
  return <App />;
};

export default CodePush(MyApp);
```

При запуске приложения:

1. идёт проверка обновления,
    
2. загружается новый JS bundle,
    
3. приложение перезапускается,
    
4. App Store сабмит не нужен.
    

**Ограничение:** CodePush обновляет только JavaScript. Изменения в нативном коде требуют новой публикации в store.

#### EAS Updates (Expo)

Похожий подход для Expo:

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    }
  }
}
```

---

### 4.8 Роль Docker в разработке приложений и CI/CD

Docker часто неправильно понимают в контексте нативной разработки. Он **не запускает твое нативное приложение**, он помогает **собирать и тестировать** его.

#### Docker как среда сборки

Например:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build:electron
```

Плюсы:

- одинаковые зависимости,
    
- меньше проблем «у меня на машине работает»,
    
- воспроизводимый CI/CD.
    

#### Docker в CI/CD

Пример GitHub Actions:

```yaml
name: Build
on: [push]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build Electron app
        run: npm run build:electron
      - name: Run tests in Docker
        run: |
          docker run \
            -v $(pwd):/app \
            -w /app \
            electronuserland/builder:wine \
            npm run test:e2e
```

Docker даёт:

- Linux-среду,
    
- Wine для Windows-сборок,
    
- Xvfb для headless GUI тестов,
    
- Chrome для Playwright E2E.
    

#### Распространённое заблуждение: Docker запускает native apps

**Неверно.** Docker-контейнеры — это Linux. Нельзя нативно запустить `.app` для macOS или iOS-приложение внутри Docker, потому что для этого нужны ядра macOS/iOS.

Но можно:

1. собирать macOS-приложение,
    
2. тестировать некоторые сценарии,
    
3. собирать Windows-приложение через Wine.
    

---

### 4.9 Симбиоз Web и Native

Современные приложения часто смешивают web и native.

#### Веб-приложение с нативным усилением

```text
┌─────────────────┐
│ Web App         │
│ (Browser)       │
│ - Main UI       │
│ - Business logic│
└────────┬────────┘
         │ myapp:// deep link
┌────────▼────────┐
│ Native App      │
│ (Electron)      │
│ - Notifications │
│ - File system   │
│ - System access │
└─────────────────┘
```

Пользователь может начать в браузере, нажать «Open in app», и нативное приложение возьмёт на себя тяжёлую работу.

#### Electron + webview

Electron может встраивать `webview`:

```javascript
// main.js
const mainWindow = new BrowserWindow();
mainWindow.loadFile('index.html');

// index.html
<webview src="https://example.com" preload="webview-preload.js"></webview>
```

`webview-preload.js` может перехватывать ссылки и слать сообщения наружу через `postMessage`.

#### React Native + WebView

React Native тоже может встраивать веб:

```javascript
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://example.com' }}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data);
      }}
    />
  );
}
```

А внутри webview:

```javascript
window.ReactNativeWebView.postMessage(
  JSON.stringify({ command: 'openCamera' })
);
```

Так можно показывать web-интерфейс, сохраняя доступ к native-возможностям.

---

## 5. Roadmap обучения

### База (1–2 недели)

1. Освоить JavaScript async/await, React hooks, state management.
    
2. Понять HTTP, DOM, event loop, service workers.
    
3. Почитать официальные docs по Electron Process Model и React Native Architecture.
    

### Путь Electron (3–4 недели)

1. Создать простое Electron-приложение:
    
    ```bash
    npx create-electron-app my-app
    cd my-app
    npm start
    ```
    
2. Потрогать `main.js`.
    
3. Добавить preload script с `contextBridge`.
    
4. Реализовать IPC.
    
5. Добавить меню через `electron.Menu`.
    
6. Собрать и локально подписать приложение.
    

### Путь React Native (3–4 недели)

1. Начать с Expo:
    
    ```bash
    npx create-expo-app my-app
    cd my-app
    npx expo start
    ```
    
2. Сделать простой UI на нативных компонентах.
    
3. Установить нативный модуль через Expo SDK.
    
4. Понять JSI.
    
5. При необходимости перейти на bare workflow.
    

### Путь iOS Native (3–4 недели)

1. Установить Xcode.
    
2. Создать новый iOS-проект на SwiftUI.
    
3. Запустить на симуляторе.
    
4. Понять provisioning profiles и code signing.
    
5. Запустить на реальном устройстве.
    

### Продвинутый этап (5–6 недели)

1. Настроить CI/CD.
    
2. Написать Dockerfile для воспроизводимых сборок.
    
3. Настроить автообновления (`electron-updater` или `EAS Updates`).
    
4. Добавить deep linking.
    
5. Настроить E2E-тесты (`Playwright` / `Detox`).
    

### Expert / Production Hardening (7+ недель)

1. Code signing и notarization на macOS.
    
2. Публикация в App Store.
    
3. Crash reporting (`Sentry`, `Bugsnag`).
    
4. Performance profiling (`Xcode Instruments`, `Hermes profiler`).
    
5. Security auditing (`CSP`, `SRI`, dependency scanning).
    

---

## 6. Что делать дальше в твоём React-проекте

Если у тебя уже есть React web project, вот практический путь к native.

### Вариант 1: Electron Desktop App (самый быстрый)

```bash
npm install electron electron-builder --save-dev
```

Создай `public/electron.js`:

```javascript
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

Обнови `package.json`:

```json
{
  "homepage": "./",
  "main": "public/electron.js",
  "scripts": {
    "react-start": "react-scripts start",
    "react-build": "react-scripts build",
    "electron-start": "electron .",
    "start": "concurrently \"npm run react-start\" \"wait-on http://localhost:3000 && npm run electron-start\"",
    "build": "npm run react-build && electron-builder"
  },
  "build": {
    "appId": "com.example.myapp",
    "files": ["build/**/*", "node_modules/**/*", "public/electron.js"],
    "directories": { "buildResources": "assets" }
  }
}
```

Запусти `npm start`, и React-приложение уже будет работать внутри Electron.

### Вариант 2: React Native + Expo (средняя сложность)

Не пытайся напрямую переиспользовать весь React web UI. У React Native другой компонентный слой. Но бизнес-логику можно шарить.

```bash
npx create-expo-app my-app
cd my-app
npm install zustand
```

Создай `src/store.ts`:

```typescript
import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

Использование на вебе:

```jsx
import { useStore } from './store';

export function App() {
  const count = useStore((s) => s.count);
  return <button onClick={() => useStore.getState().increment()}>{count}</button>;
}
```

Использование на мобилке:

```jsx
import { useStore } from '../store';
import { View, Text, TouchableOpacity } from 'react-native';

export function App() {
  const count = useStore((s) => s.count);
  return (
    <View>
      <Text>{count}</Text>
      <TouchableOpacity onPress={() => useStore.getState().increment()}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Шарь бизнес-логику, а не UI.**

---

## 9. Распространённые заблуждения

### 1. «`.app` — это файл»

**Неверно.** `.app` — это директория со специальной структурой. Finder просто показывает её как единый объект.

### 2. «Electron — это браузер»

**Частично верно.** Electron использует Chromium, но сам по себе это не браузер, а фреймворк для встраивания Chromium в нативное приложение. Главное отличие — доступ к ОС через main process.

### 3. «Код React Native выполняется нативно»

**Неверно.** JavaScript/JSX не компилируется в native. Нативными являются UI-компоненты. Логика остаётся на JavaScript.

### 4. «Expo — это и есть React Native»

**Неверно.** Expo — это платформа и toolchain поверх React Native.

### 5. «`.dmg` — это приложение»

**Неверно.** `.dmg` — это disk image. Приложение — это `.app` внутри него.

### 6. «Xcode — просто компилятор»

**Неверно.** Xcode управляет не только компиляцией, но и линковкой, подписью, устройствами, симулятором и профилированием.

### 7. «Docker запускает native apps»

**Неверно.** Docker работает с Linux-контейнерами.

### 8. «URL schemes безопасны»

**Неверно.** Любой сайт может попытаться вызвать `myapp://`. Более безопасный вариант — Universal Links / App Links.

### 9. «IPC в Electron синхронный»

**Неверно.** Он асинхронный. `ipcRenderer.invoke()` возвращает `Promise`.

### 10. «Code signing на macOS необязателен»

**Неверно.** Для нормального распространения, notarization и автообновлений подпись обязательна.

---

## 10. Заключение

Ландшафт разработки приложений фундаментально изменился. Стена между web и native разрушается. JavaScript, который когда-то жил только в браузере, теперь питает десктопные приложения (Electron), мобильные приложения (React Native) и backend-сервисы (Node.js). Но native всё ещё критичен: настоящая производительность и глубокая интеграция с ОС требуют нативного кода.

Архитектуры, которые мы разобрали — многопроцессная модель Electron, переход React Native к JSI/Fabric, интегрированный build-pipeline Xcode и новые схемы связи между браузером и native — показывают зрелую экосистему, где компромиссы уменьшены, но не исчезли.

### Главные выводы

1. **Electron практичен для desktop.** Модель main + renderer + IPC — надёжная основа.
    
2. **Новая архитектура React Native — это будущее.** JSI убирает расходы на сериализацию, Fabric улучшает рендеринг.
    
3. **Xcode — это намного больше, чем компилятор.**
    
4. **Важно понимать упаковку приложения.** `.app` и `.dmg` — это разные сущности.
    
5. **Интеграция — это будущее.** Web, native и system integration всё чаще работают вместе.
    
6. **DevOps и CI/CD теперь обязательны.** Docker, автотесты, подпись кода и OTA-обновления — уже не роскошь.
    

Если хочешь, следующим сообщением я могу сделать ещё и **нормальный технический конспект этого перевода для тебя — короткий, структурный и уже с акцентом на React/Vite/TypeScript и что именно тебе изучать первым**.