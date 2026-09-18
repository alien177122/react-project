---
{
  "order": 80,
  "section": "animation",
  "path": "tween-value-types/relative-value",
  "slug": "animation/tween-value-types/relative-value",
  "url": "https://animejs.com/documentation/animation/tween-value-types/relative-value",
  "title": "Relative value",
  "breadcrumb": [
    "Animation",
    "Tween value types"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Unit conversion value",
    "slug": "animation/tween-value-types/unit-conversion-value"
  },
  "next": {
    "title": "Color value",
    "slug": "animation/tween-value-types/color-value"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Relative value

> Source: [https://animejs.com/documentation/animation/tween-value-types/relative-value](https://animejs.com/documentation/animation/tween-value-types/relative-value)
> Breadcrumb: Animation → Tween value types

Animation

                          
              
                Tween value types              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Relative value                                    JS          
        

          
        Adds, subtracts or multiplies the current target value by a specified amount.

## Accepts

| Prefix | Effect | Examples |
| --- | --- | --- |
| `'+='` | Add | `'+=45'` \| `'+=45px'` |
| `'-='` | Subtracts | `'-=45'` \| `'-=45deg'` |
| `'*='` | Multiply | `'*=.5'` |

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $clock ] = utils.$('.clock');
const [ $add ] = utils.$('.add');
const [ $sub ] = utils.$('.sub');
const [ $mul ] = utils.$('.mul');

const add = () => animate($clock, { rotate: '+=90' });
const sub = () => animate($clock, { rotate: '-=90' });
const mul = () => animate($clock, { rotate: '*=.5' });

$add.addEventListener('click', add);
$sub.addEventListener('click', sub);
$mul.addEventListener('click', mul);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="clock"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button add">+ 90°</button>
    <button class="button sub">- 90°</button>
    <button class="button mul">× .5</button>
  </fieldset>
</div>
```

---

← Prev: **Unit conversion value** (`animation/tween-value-types/unit-conversion-value`) | Next: **Color value** (`animation/tween-value-types/color-value`) →
