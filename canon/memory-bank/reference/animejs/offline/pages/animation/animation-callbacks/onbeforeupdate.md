---
{
  "order": 21,
  "section": "animation",
  "path": "animation-callbacks/onbeforeupdate",
  "slug": "animation/animation-callbacks/onbeforeupdate",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate",
  "title": "onBeforeUpdate",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onComplete",
    "slug": "animation/animation-callbacks/oncomplete"
  },
  "next": {
    "title": "onUpdate",
    "slug": "animation/animation-callbacks/onupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onBeforeUpdate

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onBeforeUpdate                                    JS          
        

          
        Executes a function before updating the tween values, on every frames of a running animation at the specified `frameRate`.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBeforeUpdate = self => console.log(self.id);
```

## Related

- [frameRate](https://animejs.com/documentation/animation/animation-playback-settings/framerate)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let mult = 1;
let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  modifier: v => mult * v,
  loop: true,
  alternate: true,
  onBeforeUpdate: self => {
    $value.textContent = ++updates;
    // Update the mult value just before updating the tweens
    mult = 1 - self.iterationProgress;
  }
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onComplete** (`animation/animation-callbacks/oncomplete`) | Next: **onUpdate** (`animation/animation-callbacks/onupdate`) →
