---
{
  "order": 182,
  "section": "getting-started",
  "path": "installation",
  "slug": "getting-started/installation",
  "url": "https://animejs.com/documentation/getting-started/installation",
  "title": "Installation",
  "breadcrumb": [
    "Getting started",
    "Installation"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Getting started",
    "slug": "getting-started"
  },
  "next": {
    "title": "Module imports",
    "slug": "getting-started/module-imports"
  }
}
---

# Installation

> Source: [https://animejs.com/documentation/getting-started/installation](https://animejs.com/documentation/getting-started/installation)
> Breadcrumb: Getting started → Installation

Getting started

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Installation                                              
        

          
        

## From NPM

Anime.js can be installed via the `animejs` package.

```bash
npm install animejs
```

Then you can import the Anime.js methods directly into your JavaScript with a bundler like Vite or esbuild.

## ES Modules

```js
import { animate } from 'animejs';
```

## CommonJS

```js
const { animate } = require('animejs');
```

## From a CDN

## ES Modules

| CDN Name | URL |
| --- | --- |
| esm.sh | esm.sh/animejs |
| JsDelivr | cdn.jsdelivr.net/npm/animejs/+esm |

```js
import { animate } from 'https://esm.sh/animejs';
```

## UMD Global object

| CDN Name | URL |
| --- | --- |
| JsDelivr | cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js |

```html

  const { animate } = anime;

```

## Direct download

Download from the library directly from the GitHub repository.

## Available Files

| File Name | Type |
| --- | --- |
| `dist/modules/index.js` | ES modules entry point |
| `dist/modules/index.cjs` | CommonJS modules entry point |
| `dist/bundles/anime.esm.js` | Bundled ES modules |
| `dist/bundles/anime.esm.min.js` | Bundled and minified ES modules |
| `dist/bundles/anime.umd.js` | Bundled UMD (universal modules definition) |
| `dist/bundles/anime.umd.min.js` | Bundled and minified UMD |

## ES Modules

```js
import { animate } from './animejs/dist/bundles/anime.esm.min.js';
```

## UMD Global object

```html

  const { animate } = anime;

```

---

← Prev: **Getting started** (`getting-started`) | Next: **Module imports** (`getting-started/module-imports`) →
