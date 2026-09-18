---
{
  "order": 133,
  "section": "easings",
  "path": "spring",
  "slug": "easings/spring",
  "url": "https://animejs.com/documentation/easings/spring",
  "title": "Spring",
  "breadcrumb": [
    "Easings",
    "Spring"
  ],
  "since": "Since 3.0.0",
  "prev": {
    "title": "Irregular easing",
    "slug": "easings/irregular-easing"
  },
  "next": {
    "title": "Web Animation API",
    "slug": "web-animation-api"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Spring

> Source: [https://animejs.com/documentation/easings/spring](https://animejs.com/documentation/easings/spring)
> Breadcrumb: Easings → Spring

Easings

                      

          
                        Since 3.0.0
                      

        
                

## 
          
            Spring                                              
        

          
        A spring curve generator that returns an easing function with its corresponding duration to create physics-based animations.

The `spring()` method can be passed directly to the `ease` parameter of the `animate()` method:

```js
import { animate, spring } from 'animejs';

animate(target, { x: 100, ease: spring({ bounce: .5 }) });
```

The animation's `duration` parameter is overridden by the spring's calculated settling duration.

## Perceived parameters

These parameters provide more intuitive and predictable controls over the generated curve, focusing on the visual *feel* rather than the underlying physics

When using perceived parameters, the physics values are calculated automatically using Apple's SwiftUI spring model.

```js
animate(target, { x: 100, ease: spring({ bounce: .5, duration: 350 }) });
```

| Name | Type | Info |
| --- | --- | --- |
| `bounce` | `Number` | Controls the "bounciness" of the animation. Range: `-1` to `1`. Default: `0.5`. Values from `0` to `1` create bouncy curves, values below `0` create over-damped curves. It's recommended to keep the `bounce` values between `-.5` and `.5`, otherwise values outside this range will create very extreme curves and won't play well with the `duration` parameter. |
| `duration` | `Number` | The perceived duration in milliseconds, when the animation feels complete visually. Range: `10` to `10000`. Default: `628`. |

## Physics parameters

Direct control over the underlying spring physics model. Use these when you need more precise control over the physics simulation.

```js
animate(target, { x: 100, ease: spring({ stiffness: 95, damping: 13 }) });
```

| Name | Type | Info |
| --- | --- | --- |
| `mass` | `Number` | Mass of the object attached to the spring. Range: `1` to `10000`. Default: `1`. Higher values create more inertia, resulting in slower, heavier motion. |
| `stiffness` | `Number` | Spring stiffness coefficient. Range: `0` to `10000`. Default: `100`. Higher values create a tighter spring that responds more quickly and aggressively. |
| `damping` | `Number` | Damping coefficient that opposes motion. Range: `0` to `10000`. Default: `10`. Controls how quickly oscillations decay. Higher values reduce bounce. |
| `velocity` | `Number` | Initial velocity of the animation. Range: `-10000` to `10000`. Default: `0`. Positive values give the animation a "running start" in the target direction. |

## Perceived `onComplete` callback

This only works with the JS version of `animate()`.

Animation's `onComplete` callback is called relative to the spring settling duration, which creates a visual disconnect between the moment the animation feels complete and the actual callback call.

To solve this, a separate `onComplete` callback can be defined on the spring parameter object and will be called when the spring perceived `duration` is reached.

```js
animate(target, {
  x: 100,
  onCompete: () => console.log('called when the setting duration is reached'),
  ease: spring({ 
    bounce: .25,
    duration: 350,
    onCompete: () => console.log('called when the spring perceived duration is reached'),
  })
});
```

| Name | Type | Info |
| --- | --- | --- |
| `onComplete` | `Function` | Callback triggered when the spring reaches its perceived duration (not the settling duration). This fires when the animation appears complete to viewers. |

## Examples

| Name | Editor link |
| --- | --- |
| Default spring | Open in editor |
| Snappy spring | Open in editor |
| Bouncy spring | Open in editor |
| Strong spring | Open in editor |

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)
- [animate()](https://animejs.com/documentation/animation)

## Code example (js)

```js
import { animate, spring, utils } from 'animejs';

const [ $square1, $square2, $square3 ] = utils.$('.square');

utils.set('.square', { color: 'var(--hex-red-1)' })

animate($square1, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square1, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .15,
    duration: 500,
    onComplete: () => utils.set($square1, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square2, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square2, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .3,
    duration: 500,
    onComplete: () => utils.set($square2, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square3, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square3, { color: 'var(--hex-green-1)' }),
  ease: spring({
    stiffness: 90,
    damping: 14,
    onComplete: () => utils.set($square3, { color: 'var(--hex-yellow-1)' }),
  })
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ bounce: .15, duration: 500 }</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ bounce: .3, duration: 500 }</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">{ stiffness: 90, damping: 14 }</div>
</div>
```

---

← Prev: **Irregular easing** (`easings/irregular-easing`) | Next: **Web Animation API** (`web-animation-api`) →
