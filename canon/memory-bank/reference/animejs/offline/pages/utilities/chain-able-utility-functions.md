---
{
  "order": 353,
  "section": "utilities",
  "path": "chain-able-utility-functions",
  "slug": "utilities/chain-able-utility-functions",
  "url": "https://animejs.com/documentation/utilities/chain-able-utility-functions",
  "title": "Chain-able utility functions",
  "breadcrumb": [
    "Utilities",
    "Chain-able utility functions"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "radToDeg()",
    "slug": "utilities/rad-to-deg"
  },
  "next": {
    "title": "Easings",
    "slug": "easings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Chain-able utility functions

> Source: [https://animejs.com/documentation/utilities/chain-able-utility-functions](https://animejs.com/documentation/utilities/chain-able-utility-functions)
> Breadcrumb: Utilities → Chain-able utility functions

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Chain-able utility functions                                              
        

          
        Chain-able utility functions allow for the creation of complex operations by combining multiple functions in a single expression.

```js
const clampRoundPad = utils.clamp(0, 100).round(2).padStart(6, '0');
clampRoundPad(125)   // '000100'
clampRoundPad(75.25) // '075.25'
```

The following utility functions support chaining:

- `round()`

- `clamp()`

- `snap()`

- `wrap()`

- `mapRange()`

- `interpolate()`

- `roundPad()`

- `padStart()`

- `padEnd()`

- `degToRad()`

- `radToDeg()`

Chain-able functions works great in combinaison with the modifier tween parameter.

## Usage

Chain-able functions are created when calling a utility function without its optional value parameter:

```js
const chainableClamp = utils.clamp(0, 100); // Returns a chain-able function
const result = chainableClamp(150); // 100
```

## Chaining

Chain-able functions are combined like this:

```js
const normalizeAndRound = utils.mapRange(0, 255, 0, 1).round(1);
normalizeAndRound(128); // '0.5'
normalizeAndRound(64);  // '0.3'
```

## Related

- [Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1000,
  modifier: utils.wrap(0, 10).roundPad(3).padStart(6, '0'),
  duration: 100000,
  alternate: true,
  loop: true,
  ease: 'linear',
});
```

## Code example (html)

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

← Prev: **radToDeg()** (`utilities/rad-to-deg`) | Next: **Easings** (`easings`) →
