---
{
  "order": 62,
  "section": "animation",
  "path": "targets/array-of-targets",
  "slug": "animation/targets/array-of-targets",
  "url": "https://animejs.com/documentation/animation/targets/array-of-targets",
  "title": "Array of targets",
  "breadcrumb": [
    "Animation",
    "Targets",
    "Array of targets"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "JavaScript Objects",
    "slug": "animation/targets/javascript-objects"
  },
  "next": {
    "title": "Animatable properties",
    "slug": "animation/animatable-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Array of targets

> Source: [https://animejs.com/documentation/animation/targets/array-of-targets](https://animejs.com/documentation/animation/targets/array-of-targets)
> Breadcrumb: Animation → Targets → Array of targets

Animation

                          
              
                Targets              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Array of targets                                              
        

          
        Targets multiple valid Targets simultaneously by grouping them inside an `Array`.

Any types of targets can be grouped together

## Accepts

An `Array` of Targets

## Related

- [Targets](https://animejs.com/documentation/animation/targets)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate([vector2D, '.square'], {
  x: '17rem',
  modifier: utils.roundPad(2).padStart(5, '0'),
  onRender: () => $log.textContent = JSON.stringify(vector2D),
});
```

## Code example (html)

```html
<pre class="row large centered">
  <code>{"x":"0"}</code>
</pre>
<div class="row medium">
  <div class="square"></div>
</div>
```

---

← Prev: **JavaScript Objects** (`animation/targets/javascript-objects`) | Next: **Animatable properties** (`animation/animatable-properties`) →
