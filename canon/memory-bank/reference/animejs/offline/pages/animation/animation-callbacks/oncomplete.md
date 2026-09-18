---
{
  "order": 23,
  "section": "animation",
  "path": "animation-callbacks/oncomplete",
  "slug": "animation/animation-callbacks/oncomplete",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/oncomplete",
  "title": "onComplete",
  "breadcrumb": [
    "Animation",
    "Animation callbacks",
    "onComplete"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onBegin",
    "slug": "animation/animation-callbacks/onbegin"
  },
  "next": {
    "title": "onBeforeUpdate",
    "slug": "animation/animation-callbacks/onbeforeupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onComplete

> Source: [https://animejs.com/documentation/animation/animation-callbacks/oncomplete](https://animejs.com/documentation/animation/animation-callbacks/oncomplete)
> Breadcrumb: Animation → Animation callbacks → onComplete

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onComplete                                              
        

          
        Executes a function when all the iterations (loops) of an animation have finished playing.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## Related

- [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
  loop: 2,
  alternate: true,
  onComplete: self => $value.textContent = self.completed
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

← Prev: **onBegin** (`animation/animation-callbacks/onbegin`) | Next: **onBeforeUpdate** (`animation/animation-callbacks/onbeforeupdate`) →
