---
{
  "order": 146,
  "section": "engine",
  "path": "engine-parameters/timeunit-seconds-milliseconds",
  "slug": "engine/engine-parameters/timeunit-seconds-milliseconds",
  "url": "https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds",
  "title": "timeUnit (seconds / milliseconds)",
  "breadcrumb": [
    "Engine",
    "Engine parameters",
    "timeUnit (seconds / milliseconds)"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Engine parameters",
    "slug": "engine/engine-parameters"
  },
  "next": {
    "title": "speed",
    "slug": "engine/engine-parameters/speed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# timeUnit (seconds / milliseconds)

> Source: [https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds](https://animejs.com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds)
> Breadcrumb: Engine → Engine parameters → timeUnit (seconds / milliseconds)

Engine

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            timeUnit (seconds / milliseconds)                                              
        

          
        Configures the unit of time to use for time-related values like `duration` and `delay`.

The currently defined default duration is automatically adjusted to the newly specified time unit.

```js
engine.timeUnit = 's'; // Change the time unit globally to seconds
console.log(engine.engine.defaults.duration); // -> Returns 1
```

## Accepts

- `'s'` to use seconds

- `'ms'` to use milliseconds

## Default

`'ms'`

## Code example (js)

```js
import { engine, animate, utils } from 'animejs';

const [ $timeS ] = utils.$('.time-s');
const [ $timeMs ] = utils.$('.time-ms');
const [ $ms, $s ] = utils.$('.toggle');

const secondsTimer = createTimer({
  duration: 1,
  loop: true,
  onUpdate: self => $timeS.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const millisecondsTimer = createTimer({
  duration: 1000,
  loop: true,
  onUpdate: self => $timeMs.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const toggleSetting = () => {
  const isUsingSeconds = engine.timeUnit === 's';
  engine.timeUnit = isUsingSeconds ? 'ms' : 's';
  $ms.disabled = isUsingSeconds;
  $s.disabled = !isUsingSeconds;
}

$ms.addEventListener('click', toggleSetting);
$s.addEventListener('click', toggleSetting);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1</span>
      <span class="time-s value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1000</span>
      <span class="time-ms value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle" disabled>milliseconds</button>
    <button class="button toggle">seconds</button>
  </fieldset>
</div>
```

---

← Prev: **Engine parameters** (`engine/engine-parameters`) | Next: **speed** (`engine/engine-parameters/speed`) →
