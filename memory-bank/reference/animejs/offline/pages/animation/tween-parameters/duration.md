---
{
  "order": 69,
  "section": "animation",
  "path": "tween-parameters/duration",
  "slug": "animation/tween-parameters/duration",
  "url": "https://animejs.com/documentation/animation/tween-parameters/duration",
  "title": "duration",
  "breadcrumb": [
    "Animation",
    "Tween parameters",
    "duration"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "delay",
    "slug": "animation/tween-parameters/delay"
  },
  "next": {
    "title": "ease",
    "slug": "animation/tween-parameters/ease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/animation/tween-parameters/duration](https://animejs.com/documentation/animation/tween-parameters/duration)
> Breadcrumb: Animation → Tween parameters → duration

Animation

                          
              
                Tween parameters              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            duration                                              
        

          
        Defines the duration in milliseconds of all animated properties, or of a specific property.

## Accepts

- A `Number` equal to or greater than `0`

- A Function based value that returns a `Number` equal to or greater than `0`

Duration values higher than `1e12` or equal to `Infinity` are clamped internally to `1e12` (approximately 32 years).

## Default

The animation duration value (default `1000`).

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.duration = 500;
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
    duration: 1500, // Local duration only applied to rotate property
  },
  duration: 3000,  // Global duration applied to all properties
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

← Prev: **delay** (`animation/tween-parameters/delay`) | Next: **ease** (`animation/tween-parameters/ease`) →
