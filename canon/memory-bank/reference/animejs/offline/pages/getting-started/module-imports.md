---
{
  "order": 183,
  "section": "getting-started",
  "path": "module-imports",
  "slug": "getting-started/module-imports",
  "url": "https://animejs.com/documentation/getting-started/module-imports",
  "title": "Module imports",
  "breadcrumb": [
    "Getting started",
    "Module imports"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Installation",
    "slug": "getting-started/installation"
  },
  "next": {
    "title": "Using with vanilla JS",
    "slug": "getting-started/using-with-vanilla-js"
  }
}
---

# Module imports

> Source: [https://animejs.com/documentation/getting-started/module-imports](https://animejs.com/documentation/getting-started/module-imports)
> Breadcrumb: Getting started → Module imports

Getting started

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Module imports                                              
        

          
        Anime.js has a very flexible modules-first API and excellent tree shaking support, making it one of the most lightweight JavaScript animation libraries.

Anime.js modules can be imported straight from the main `'animejs'` module, or more granularly from specific subpaths, either by using a bundler like Vite or esbuild, or natively without a build step using importmap.

## Importing from the main module

Every Anime.js module can be directly imported from the main module `'animejs'`:

```js
import { animate, splitText, stagger, random, globals } from 'animejs';

const split = splitText('p');

animate(split.words, {
  opacity: () => random(0, 1, 2),
  delay: stagger(50),
});
```

## Importing from subpaths

When not using a bundler, or when tree shaking cannot be activated in a project, the entire library needs to be imported even when only using one module.

To solve this, Anime.js allows importing specific functionality from a subpath, without having to load the entire library at any point during development.

Each function can be imported directly from its subpath:

```js
import { animate } from 'animejs/animation';
import { splitText } from 'animejs/text';
import { stagger, random } from 'animejs/utils';

const split = splitText('p');

animate(split.words, {
  opacity: () => random(0, 1, 2),
  delay: stagger(50),
});
```

This approach ensures that only the code required for the specified functionality is loaded.

## List of available subpaths

```js
import { animate } from 'animejs/animation';
import { createTimer } from 'animejs/timer';
import { createTimeline } from 'animejs/timeline';
import { createAnimatable } from 'animejs/animatable';
import { createDraggable } from 'animejs/draggable';
import { createLayout } from 'animejs/layout';
import { createScope } from 'animejs/scope';
import { engine } from 'animejs/engine';
import * as events from 'animejs/events';
import * as easings from 'animejs/easings';
import * as utils from 'animejs/utils';
import * as svg from 'animejs/svg';
import * as text from 'animejs/text';
import * as waapi from 'animejs/waapi';
```

## Importing ES modules without a bundler

With `importmap`, the main module and any of the subpath modules can be imported just like with a bundler, but without a build step:

```html

{
  "imports": {
    "animejs": "/node_modules/animejs/dist/modules/index.js",
    "animejs/animation": "/node_modules/animejs/dist/modules/animation/index.js",
    "animejs/timer": "/node_modules/animejs/dist/modules/timer/index.js",
    "animejs/timeline": "/node_modules/animejs/dist/modules/timeline/index.js",
    "animejs/animatable": "/node_modules/animejs/dist/modules/animatable/index.js",
    "animejs/draggable": "/node_modules/animejs/dist/modules/draggable/index.js",
    "animejs/layout": "/node_modules/animejs/dist/modules/layout/index.js",
    "animejs/scope": "/node_modules/animejs/dist/modules/scope/index.js",
    "animejs/engine": "/node_modules/animejs/dist/modules/engine/index.js",
    "animejs/events": "/node_modules/animejs/dist/modules/events/index.js",
    "animejs/easings": "/node_modules/animejs/dist/modules/easings/index.js",
    "animejs/utils": "/node_modules/animejs/dist/modules/utils/index.js",
    "animejs/svg": "/node_modules/animejs/dist/modules/svg/index.js",
    "animejs/text": "/node_modules/animejs/dist/modules/text/index.js",
    "animejs/waapi": "/node_modules/animejs/dist/modules/waapi/index.js"
  }
}

  import { animate } from 'animejs/animation';
  import { splitText } from 'animejs/text';
  import { stagger, random } from 'animejs/utils';

  const split = splitText('p');

  animate(split.words, {
    opacity: () => random(0, 1, 2),
    delay: stagger(50),
  });

```

---

← Prev: **Installation** (`getting-started/installation`) | Next: **Using with vanilla JS** (`getting-started/using-with-vanilla-js`) →
