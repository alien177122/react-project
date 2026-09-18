---
{
  "order": 281,
  "section": "timeline",
  "path": "timeline-callbacks/oncomplete",
  "slug": "timeline/timeline-callbacks/oncomplete",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete",
  "title": "onComplete",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onComplete"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onBegin",
    "slug": "timeline/timeline-callbacks/onbegin"
  },
  "next": {
    "title": "onBeforeUpdate",
    "slug": "timeline/timeline-callbacks/onbeforeupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onComplete

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete)
> Breadcrumb: Timeline → Timeline callbacks → onComplete

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onComplete                                              
        

          
        Executes a function when all the iterations (loops) of a timeline have finished playing.

## Accepts

A `Function` whose first argument is the timeline itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
  onComplete: self => $value.textContent = self.completed
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });
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
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

← Prev: **onBegin** (`timeline/timeline-callbacks/onbegin`) | Next: **onBeforeUpdate** (`timeline/timeline-callbacks/onbeforeupdate`) →
