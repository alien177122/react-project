---
{
  "order": 297,
  "section": "timeline",
  "path": "timeline-methods/refresh",
  "slug": "timeline/timeline-methods/refresh",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/refresh",
  "title": "refresh()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "refresh()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "stretch()",
    "slug": "timeline/timeline-methods/stretch"
  },
  "next": {
    "title": "Timeline properties",
    "slug": "timeline/timeline-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# refresh()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/refresh](https://animejs.com/documentation/timeline/timeline-methods/refresh)
> Breadcrumb: Timeline → Timeline methods → refresh()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            refresh()                                              
        

          
        Re-computes the timeline children animated values defined with a Function based value by updating their *from* values to their current target values, and their *to* values to their newly computed values.

Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const tl = createTimeline({
  loop: true,
  onLoop: self => self.refresh()
})
.add('.circle',   { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.triangle', { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.square',   { x: () => utils.random(0, 15) + 'rem' }, 0);

const refreshTimeline = () => tl.refresh().restart();

$refreshButton.addEventListener('click', refreshTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

---

← Prev: **stretch()** (`timeline/timeline-methods/stretch`) | Next: **Timeline properties** (`timeline/timeline-properties`) →
