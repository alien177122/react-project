---
{
  "order": 236,
  "section": "text",
  "path": "scrambletext/scrambletext-callbacks/onchange",
  "slug": "text/scrambletext/scrambletext-callbacks/onchange",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange",
  "title": "onChange",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText callbacks",
    "onChange"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "scrambleText callbacks",
    "slug": "text/scrambletext/scrambletext-callbacks"
  },
  "next": {
    "title": "Utilities",
    "slug": "utilities"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onChange

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange)
> Breadcrumb: Text → scrambleText → scrambleText callbacks → onChange

Text

                          
              
                scrambleText              
                          
              
                Callbacks              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            onChange                                              
        

          
        Executes a function every time the scrambled text characters are updated.

## Accepts

A `Function` with two arguments: the current scrambled `String` and the animation progress as a `Number` between `0` and `1`

## Default

`noop`

## Code example (js)

```js
import { animate, scrambleText, utils } from 'animejs';

const [ $p ] = utils.$('p');
const [ $btn ] = utils.$('button');

const audioCtx = new AudioContext();
let soundEnabled = false;

const tickSound = () => {
  if (!soundEnabled) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(4000 + Math.random() * 400, t);
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(0.035, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.003);
  o.connect(g).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.003);
};

$btn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) audioCtx.resume();
  $btn.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
});

animate($p, {
  innerHTML: scrambleText({ onChange: tickSound }),
  loop: true,
  loopDelay: 1500,
});
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Use the onChange callback to trigger a tick sound on every character update.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Sound OFF</button>
  </fieldset>
</div>
```

---

← Prev: **scrambleText callbacks** (`text/scrambletext/scrambletext-callbacks`) | Next: **Utilities** (`utilities`) →
