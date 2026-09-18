---
{
  "order": 392,
  "section": "utilities",
  "path": "sync",
  "slug": "utilities/sync",
  "url": "https://animejs.com/documentation/utilities/sync",
  "title": "sync()",
  "breadcrumb": [
    "Utilities",
    "sync()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "remove()",
    "slug": "utilities/remove"
  },
  "next": {
    "title": "keepTime()",
    "slug": "utilities/createtimekeeper"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# sync()

> Source: [https://animejs.com/documentation/utilities/sync](https://animejs.com/documentation/utilities/sync)
> Breadcrumb: Utilities → sync()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            sync()                                              
        

          
        Execute a callback function in sync with the engine loop.

```js
utils.sync(function);
```

## Parameters

| Name | Accepts |
| --- | --- |
| callback | `Function` |

## Returns

`Timer`

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

← Prev: **remove()** (`utilities/remove`) | Next: **keepTime()** (`utilities/createtimekeeper`) →
