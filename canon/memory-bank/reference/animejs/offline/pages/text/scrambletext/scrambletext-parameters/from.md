---
{
  "order": 243,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/from",
  "slug": "text/scrambletext/scrambletext-parameters/from",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from",
  "title": "from",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "from"
  ],
  "prev": {
    "title": "perturbation",
    "slug": "text/scrambletext/scrambletext-parameters/perturbation"
  },
  "next": {
    "title": "reversed",
    "slug": "text/scrambletext/scrambletext-parameters/reversed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# from

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from)
> Breadcrumb: Text → scrambleText → scrambleText parameters → from

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            from                                              
        

          
        Defines where the reveal wave starts from. When set to `'auto'`, the direction is resolved based on text length: `'left'` when text grows and `'right'` when it shrinks.

## Accepts

| Value | Description |
| --- | --- |
| `'auto'` | Automatically resolves to `'left'` or `'right'` based on text length change |
| `'left'` | Reveals from the left |
| `'center'` | Reveals from the center |
| `'right'` | Reveals from the right |
| `'random'` | Reveals characters in random order |
| `Number` | Reveals from a specific character index |

## Default

`'auto'`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const froms = ['right', 'center', 'random'];

function play(from) {
  animate($p, {
    innerHTML: scrambleText({ from }),
  });
}

play(froms[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(froms[i])));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Control where the reveal wave starts from, whether left, center, right, or a specific character index.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>right</button>
    <button>center</button>
    <button>random</button>
  </fieldset>
</div>
```

---

← Prev: **perturbation** (`text/scrambletext/scrambletext-parameters/perturbation`) | Next: **reversed** (`text/scrambletext/scrambletext-parameters/reversed`) →
