---
{
  "order": 378,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-from",
  "slug": "utilities/stagger/stagger-parameters/stagger-from",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from",
  "title": "Stagger from",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger from"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger start",
    "slug": "utilities/stagger/stagger-parameters/stagger-start"
  },
  "next": {
    "title": "Stagger reversed",
    "slug": "utilities/stagger/stagger-parameters/stagger-reversed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger from

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger from

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger from                                              
        

          
        Defines the starting position of the stagger effect.

## Accepts

| Value | Description |
| --- | --- |
| `Number` | The starting index of the effect |
| `'first'` | Equivalent to index `0` |
| `'center'` | Starts the effect from the center |
| `'last'` | Starts the effect from the last element |
| `'random'` | Randomises the order of the staggered values |
| `[x, y]` | Normalized coordinate array (`0` to `1`) for precise 2D grid origin control (requires `grid`) |

## Default

`0`

## Code example (js)

```js
import { createtimeline, stagger } from 'animejs';

const tl = createTimeline({
  loop: true,
  defaults: { duration: 500 },
  delay: 500,
  loopDelay: 500
})
.add('.row:nth-child(1) .square:nth-child(8)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(1) .square', {
  scale: 0,
  delay: stagger(25, { from: 7 }),
}, '<')
.add('.row:nth-child(2) .square:first-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(2) .square', {
  scale: 0,
  delay: stagger(25, { from: 'first' }),
}, '<')
.add('.row:nth-child(3) .square:nth-child(6)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(3) .square', {
  scale: 0,
  delay: stagger(25, { from: 'center' }),
}, '<')
.add('.row:nth-child(4) .square:last-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(4) .square', {
  scale: 0,
  delay: stagger(25, { from: 'last' }),
}, '<')
.set('.row .square', { color: 'currentColor' })
.add('.row .square', {
  scale: 1,
  delay: stagger(25, { from: 'random' }),
})
```

## Code example (html)

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

← Prev: **Stagger start** (`utilities/stagger/stagger-parameters/stagger-start`) | Next: **Stagger reversed** (`utilities/stagger/stagger-parameters/stagger-reversed`) →
