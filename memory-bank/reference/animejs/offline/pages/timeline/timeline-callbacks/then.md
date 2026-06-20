---
{
  "order": 286,
  "section": "timeline",
  "path": "timeline-callbacks/then",
  "slug": "timeline/timeline-callbacks/then",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/then",
  "title": "then()",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "then()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onPause",
    "slug": "timeline/timeline-callbacks/onpause"
  },
  "next": {
    "title": "Timeline methods",
    "slug": "timeline/timeline-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# then()

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/then](https://animejs.com/documentation/timeline/timeline-callbacks/then)
> Breadcrumb: Timeline → Timeline callbacks → then()

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            then()                                              
        

          
        Returns a `Promise` that resolves and execute a callback when the timeline completes.

The `then()` method can be directly inlined like this:

```js
createTimeline(parameters).add(targets, parameters).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForTimelineToComplete() {
  return createTimeline()
  .add('.square', { x: 100 })
  .add('.square', { y: 100 });
}

const asyncTimeline = await waitForTimelineToComplete();
```

## Parameters

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the timeline itself |

## Returns

`Promise`

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });

tl.then(() => $value.textContent = 'fulfilled');
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
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

---

← Prev: **onPause** (`timeline/timeline-callbacks/onpause`) | Next: **Timeline methods** (`timeline/timeline-methods`) →
