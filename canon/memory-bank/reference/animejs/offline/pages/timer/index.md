---
{
  "order": 320,
  "section": "timer",
  "path": "(index)",
  "slug": "timer",
  "url": "https://animejs.com/documentation/timer",
  "title": "Timer",
  "breadcrumb": [
    "Timer"
  ],
  "prev": {
    "title": "Using with React",
    "slug": "getting-started/using-with-react"
  },
  "next": {
    "title": "Timer playback settings",
    "slug": "timer/timer-playback-settings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Timer

> Source: [https://animejs.com/documentation/timer](https://animejs.com/documentation/timer)
> Breadcrumb: Timer

## 
          
            Timer                                              
        

          
        

## Schedules and controls timed callbacks that can be used as an alternative to `setTimeout()` or `setInterval()`, keeping animations and callbacks synchronized.

Timers are created using the `createTimer()` method imported from the main `'animejs'` module:

```js
import { createTimer } from 'animejs';

const timer = createTimer(parameters);
```

Or imported as a standalone module from the `'animejs/timer'` subpath:

```js
import { createTimer } from 'animejs/timer';
```

## Parameters

| Name | Accepts |
| --- | --- |
| parameters (opt) | An `Object` of Timer playback settings and Timer callbacks |

## Returns

`Timer`

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { createTimer } from 'animejs';

const [ $time, $count ] = utils.$('.value');

createTimer({
  duration: 1000,
  loop: true,
  frameRate: 30,
  onUpdate: self => $time.innerHTML = self.currentTime,
  onLoop: self => $count.innerHTML = self._currentIteration
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="value lcd">0</span>
    </pre>
  </div>
  <div class="half col">
    <pre class="large log row">
      <span class="label">callback fired</span>
      <span class="value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **Using with React** (`getting-started/using-with-react`) | Next: **Timer playback settings** (`timer/timer-playback-settings`) →
