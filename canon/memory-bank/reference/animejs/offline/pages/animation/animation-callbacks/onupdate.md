---
{
  "order": 27,
  "section": "animation",
  "path": "animation-callbacks/onupdate",
  "slug": "animation/animation-callbacks/onupdate",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onupdate",
  "title": "onUpdate",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onBeforeUpdate",
    "slug": "animation/animation-callbacks/onbeforeupdate"
  },
  "next": {
    "title": "onRender",
    "slug": "animation/animation-callbacks/onrender"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onUpdate

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onupdate](https://animejs.com/documentation/animation/animation-callbacks/onupdate)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onUpdate                                    JS          
        

          
        Executes a function on every frames of a running animation at the specified `frameRate`.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onUpdate = self => console.log(self.id);
```

## Related

- [frameRate](https://animejs.com/documentation/animation/animation-playback-settings/framerate)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onUpdate: self => $value.textContent = ++updates
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

← Prev: **onBeforeUpdate** (`animation/animation-callbacks/onbeforeupdate`) | Next: **onRender** (`animation/animation-callbacks/onrender`) →
