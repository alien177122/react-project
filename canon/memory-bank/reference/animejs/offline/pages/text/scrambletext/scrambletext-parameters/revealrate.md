---
{
  "order": 247,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/revealrate",
  "slug": "text/scrambletext/scrambletext-parameters/revealrate",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate",
  "title": "revealRate",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "revealRate"
  ],
  "prev": {
    "title": "cursor",
    "slug": "text/scrambletext/scrambletext-parameters/cursor"
  },
  "next": {
    "title": "revealDelay",
    "slug": "text/scrambletext/scrambletext-parameters/revealdelay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revealRate

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate)
> Breadcrumb: Text → scrambleText → scrambleText parameters → revealRate

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            revealRate                                              
        

          
        Characters per second entering the active zone. Higher values make the reveal wave move faster. Together with `settleDuration`, this determines the total duration when no explicit `duration` is set.

## Accepts

`Number`

## Default

`60`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [20, 60, 120];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Higher values make the reveal wave move faster.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>20</button>
    <button>60</button>
    <button>120</button>
  </fieldset>
</div>
```

---

← Prev: **cursor** (`text/scrambletext/scrambletext-parameters/cursor`) | Next: **revealDelay** (`text/scrambletext/scrambletext-parameters/revealdelay`) →
