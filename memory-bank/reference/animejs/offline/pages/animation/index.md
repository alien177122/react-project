---
{
  "order": 12,
  "section": "animation",
  "path": "(index)",
  "slug": "animation",
  "url": "https://animejs.com/documentation/animation",
  "title": "Animation",
  "breadcrumb": [
    "Animation"
  ],
  "prev": {
    "title": "Timer properties",
    "slug": "timer/timer-properties"
  },
  "next": {
    "title": "Targets",
    "slug": "animation/targets"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Animation

> Source: [https://animejs.com/documentation/animation](https://animejs.com/documentation/animation)
> Breadcrumb: Animation

## 
          
            Animation                                              
        

          
        

## Animates the properties values of targeted elements, with a wide range of parameters, callbacks and methods.

Animations are created using the `animate()` method imported from the main `'animejs'` module:

```js
import { animate } from 'animejs';

const animation = animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/animation'` subpath:

```js
import { animate } from 'animejs/animation';
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |

## Returns

`JSAnimation`

## WAAPI powered animations

Anime.js provides a more lightweight (3KB) version of the `animate()` method (10KB) powered by the Web Animation API.

```js
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

The WAAPI version has less features overall, but covers most of the basic API.

To know more about when to use the WAAPI version and its potential pitfalls, please refer to the Web Animations API Guide.

Features only available in the JavaScript version are indicated with a (JS) badge and WAAPI specific features are indicated with a (WAAPI) badge

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)
- [Web Animations API Guide](https://animejs.com/documentation/web-animation-api)

## Code example (js)

```js
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

animate(chars, {
  // Property keyframes
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  rotate: {
    from: '-1turn',
    delay: 0
  },
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true
});
```

## Code example (html)

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WORLD</h2>
</div>
```

## Code example (css)

```css
#animation .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
}
```

---

← Prev: **Timer properties** (`timer/timer-properties`) | Next: **Targets** (`animation/targets`) →
