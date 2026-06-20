---
{
  "order": 16,
  "section": "animation",
  "path": "animatable-properties/css-variables",
  "slug": "animation/animatable-properties/css-variables",
  "url": "https://animejs.com/documentation/animation/animatable-properties/css-variables",
  "title": "CSS Variables",
  "breadcrumb": [
    "Animation",
    "Animatable properties"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "CSS transforms",
    "slug": "animation/animatable-properties/css-transforms"
  },
  "next": {
    "title": "JavaScript Object properties",
    "slug": "animation/animatable-properties/javascript-object-properties"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# CSS Variables

> Source: [https://animejs.com/documentation/animation/animatable-properties/css-variables](https://animejs.com/documentation/animation/animatable-properties/css-variables)
> Breadcrumb: Animation → Animatable properties

Animation

                          
              
                Animatable properties              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            CSS Variables                                    JS          
        

          
        CSS variables with numerical or color values can be animated by directly passing the variable name as a string to the animation parameters.

This approach also enables animation of properties defined on pseudo-elements like `::after` and `::before`, which are otherwise inaccessible via JavaScript.

In order to animate CSS variables properties with the WAAPI powered `waapi.animate()` method, you need to use  `CSS.registerProperty(propertyDefinition)`, otherwise it falls back to no animations.

## Code example (js)

```js
import { animate, utils } from 'animejs';

// Assign the CSS variables to the properties of the animated elements
utils.set('.square', {
  '--radius': '4px',
  '--x': '0rem',
  '--pseudo-el-after-scale': '1', // applied to the pseudo element "::after"
  // Using a function prevents the variables from being converted
  borderRadius: () => 'var(--radius)',
  translateX: () => 'var(--x)',
});

// Animate the values of the CSS variables
animate('.square', {
  '--radius': '20px',
  '--x': '16.5rem',
  '--pseudo-el-after-scale': '1.55' // Animates the ":after" pseudo element of the element
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
```

## Code example (css)

```css
.demo .css-variables.square:after {
  position: absolute;
  opacity: .5;
  top: 0;
  left: 0;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: inherit;
  transform: scale(var(--pseudo-el-after-scale));
}
```

---

← Prev: **CSS transforms** (`animation/animatable-properties/css-transforms`) | Next: **JavaScript Object properties** (`animation/animatable-properties/javascript-object-properties`) →
