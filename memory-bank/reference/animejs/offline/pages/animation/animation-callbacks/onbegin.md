---
{
  "order": 22,
  "section": "animation",
  "path": "animation-callbacks/onbegin",
  "slug": "animation/animation-callbacks/onbegin",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onbegin",
  "title": "onBegin",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Animation callbacks",
    "slug": "animation/animation-callbacks"
  },
  "next": {
    "title": "onComplete",
    "slug": "animation/animation-callbacks/oncomplete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onBegin

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onbegin](https://animejs.com/documentation/animation/animation-callbacks/onbegin)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onBegin                                    JS          
        

          
        Executes a function when an animation begins to play.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

← Prev: **Animation callbacks** (`animation/animation-callbacks`) | Next: **onComplete** (`animation/animation-callbacks/oncomplete`) →
