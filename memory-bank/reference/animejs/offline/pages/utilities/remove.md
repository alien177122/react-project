---
{
  "order": 369,
  "section": "utilities",
  "path": "remove",
  "slug": "utilities/remove",
  "url": "https://animejs.com/documentation/utilities/remove",
  "title": "remove()",
  "breadcrumb": [
    "Utilities",
    "remove()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "cleanInlineStyles()",
    "slug": "utilities/clean-inline-styles"
  },
  "next": {
    "title": "sync()",
    "slug": "utilities/sync"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# remove()

> Source: [https://animejs.com/documentation/utilities/remove](https://animejs.com/documentation/utilities/remove)
> Breadcrumb: Utilities → remove()

Utilities

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            remove()                                              
        

          
        Removes one or multiple targets from all active animations, a specific instance or a specific property, cancelling any Animation or Timeline referencing these targets if needed.

```js
const removed = utils.remove(targets, instance, propertyName);
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| instance (opt) | Animation \| Timeline |
| propertyName (opt) | Animatable Properties name `String` |

## Returns

An `Array` of the removed targeted elements

## Code example (js)

```js
import { animate, utils } from 'animejs';

let updates = 0;

const [ $removeFirstButton ] = utils.$('.remove-1');
const [ $removeSecondButton ] = utils.$('.remove-2');
const [ $updates ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  rotate: 360,
  alternate: true,
  loop: true,
  onUpdate: () => {
    $updates.textContent = updates++;
  }
});

$removeFirstButton.onclick = () => {
  utils.remove('.row:nth-child(1) .square');
}

$removeSecondButton.onclick = () => {
  utils.remove('.row:nth-child(2) .square', animation, 'x');
}
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<pre class="large log row">
  <span class="label">updates</span>
  <span class="value">--</span>
</pre>
<div class="medium row">
  <fieldset class="controls">
    <button class="button remove-1">Remove all first</button>
    <button class="button remove-2">Remove x second</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#utilities-remove .large.log.row {
  margin-top: .75rem;
}
```

---

← Prev: **cleanInlineStyles()** (`utilities/clean-inline-styles`) | Next: **sync()** (`utilities/sync`) →
