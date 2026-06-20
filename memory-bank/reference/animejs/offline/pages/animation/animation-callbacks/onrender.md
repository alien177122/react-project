---
{
  "order": 26,
  "section": "animation",
  "path": "animation-callbacks/onrender",
  "slug": "animation/animation-callbacks/onrender",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onrender",
  "title": "onRender",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onUpdate",
    "slug": "animation/animation-callbacks/onupdate"
  },
  "next": {
    "title": "onLoop",
    "slug": "animation/animation-callbacks/onloop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onRender

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onrender](https://animejs.com/documentation/animation/animation-callbacks/onrender)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onRender                                    JS          
        

          
        Executes a function every time an animation renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onRender = self => console.log(self.id);
```

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $rendersLog ] = utils.$('.value');

let renders = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onRender: self => $rendersLog.textContent = ++renders
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onUpdate** (`animation/animation-callbacks/onupdate`) | Next: **onLoop** (`animation/animation-callbacks/onloop`) →
