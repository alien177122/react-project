---
{
  "order": 251,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/settlerate",
  "slug": "text/scrambletext/scrambletext-parameters/settlerate",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate",
  "title": "settleRate",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "settleRate"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "revealDelay",
    "slug": "text/scrambletext/scrambletext-parameters/revealdelay"
  },
  "next": {
    "title": "settleDuration",
    "slug": "text/scrambletext/scrambletext-parameters/settleduration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# settleRate

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate)
> Breadcrumb: Text → scrambleText → scrambleText parameters → settleRate

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            settleRate                                              
        

          
        How many times per second scramble characters cycle in the active zone. Higher values create faster flickering.

## Accepts

`Number`

## Default

`30`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [5, 30, 60];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Control how many times per second characters cycle through random values during the scramble phase.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>5</button>
    <button>30</button>
    <button>60</button>
  </fieldset>
</div>
```

---

← Prev: **revealDelay** (`text/scrambletext/scrambletext-parameters/revealdelay`) | Next: **settleDuration** (`text/scrambletext/scrambletext-parameters/settleduration`) →
