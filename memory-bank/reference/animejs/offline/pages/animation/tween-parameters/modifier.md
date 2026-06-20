---
{
  "order": 72,
  "section": "animation",
  "path": "tween-parameters/modifier",
  "slug": "animation/tween-parameters/modifier",
  "url": "https://animejs.com/documentation/animation/tween-parameters/modifier",
  "title": "modifier",
  "breadcrumb": [
    "Animation",
    "Tween parameters"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "composition",
    "slug": "animation/tween-parameters/composition"
  },
  "next": {
    "title": "Keyframes",
    "slug": "animation/keyframes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# modifier

> Source: [https://animejs.com/documentation/animation/tween-parameters/modifier](https://animejs.com/documentation/animation/tween-parameters/modifier)
> Breadcrumb: Animation → Tween parameters

Animation

                          
              
                Tween parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            modifier                                    JS          
        

          
        A `Function` that modifies or alters the behavior of the animated numerical value. Modifiers can be set globally for all animation properties or locally for a specific property. If the final animated value contains strings, like units (`'100px'`), the string part is automatically added to the final value before being applied to the element.

Most Utilities functions can be used as modifiers.

## Accepts

A `Function` with the following parameters:

## Parameters

| Name | Description |
| --- | --- |
| `value` | The current animated numerical value |

## Must returns

`Number`

## Default

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.modifier = v => -v; // Don't do this :D
```

## Related

- [Utilities](https://animejs.com/documentation/utilities)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  modifier: utils.round(0), // Round to 0 decimals
  duration: 4000,
});

animate('.row:nth-child(2) .square', {
  x: '85rem',
  modifier: v => v % 17,
  duration: 4000,
});

animate('.row:nth-child(3) .square', {
  x: '17rem',
  y: {
    to: '70rem',
    modifier: v => Math.cos(v) / 2, // Specific modifier to y property
  },
  duration: 4000,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">utils.round(0)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => v % 17</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => Math.cos(v) / 2</div>
</div>
```

---

← Prev: **composition** (`animation/tween-parameters/composition`) | Next: **Keyframes** (`animation/keyframes`) →
