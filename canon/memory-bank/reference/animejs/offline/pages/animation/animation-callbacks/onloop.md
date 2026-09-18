---
{
  "order": 24,
  "section": "animation",
  "path": "animation-callbacks/onloop",
  "slug": "animation/animation-callbacks/onloop",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onloop",
  "title": "onLoop",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onRender",
    "slug": "animation/animation-callbacks/onrender"
  },
  "next": {
    "title": "onPause",
    "slug": "animation/animation-callbacks/onpause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLoop

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onloop](https://animejs.com/documentation/animation/animation-callbacks/onloop)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLoop                                    JS          
        

          
        Executes a function every time an animation iteration (loop) completes.

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## Related

- [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onLoop: self => $value.textContent = ++loops
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onRender** (`animation/animation-callbacks/onrender`) | Next: **onPause** (`animation/animation-callbacks/onpause`) →
