# Constitution articles (Uncle Bob–style, Training Calculator)

Адаптация [unclebob/swarm-forge](https://github.com/unclebob/swarm-forge) **без** tmux swarm.
Полные числовые ворота: [`uncle-bob-quality-gates.md`](../uncle-bob-quality-gates.md).

Agents MUST read these before Tier A/B work.

| Article                                              | Topic                        |
| ---------------------------------------------------- | ---------------------------- |
| [01-tdd-and-gates.md](./01-tdd-and-gates.md)         | Tests + physical gates       |
| [02-module-boundaries.md](./02-module-boundaries.md) | shared / server / UI         |
| [03-formatting-and-ui.md](./03-formatting-and-ui.md) | Prettier, lint, UI standards |
| [04-security.md](./04-security.md)                   | Auth, secrets, audit         |
| [goal-first-plan.md](../goal-first-plan.md)          | Цель → файл плана → проверка |

Violation of an article → stop; fix root cause; re-run `npm run quality` / `quality:quick`.
