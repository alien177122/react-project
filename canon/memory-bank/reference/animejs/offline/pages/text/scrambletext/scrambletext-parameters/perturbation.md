---
{
  "order": 245,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/perturbation",
  "slug": "text/scrambletext/scrambletext-parameters/perturbation",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation",
  "title": "perturbation",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "perturbation"
  ],
  "prev": {
    "title": "duration",
    "slug": "text/scrambletext/scrambletext-parameters/duration"
  },
  "next": {
    "title": "from",
    "slug": "text/scrambletext/scrambletext-parameters/from"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# perturbation

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation)
> Breadcrumb: Text → scrambleText → scrambleText parameters → perturbation

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            perturbation                                              
        

          
        Randomizes each character's reveal timing. At `0`, characters reveal at evenly spaced intervals. Increasing the value adds a random offset to each character's start and end times, scaled relative to the settle window. At `1`, offsets can equal the full settle duration, causing characters to overlap and settle out of order.

## Accepts

`Number` between `0` and `1`

## Default

`0`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 0.5, 1];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ perturbation: values[i], cursor: '_________' }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Add random timing offsets to each character for a more organic and less uniform reveal effect.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>0.5</button>
    <button>1</button>
  </fieldset>
</div>
```

---

← Prev: **duration** (`text/scrambletext/scrambletext-parameters/duration`) | Next: **from** (`text/scrambletext/scrambletext-parameters/from`) →
