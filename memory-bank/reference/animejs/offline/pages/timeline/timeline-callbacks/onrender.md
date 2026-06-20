---
{
  "order": 284,
  "section": "timeline",
  "path": "timeline-callbacks/onrender",
  "slug": "timeline/timeline-callbacks/onrender",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onrender",
  "title": "onRender",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onRender"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onUpdate",
    "slug": "timeline/timeline-callbacks/onupdate"
  },
  "next": {
    "title": "onLoop",
    "slug": "timeline/timeline-callbacks/onloop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onRender

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onrender](https://animejs.com/documentation/timeline/timeline-callbacks/onrender)
> Breadcrumb: Timeline → Timeline callbacks → onRender

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onRender                                              
        

          
        Executes a function every time a timeline renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames, or if neither of its children are rendering.

## Accepts

A `Function` whose first argument is the timeline itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onRender = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let renders = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onRender: self => $value.textContent = ++renders
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
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onUpdate** (`timeline/timeline-callbacks/onupdate`) | Next: **onLoop** (`timeline/timeline-callbacks/onloop`) →
