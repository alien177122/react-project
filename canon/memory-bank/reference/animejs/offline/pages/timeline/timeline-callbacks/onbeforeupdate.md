---
{
  "order": 279,
  "section": "timeline",
  "path": "timeline-callbacks/onbeforeupdate",
  "slug": "timeline/timeline-callbacks/onbeforeupdate",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate",
  "title": "onBeforeUpdate",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onBeforeUpdate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onComplete",
    "slug": "timeline/timeline-callbacks/oncomplete"
  },
  "next": {
    "title": "onUpdate",
    "slug": "timeline/timeline-callbacks/onupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onBeforeUpdate

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate](https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate)
> Breadcrumb: Timeline → Timeline callbacks → onBeforeUpdate

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onBeforeUpdate                                              
        

          
        Executes a function before updating the child animations values, on every frames of a running timeline at the specified `frameRate`.

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
  onBeforeUpdate: self => $value.textContent = ++updates
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

← Prev: **onComplete** (`timeline/timeline-callbacks/oncomplete`) | Next: **onUpdate** (`timeline/timeline-callbacks/onupdate`) →
