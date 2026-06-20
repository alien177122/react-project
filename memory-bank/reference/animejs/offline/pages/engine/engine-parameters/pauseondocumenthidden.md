---
{
  "order": 143,
  "section": "engine",
  "path": "engine-parameters/pauseondocumenthidden",
  "slug": "engine/engine-parameters/pauseondocumenthidden",
  "url": "https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden",
  "title": "pauseOnDocumentHidden",
  "breadcrumb": [
    "Engine",
    "Engine parameters",
    "pauseOnDocumentHidden"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "precision",
    "slug": "engine/engine-parameters/precision"
  },
  "next": {
    "title": "Engine methods",
    "slug": "engine/engine-methods"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# pauseOnDocumentHidden

> Source: [https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden](https://animejs.com/documentation/engine/engine-parameters/pauseondocumenthidden)
> Breadcrumb: Engine → Engine parameters → pauseOnDocumentHidden

Engine

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            pauseOnDocumentHidden                                              
        

          
        Controls whether the engine pauses animations when the browser tab is hidden.

When `true`, animations pause automatically when the tab loses focus. When `false`, animations will adjust their `currentTime` to catch up how long they have been idle in the background, making it looks like they never paused.

```js
engine.pauseOnDocumentHidden = true;
```

## Accepts

`Boolean`

## Default

`true`

## Code example (js)

```js
import { engine, utils, createTimer } from 'animejs';

const [ $globalTime ] = utils.$('.global-time');
const [ $engineTime ] = utils.$('.engine-time');
const [ $toggle ] = utils.$('.toggle');

const startTime = Date.now();

const globalTimer = setInterval(() => {
  $globalTime.innerHTML = Date.now() - startTime;
}, 16);

const engineTimer = createTimer({
  onUpdate: self => $engineTime.innerHTML = self.currentTime
});

const toggleSetting = () => {
  const isPauseWhenHidden = engine.pauseOnDocumentHidden;
  if (isPauseWhenHidden) {
    engine.pauseOnDocumentHidden = false;
    $toggle.innerHTML = '○ Disabled (Switch tab to see the effect)';
  } else {
    engine.pauseOnDocumentHidden = true;
    $toggle.innerHTML = '● Enabled (Switch tab to see the effect)';
  }
}

// Switch tab to see the effect

$toggle.addEventListener('click', toggleSetting);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">global time</span>
      <span class="global-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">engine time</span>
      <span class="engine-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle">● Enabled (Switch tab to see the effect)</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#engine-engine-parameters-pauseondocumenthidden .button { max-width: 100% }
```

---

← Prev: **precision** (`engine/engine-parameters/precision`) | Next: **Engine methods** (`engine/engine-methods`) →
