В эту папку можно складывать файлы, которые система будет анализировать для сайта.

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
