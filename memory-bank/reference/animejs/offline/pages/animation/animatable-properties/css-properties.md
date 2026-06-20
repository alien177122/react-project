---
{
  "order": 14,
  "section": "animation",
  "path": "animatable-properties/css-properties",
  "slug": "animation/animatable-properties/css-properties",
  "url": "https://animejs.com/documentation/animation/animatable-properties/css-properties",
  "title": "CSS Properties",
  "breadcrumb": [
    "Animation",
    "Animatable properties",
    "CSS Properties"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Animatable properties",
    "slug": "animation/animatable-properties"
  },
  "next": {
    "title": "CSS transforms",
    "slug": "animation/animatable-properties/css-transforms"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# CSS Properties

> Source: [https://animejs.com/documentation/animation/animatable-properties/css-properties](https://animejs.com/documentation/animation/animatable-properties/css-properties)
> Breadcrumb: Animation → Animatable properties → CSS Properties

Animation

                          
              
                Animatable properties              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            CSS Properties                                              
        

          
        Any CSS numerical and color properties can be animated.

Properties containing a dash in their name, like `background-color`, must be converted to camel case (`backgroundColor`), or written as a `String` (`'background-color'`).

Most CSS properties can cause layout changes or repaint leading to choppy animations. To achieve smoother animations, always prioritise opacity and CSS transforms as much as possible.

## Related

- [CSS transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  left: 'calc(7.75rem * 2)',
  borderRadius: 64,
  'background-color': '#F9F640',
  filter: 'blur(5px)',
});
```

## Code example (html)

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

← Prev: **Animatable properties** (`animation/animatable-properties`) | Next: **CSS transforms** (`animation/animatable-properties/css-transforms`) →
