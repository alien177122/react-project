---
{
  "order": 18,
  "section": "animation",
  "path": "animatable-properties/javascript-object-properties",
  "slug": "animation/animatable-properties/javascript-object-properties",
  "url": "https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties",
  "title": "JavaScript Object properties",
  "breadcrumb": [
    "Animation",
    "Animatable properties"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "CSS Variables",
    "slug": "animation/animatable-properties/css-variables"
  },
  "next": {
    "title": "HTML Attributes",
    "slug": "animation/animatable-properties/html-attributes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# JavaScript Object properties

> Source: [https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties](https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties)
> Breadcrumb: Animation → Animatable properties

Animation

                          
              
                Animatable properties              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            JavaScript Object properties                                    JS          
        

          
        Numerical and color JavaScript `Object` properties can be passed directly to the animation parameters.

## Code example (js)

```js
import { animate, utils } from 'animejs';

const myObject = {
  number: 1337,
  unit: '42%',
}

const [ $log ] = utils.$('code');

animate(myObject, {
  number: 50,
  unit: '100%',
  modifier: utils.round(0),
  onRender: function() {
    $log.innerHTML = JSON.stringify(myObject);
  }
});
```

## Code example (html)

```html
<pre class="row large centered">
  <code>{"number":1337,"unit":"42%"}</code>
</pre>
```

---

← Prev: **CSS Variables** (`animation/animatable-properties/css-variables`) | Next: **HTML Attributes** (`animation/animatable-properties/html-attributes`) →
