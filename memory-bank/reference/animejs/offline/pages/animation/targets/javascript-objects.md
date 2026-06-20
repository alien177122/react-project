---
{
  "order": 65,
  "section": "animation",
  "path": "targets/javascript-objects",
  "slug": "animation/targets/javascript-objects",
  "url": "https://animejs.com/documentation/animation/targets/javascript-objects",
  "title": "JavaScript Objects",
  "breadcrumb": [
    "Animation",
    "Targets"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "DOM Elements",
    "slug": "animation/targets/dom-elements"
  },
  "next": {
    "title": "Array of targets",
    "slug": "animation/targets/array-of-targets"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# JavaScript Objects

> Source: [https://animejs.com/documentation/animation/targets/javascript-objects](https://animejs.com/documentation/animation/targets/javascript-objects)
> Breadcrumb: Animation → Targets

Animation

                          
              
                Targets              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            JavaScript Objects                                    JS          
        

          
        Targets one or multiple JavaScript `Object`.

## Accepts

- `Object`

- Instance of `Class`

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate(vector2D, {
  x: 100,
  y: 150,
  modifier: utils.round(0),
  onUpdate: () => $log.textContent = JSON.stringify(vector2D),
});
```

## Code example (html)

```html
<pre class="row large centered">
  <code>{"x":0,"y":0}</code>
</pre>
```

---

← Prev: **DOM Elements** (`animation/targets/dom-elements`) | Next: **Array of targets** (`animation/targets/array-of-targets`) →
