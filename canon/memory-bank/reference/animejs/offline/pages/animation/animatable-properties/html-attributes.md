---
{
  "order": 17,
  "section": "animation",
  "path": "animatable-properties/html-attributes",
  "slug": "animation/animatable-properties/html-attributes",
  "url": "https://animejs.com/documentation/animation/animatable-properties/html-attributes",
  "title": "HTML Attributes",
  "breadcrumb": [
    "Animation",
    "Animatable properties"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "JavaScript Object properties",
    "slug": "animation/animatable-properties/javascript-object-properties"
  },
  "next": {
    "title": "SVG Attributes",
    "slug": "animation/animatable-properties/svg-attributes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# HTML Attributes

> Source: [https://animejs.com/documentation/animation/animatable-properties/html-attributes](https://animejs.com/documentation/animation/animatable-properties/html-attributes)
> Breadcrumb: Animation → Animatable properties

Animation

                          
              
                Animatable properties              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            HTML Attributes                                    JS          
        

          
        Numerical and color HTML attributes can be passed directly to the animation parameters.

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('input', {
  value: 1000, // animate the input "value" attribute
  alternate: true,
  loop: true,
  modifier: utils.round(0),
});
```

## Code example (html)

```html
<pre class="row large centered">
  <input type="range" value="0" min="0" max="1000" />
  <input type="text" value="0" size="5"/>
</pre>
```

---

← Prev: **JavaScript Object properties** (`animation/animatable-properties/javascript-object-properties`) | Next: **SVG Attributes** (`animation/animatable-properties/svg-attributes`) →
