---
{
  "order": 394,
  "section": "web-animation-api",
  "path": "(index)",
  "slug": "web-animation-api",
  "url": "https://animejs.com/documentation/web-animation-api",
  "title": "Web Animation API",
  "breadcrumb": [
    "Web Animation API"
  ],
  "prev": {
    "title": "Spring",
    "slug": "easings/spring"
  },
  "next": {
    "title": "When to use WAAPI",
    "slug": "web-animation-api/when-to-use-waapi"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Web Animation API

> Source: [https://animejs.com/documentation/web-animation-api](https://animejs.com/documentation/web-animation-api)
> Breadcrumb: Web Animation API

## 
          
            Web Animation API                                              
        

          
        

## Create WAAPI powered animations with the simplicity of Anime.js.

Anime.js offers a even more lightweight alternative (3KB versus 10KB) to the `animate()` method that uses the Web Animation `Element.animate()` API under the hood.

WAAPI powered animations are created using the `waapi.animate()` method imported from the main `'animejs'` module:

```js
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/waapi'` subpath:

```js
import { waapi } from 'animejs/waapi';
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |

## Returns

`WAAPIAnimation`

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { waapi, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

waapi.animate(chars, {
  translate: `0 -2rem`,
  delay: stagger(100),
  duration: 600,
  loop: true,
  alternate: true,
  ease: 'inOut(2)',
});
```

## Code example (html)

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WAAPI</h2>
</div>
```

## Code example (css)

```css
#web-animation-api .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
}
```

---

← Prev: **Spring** (`easings/spring`) | Next: **When to use WAAPI** (`web-animation-api/when-to-use-waapi`) →
