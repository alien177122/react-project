---
{
  "order": 239,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/cursor",
  "slug": "text/scrambletext/scrambletext-parameters/cursor",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor",
  "title": "cursor",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "cursor"
  ],
  "prev": {
    "title": "ease",
    "slug": "text/scrambletext/scrambletext-parameters/ease"
  },
  "next": {
    "title": "revealRate",
    "slug": "text/scrambletext/scrambletext-parameters/revealrate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cursor

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor)
> Breadcrumb: Text → scrambleText → scrambleText parameters → cursor

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            cursor                                              
        

          
        Characters displayed at the leading edge of the reveal wave.

## Accepts

| Value | Description |
| --- | --- |
| `true` | Uses `'_'` as cursor |
| `Number` | A character code (e.g. `124` for `'\|'`) |
| `String` | Uses the string directly as cursor characters |

## Default

`''` (no cursor)

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const cursors = ['_____', '░▒▓█', '😀'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ cursor: cursors[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Display a cursor character at the leading edge of the reveal wave as it moves through each character.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>_____</button>
    <button>░▒▓█</button>
    <button>😀</button>
  </fieldset>
</div>
```

---

← Prev: **ease** (`text/scrambletext/scrambletext-parameters/ease`) | Next: **revealRate** (`text/scrambletext/scrambletext-parameters/revealrate`) →
