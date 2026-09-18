---
{
  "order": 285,
  "section": "timeline",
  "path": "timeline-callbacks/onupdate",
  "slug": "timeline/timeline-callbacks/onupdate",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onupdate",
  "title": "onUpdate",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onUpdate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onBeforeUpdate",
    "slug": "timeline/timeline-callbacks/onbeforeupdate"
  },
  "next": {
    "title": "onRender",
    "slug": "timeline/timeline-callbacks/onrender"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onUpdate

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onupdate](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate)
> Breadcrumb: Timeline → Timeline callbacks → onUpdate

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onUpdate                                              
        

          
        Executes a function on every frames of a running timeline at the specified `frameRate`.

## Accepts

A `Function` whose first argument is the timeline itself

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
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onUpdate: self => $value.textContent = ++updates
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '+=250')
.add('.square', { x: '15rem' }, '+=250');
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onBeforeUpdate** (`timeline/timeline-callbacks/onbeforeupdate`) | Next: **onRender** (`timeline/timeline-callbacks/onrender`) →
