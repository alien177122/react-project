# План: этап 5 — framer-motion trim (eager shell)

## Цель

Вынести `framer-motion` из initial JS chunk: TabPanel, AppShell hero, HeroSection, AuthScreen, PremiumInputMessage → CSS transitions. Критерий: `index-*.js` gzip не содержит framer; lazy Theory сохраняет motion; gates зелёные.

## Пункты

1. TabPanel + AppShell hero → CSS keyframe enter.
2. HeroSection / AppHeroDecor / AppHeroRotatingBento → CSS-only (app-hero).
3. PremiumInputMessage + AuthScreen → CSS enter.
4. Lazy `AuthScreen` в AppShell.
5. Gates + build diff.
