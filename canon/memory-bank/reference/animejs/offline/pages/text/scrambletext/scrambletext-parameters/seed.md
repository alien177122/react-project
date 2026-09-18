---
{
  "order": 249,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/seed",
  "slug": "text/scrambletext/scrambletext-parameters/seed",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed",
  "title": "seed",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "seed"
  ],
  "prev": {
    "title": "reversed",
    "slug": "text/scrambletext/scrambletext-parameters/reversed"
  },
  "next": {
    "title": "scrambleText callbacks",
    "slug": "text/scrambletext/scrambletext-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# seed

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed)
> Breadcrumb: Text → scrambleText → scrambleText parameters → seed

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            seed                                              
        

          
        Seed for the random number generator. Any non-zero value produces a reproducible scramble sequence. The same characters appear in the same order on every replay `0` uses an unseeded generator, producing a different sequence each time.

## Accepts

`Number`

## Default

`0` (unseeded)

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 42, 99];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ seed: values[i], revealRate: 2, settleRate: 2 }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Set a seed value for the random number generator.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>42</button>
    <button>99</button>
  </fieldset>
</div>
```

---

← Prev: **reversed** (`text/scrambletext/scrambletext-parameters/reversed`) | Next: **scrambleText callbacks** (`text/scrambletext/scrambletext-callbacks`) →
