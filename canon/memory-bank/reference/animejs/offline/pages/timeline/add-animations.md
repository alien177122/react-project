---
{
  "order": 272,
  "section": "timeline",
  "path": "add-animations",
  "slug": "timeline/add-animations",
  "url": "https://animejs.com/documentation/timeline/add-animations",
  "title": "Add animations",
  "breadcrumb": [
    "Timeline",
    "Add animations"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Add timers",
    "slug": "timeline/add-timers"
  },
  "next": {
    "title": "Sync WAAPI animations",
    "slug": "timeline/sync-waapi-animations"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Add animations

> Source: [https://animejs.com/documentation/timeline/add-animations](https://animejs.com/documentation/timeline/add-animations)
> Breadcrumb: Timeline → Add animations

Timeline

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Add animations                                              
        

          
        Animations can be added to a timeline using the `add()` method or the `sync()` method.

## Animation creation

Creates and adds an animation directly to the timeline with the `add()` method.

This allows tween value composition with the timeline's existing children.

```js
timeline.add(targets, parameters, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| parameters | An `Object` of Animatable properties, Tween parameters, Playback settings and Animation callbacks |
| position (opt) | Time position |

## Animation synchronisation

Synchronises an existing animation with the `sync()` method.

Tween value composition is handled when the animation is created, and won't affect the timeline's existing children when added.

```js
const animation = animate(target, { x: 100 });

timeline.sync(animation, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| animation | Animation |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [add()](https://animejs.com/documentation/timeline/timeline-methods/add)
- [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync)

## Code example (js)

```js
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tl = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
  alternate: true,
  loop: 2,
})
.add('.square', {
  x: '15rem',
});
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

← Prev: **Add timers** (`timeline/add-timers`) | Next: **Sync WAAPI animations** (`timeline/sync-waapi-animations`) →
