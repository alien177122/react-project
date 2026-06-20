---
{
  "order": 390,
  "section": "utilities",
  "path": "stagger/timeline-positions-staggering",
  "slug": "utilities/stagger/timeline-positions-staggering",
  "url": "https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering",
  "title": "Timeline positions staggering",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Timeline positions staggering"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Values staggering",
    "slug": "utilities/stagger/values-staggering"
  },
  "next": {
    "title": "Stagger value types",
    "slug": "utilities/stagger/stagger-value-types"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Timeline positions staggering

> Source: [https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering](https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering)
> Breadcrumb: Utilities → stagger() → Timeline positions staggering

Utilities

                          
              
                stagger()              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Timeline positions staggering                                              
        

          
        The timeline `add()` position argument accepts function-based values, enabling the use of the stagger function returned by the `stagger()` method when positioning a multi-target animation.

This results in each target having creating its own animation to a staggered position, increasing by a set number of milliseconds for each subsequent target.

Callbacks defined on the staggered animation are also staggered and are called for every target.

The `start` property of the `stagger()` parameter object allows to define the starting value of the stagger, and accepts the same values as the timeline `add()` position argument.

## Code example (js)

```js
import { createTimeline, stagger, utils } from 'animejs';

const tl = createTimeline();

const onComplete = ({ targets }) => {
  utils.set(targets, { color: 'var(--hex-red)' });
}

tl
.add('.circle', { x: '15rem', onComplete })
.label('circle completes')
.add(['.triangle', '.square'], {
  x: '15rem',
  onComplete, // Callbacks are aslo staggered
}, stagger(500, { start: 'circle completes-=500' }));
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

← Prev: **Values staggering** (`utilities/stagger/values-staggering`) | Next: **Stagger value types** (`utilities/stagger/stagger-value-types`) →
