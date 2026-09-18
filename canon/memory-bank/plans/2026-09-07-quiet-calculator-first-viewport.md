# План: quiet first viewport калькулятора

## Цель

Первый экран калькулятора на 390px снова quiet: форма «Тестовый подход» видна без прокрутки лишнего chrome; нет двойного billing; без клипа сверху у `.app-shell`.

## Критерий готовности

- Premium: нет большого `BillingPanel`, статус только в UserBar
- Hero калькулятора компактнее (без 3 tip-карточек над fold)
- Exercise picker без жёсткой белой рамки
- `.app-shell` не уходит в `top < 0` на 390px
- Browser verify 390px + typecheck/lint для затронутых файлов

## Пункты

1. Скрыть premium-блок BillingPanel (или рендерить null при premium).
2. Компактный hero для calculator tab (без rotating bento / tips).
3. Смягчить border exercise select.
4. Починить overflow/clip app-shell после Ionic removal.
5. Browser 390px verify.
