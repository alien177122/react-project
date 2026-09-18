---
{
  "order": 290,
  "section": "timeline",
  "path": "timeline-methods/call",
  "slug": "timeline/timeline-methods/call",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/call",
  "title": "call()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "call()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "remove()",
    "slug": "timeline/timeline-methods/remove"
  },
  "next": {
    "title": "init()",
    "slug": "timeline/timeline-methods/init"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# call()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/call](https://animejs.com/documentation/timeline/timeline-methods/call)
> Breadcrumb: Timeline → Timeline methods → call()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            call()                                              
        

          
        Calls the passed function callback at the specified time position.

```js
timeline.call(callback, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| callback | `Function` |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

---

← Prev: **remove()** (`timeline/timeline-methods/remove`) | Next: **init()** (`timeline/timeline-methods/init`) →
