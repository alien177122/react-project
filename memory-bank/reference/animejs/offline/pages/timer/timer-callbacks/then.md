---
{
  "order": 327,
  "section": "timer",
  "path": "timer-callbacks/then",
  "slug": "timer/timer-callbacks/then",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/then",
  "title": "then()",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "then()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onPause",
    "slug": "timer/timer-callbacks/onpause"
  },
  "next": {
    "title": "Timer methods",
    "slug": "timer/timer-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# then()

> Source: [https://animejs.com/documentation/timer/timer-callbacks/then](https://animejs.com/documentation/timer/timer-callbacks/then)
> Breadcrumb: Timer → Timer callbacks → then()

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            then()                                              
        

          
        Returns a `Promise` that resolves and execute a callback when the timer completes.

The `then()` method can be directly inlined like this:

```js
createTimer({duration: 500}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForTimerToComplete() {
  return createTimer({ duration: 250 })
}

const asyncTimer = await waitForTimerToComplete();
```

## Parameters

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the timer itself |

## Returns

`Promise`

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime,
})
.then(() => $status.innerHTML = 'fulfilled');
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">promise status</span>
      <span class="status value">pending</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **onPause** (`timer/timer-callbacks/onpause`) | Next: **Timer methods** (`timer/timer-methods`) →
