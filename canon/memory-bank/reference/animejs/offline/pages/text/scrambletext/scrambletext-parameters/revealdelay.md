---
{
  "order": 246,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/revealdelay",
  "slug": "text/scrambletext/scrambletext-parameters/revealdelay",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay",
  "title": "revealDelay",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "revealDelay"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "revealRate",
    "slug": "text/scrambletext/scrambletext-parameters/revealrate"
  },
  "next": {
    "title": "settleRate",
    "slug": "text/scrambletext/scrambletext-parameters/settlerate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revealDelay

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay)
> Breadcrumb: Text → scrambleText → scrambleText parameters → revealDelay

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            revealDelay                                              
        

          
        Delay in ms before the reveal wave starts within the scramble animation.

## Accepts

- `Number`

- `Function(target, index, targets)` returning a `Number`

## Default

`0`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 500, 2000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealDelay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the reveal wave starts within the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>2000</button>
  </fieldset>
</div>
```

---

← Prev: **revealRate** (`text/scrambletext/scrambletext-parameters/revealrate`) | Next: **settleRate** (`text/scrambletext/scrambletext-parameters/settlerate`) →
