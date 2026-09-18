# Отчёт: Uncle Bob Quality Gates (2026-07-30)

## Итог

В Training Calculator внедрён пилот физических ограничений агентов по мотивам Uncle Bob (swarm-forge / APS), без установки tmux SwarmForge.

## Бэкап

| Диск     | Путь                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------- |
| Mini_hdd | `/Volumes/Mini_hdd/Backups/React_Project_Журнал_Сплит_pre-uncle-bob_2026-07-30_1922`               |
| DATA_1TB | `/Volumes/DATA_1TB/Backups/React_Project/React_Project_Журнал_Сплит_pre-uncle-bob_2026-07-30_1922` |

## Команды

- `npm run quality:quick` — typecheck + unit
- `npm run quality` — + acceptance + CRAP-lite + mutation + eslint calc
- `npm run test:acceptance` / `test:mutate` / `test:crap`

## Результаты проверки

| Gate                   | Результат       |
| ---------------------- | --------------- |
| typecheck              | PASS            |
| unit (160)             | PASS            |
| Gherkin acceptance (6) | PASS            |
| mutation calc.ts       | PASS 100% (8/8) |
| CRAP-lite              | PASS            |
| `npm run quality`      | PASS            |

## Ключевые файлы

- `memory-bank/constitution/uncle-bob-quality-gates.md`
- `.cursor/rules/uncle-bob-quality-gates.mdc`
- `features/calculator/one-rm.feature`
- `scripts/quality/*`

## Дальше (по запросу)

Больше Gherkin (прогрессия/журнал), Stryker, ужесточение complexity 12→8→4, чистка полного `npm run lint`.
