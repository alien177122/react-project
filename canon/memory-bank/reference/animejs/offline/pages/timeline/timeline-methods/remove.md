---
{
  "order": 298,
  "section": "timeline",
  "path": "timeline-methods/remove",
  "slug": "timeline/timeline-methods/remove",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/remove",
  "title": "remove()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "remove()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "label()",
    "slug": "timeline/timeline-methods/label"
  },
  "next": {
    "title": "call()",
    "slug": "timeline/timeline-methods/call"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# remove()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/remove](https://animejs.com/documentation/timeline/timeline-methods/remove)
> Breadcrumb: Timeline → Timeline methods → remove()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            remove()                                              
        

          
        Removes animations, timers, timelines, targets or specific tween properties from the timeline.

The timeline will pauses automatically if all targets, animations, timers and timelines are removed.

Removing items from a timeline doesn't affect its duration. If you need to change the shape and duration of the timeline, you should create a new timeline instead.

## Removing animations, timers or timelines

```js
timeline.remove([animation, timer, timeline]);
```

| Parameter | Accepts |
| --- | --- |
| object | Animation \| Timer \| Timeline |
| position (opt) | Time position |

## Removing targets

```js
timeline.remove(targets);
```

| Parameter | Accepts |
| --- | --- |
| targets | Targets |

## Removing targets properties

```js
timeline.remove(targets, propertyName);
```

| Parameter | Accepts |
| --- | --- |
| targets | Targets |
| propertyName | A valid Animatable properties `String` |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { animate, createTimeline, utils } from 'animejs';

const [ $removeA, $removeB, $removeC ] = utils.$('.button');

const animation = animate('.circle', { x: '15rem', scale: [1, .5, 1] });

const tl = createTimeline({ loop: true, alternate: true })
.sync(animation)
.add('.triangle', { x: '15rem', rotate: 360 }, 100)
.add('.square',   { x: '15rem' }, 200);

const removeAnimation = () => tl.remove(animation);
const removeTarget = () => tl.remove('.square');
const removeRotate = () => tl.remove('.triangle', 'rotate');

$removeA.addEventListener('click', removeAnimation);
$removeB.addEventListener('click', removeTarget);
$removeC.addEventListener('click', removeRotate);
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
    <button class="button">Remove anim</button>
    <button class="button">Remove target</button>
    <button class="button">remove tween</button>
  </fieldset>
</div>
```

---

← Prev: **label()** (`timeline/timeline-methods/label`) | Next: **call()** (`timeline/timeline-methods/call`) →
