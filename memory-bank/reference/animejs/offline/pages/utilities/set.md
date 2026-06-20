---
{
  "order": 372,
  "section": "utilities",
  "path": "set",
  "slug": "utilities/set",
  "url": "https://animejs.com/documentation/utilities/set",
  "title": "set()",
  "breadcrumb": [
    "Utilities",
    "set()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "get()",
    "slug": "utilities/get"
  },
  "next": {
    "title": "cleanInlineStyles()",
    "slug": "utilities/clean-inline-styles"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# set()

> Source: [https://animejs.com/documentation/utilities/set](https://animejs.com/documentation/utilities/set)
> Breadcrumb: Utilities → set()

Utilities

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            set()                                              
        

          
        Immediately sets one or multiple properties values to one or multiple targets.

```js
const setter = utils.set(targets, properties);
```

## Parameters

| Name | Accepts | Description |
| --- | --- | --- |
| targets | Targets | The targeted element(s) |
| properties | `Object` | An object of valid properties and values of the target |

## Returns

Animation

`utils.set()` is useful for setting complex values, but for repeatedly updating the same properties on the same targets, using an Animatable is recommended for better performances.

`utils.set()` won't work if you try to set an attribute on a DOM or SVG element not already defined on the element.

## Related

- [Animation](https://animejs.com/documentation/animation)

## Code example (js)

```js
import { utils, stagger } from 'animejs';

const [ $set, $revert ] = utils.$('button');
const squares = utils.$('.square');
const colors = ['red', 'orange', 'yellow'];

let setter;

const setStyles = () => {
  setter = utils.set(squares, {
    borderRadius: '50%',
    y: () => utils.random(-1, 1) + 'rem',
    scale: stagger(.1, { start: .25, ease: 'out' }),
    color: () => `var(--hex-${utils.randomPick(colors)})`
  });
  $set.setAttribute('disabled', 'true');
  $revert.removeAttribute('disabled');
}

const revertStyles = () => {
  setter.revert();
  $set.removeAttribute('disabled');
  $revert.setAttribute('disabled', 'true');
}

$set.addEventListener('click', setStyles);
$revert.addEventListener('click', revertStyles);
```

## Code example (html)

```html
<div class="large justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Set styles</button>
    <button disabled>Revert styles</button>
  </fieldset>
</div>
```

---

← Prev: **get()** (`utilities/get`) | Next: **cleanInlineStyles()** (`utilities/clean-inline-styles`) →
