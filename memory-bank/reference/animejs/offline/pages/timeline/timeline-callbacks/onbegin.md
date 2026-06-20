---
{
  "order": 280,
  "section": "timeline",
  "path": "timeline-callbacks/onbegin",
  "slug": "timeline/timeline-callbacks/onbegin",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onbegin",
  "title": "onBegin",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onBegin"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timeline callbacks",
    "slug": "timeline/timeline-callbacks"
  },
  "next": {
    "title": "onComplete",
    "slug": "timeline/timeline-callbacks/oncomplete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onBegin

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onbegin](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin)
> Breadcrumb: Timeline → Timeline callbacks → onBegin

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onBegin                                              
        

          
        Executes a function when an timeline begins to play.

## Accepts

A `Function` whose first argument is the timeline itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
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
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

---

← Prev: **Timeline callbacks** (`timeline/timeline-callbacks`) | Next: **onComplete** (`timeline/timeline-callbacks/oncomplete`) →
