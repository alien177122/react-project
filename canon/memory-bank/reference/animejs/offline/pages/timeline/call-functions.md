---
{
  "order": 274,
  "section": "timeline",
  "path": "call-functions",
  "slug": "timeline/call-functions",
  "url": "https://animejs.com/documentation/timeline/call-functions",
  "title": "Call functions",
  "breadcrumb": [
    "Timeline",
    "Call functions"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Sync timelines",
    "slug": "timeline/sync-timelines"
  },
  "next": {
    "title": "Time position",
    "slug": "timeline/time-position"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Call functions

> Source: [https://animejs.com/documentation/timeline/call-functions](https://animejs.com/documentation/timeline/call-functions)
> Breadcrumb: Timeline → Call functions

Timeline

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Call functions                                              
        

          
        Functions are added to a timeline with the `call()` method.

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

## Related

- [call()](https://animejs.com/documentation/timeline/timeline-methods/call)

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

← Prev: **Sync timelines** (`timeline/sync-timelines`) | Next: **Time position** (`timeline/time-position`) →
