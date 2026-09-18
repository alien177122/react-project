---
{
  "order": 68,
  "section": "animation",
  "path": "tween-parameters/delay",
  "slug": "animation/tween-parameters/delay",
  "url": "https://animejs.com/documentation/animation/tween-parameters/delay",
  "title": "delay",
  "breadcrumb": [
    "Animation",
    "Tween parameters",
    "delay"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "from",
    "slug": "animation/tween-parameters/from"
  },
  "next": {
    "title": "duration",
    "slug": "animation/tween-parameters/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/animation/tween-parameters/delay](https://animejs.com/documentation/animation/tween-parameters/delay)
> Breadcrumb: Animation → Tween parameters → delay

Animation

                          
              
                Tween parameters              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            delay                                              
        

          
        Defines the delay in milliseconds at the beginning of all animated properties, or locally to a specific property.

## Accepts

- A `Number` equal to or greater than `0`

- A Function based value that returns a `Number` equal to or greater than `0`

## Default

The animation delay value (default `0`).

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    delay: 1000, // Local delay applied only to rotate property
  },
  delay: 500,  // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

← Prev: **from** (`animation/tween-parameters/from`) | Next: **duration** (`animation/tween-parameters/duration`) →
