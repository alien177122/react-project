# Anime.js — offline documentation mirror

> **410** / 410 pages · crawled 2026-05-31  
> Source: https://animejs.com/documentation

## Structure (for scroll / reader)

| File | Purpose |
| ---- | ------- |
| [`manifest.json`](./manifest.json) | Flat ordered list — **use for global scroll** |
| [`sections-index.json`](./sections-index.json) | Files grouped by module |
| [`AUDIT.json`](./AUDIT.json) | Last verification report (`npm run docs:animejs:verify`) |
| [`pages/<section>/`](./pages/) | One `.md` per doc URL |

Each page has JSON frontmatter: `order`, `section`, `slug`, `url`, `prev`, `next`, `breadcrumb`.

## Scroll integration (future)

```typescript
import manifest from './manifest.json';

// Global vertical scroll through docs
const pages = manifest.pages.sort((a, b) => a.order - b.order);

// Or follow prev/next chain from current slug
function walkNext(slug: string) {
  const page = manifest.pages.find(p => p.slug === slug);
  return page?.next ?? null;
}
```

## Regenerate

```bash
npm run docs:animejs:mirror          # full crawl
npm run docs:animejs:mirror:force    # re-fetch all (after parser fix)
npm run docs:animejs:mirror:retry    # only missing files
npm run docs:animejs:verify          # audit → offline/AUDIT.json
```

Errors: 0
