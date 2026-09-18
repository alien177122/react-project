---
{
  "order": 282,
  "section": "timeline",
  "path": "timeline-callbacks/onloop",
  "slug": "timeline/timeline-callbacks/onloop",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onloop",
  "title": "onLoop",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onLoop"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onRender",
    "slug": "timeline/timeline-callbacks/onrender"
  },
  "next": {
    "title": "onPause",
    "slug": "timeline/timeline-callbacks/onpause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLoop

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onloop](https://animejs.com/documentation/timeline/timeline-callbacks/onloop)
> Breadcrumb: Timeline → Timeline callbacks → onLoop

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLoop                                              
        

          
        Executes a function every time a timeline iteration completes.

## Accepts

A `Function` whose first argument is the timeline itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 500,
  loop: true,
  onLoop: self => $value.textContent = ++loops
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
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

← Prev: **onRender** (`timeline/timeline-callbacks/onrender`) | Next: **onPause** (`timeline/timeline-callbacks/onpause`) →
