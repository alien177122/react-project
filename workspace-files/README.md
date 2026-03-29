В эту папку можно складывать файлы, которые система будет анализировать для сайта.

В обычном web/dev режиме workspace живёт прямо в проекте. В packaged macOS desktop он переезжает в пользовательскую папку приложения:

- `~/Library/Application Support/Training Calculator/workspace-files/inbox`
- `~/Library/Application Support/Training Calculator/workspace-files/analysis`

Точный путь desktop-версия также показывает внутри UI.

- `workspace-files/inbox` — входящие файлы, которые ты добавляешь вручную.
- `workspace-files/analysis` — JSON-результаты анализа, которые использует backend/API.

Команды:

- `npm run files:status`
- `npm run files:analyze`
- `npm run files:watch`

OCR через Ollama:

- запусти `ollama serve`
- подтяни модель `ollama pull glm-ocr`

После этого анализ изображений из `workspace-files/inbox` будет идти через локальный `glm-ocr`.

Рекомендуемый режим:

- в одном терминале держи `npm run files:watch`
- просто складывай файлы в `workspace-files/inbox`
- анализы будут автоматически появляться в `workspace-files/analysis`
