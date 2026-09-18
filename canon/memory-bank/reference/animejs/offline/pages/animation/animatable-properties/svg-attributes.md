---
{
  "order": 19,
  "section": "animation",
  "path": "animatable-properties/svg-attributes",
  "slug": "animation/animatable-properties/svg-attributes",
  "url": "https://animejs.com/documentation/animation/animatable-properties/svg-attributes",
  "title": "SVG Attributes",
  "breadcrumb": [
    "Animation",
    "Animatable properties"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "HTML Attributes",
    "slug": "animation/animatable-properties/html-attributes"
  },
  "next": {
    "title": "Tween value types",
    "slug": "animation/tween-value-types"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# SVG Attributes

> Source: [https://animejs.com/documentation/animation/animatable-properties/svg-attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes)
> Breadcrumb: Animation → Animatable properties

Animation

                          
              
                Animatable properties              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            SVG Attributes                                    JS          
        

          
        Numerical and color SVG attributes can be animated by passing them directly to the animation parameters.

For more convenient SVG animations, check out the built-in SVG utility methods.

## Related

- [SVG utility methods](https://animejs.com/documentation/svg)

## Code example (js)

```js
import { animate } from 'animejs';

animate(['feTurbulence', 'feDisplacementMap'], {
  baseFrequency: .05,
  scale: 15,
  alternate: true,
  loop: true
});

animate('polygon', {
  points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
  alternate: true,
  loop: true
});
```

## Code example (html)

```html
<div class="large centered row">
<svg width="128" height="128" viewBox="0 0 128 128">
  <filter id="displacementFilter">
    <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <polygon points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"  fill="currentColor"/>
</svg>
</div>
```

## Code example (css)

```css
#animation-animatable-properties-svg-attributes .docs-demo-template {
  display: none;
}

#animation-animatable-properties-svg-attributes .demo polygon {
  filter: url(#displacementFilter)
}
```

---

← Prev: **HTML Attributes** (`animation/animatable-properties/html-attributes`) | Next: **Tween value types** (`animation/tween-value-types`) →
