---
{
  "order": 250,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/settleduration",
  "slug": "text/scrambletext/scrambletext-parameters/settleduration",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration",
  "title": "settleDuration",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "settleDuration"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "settleRate",
    "slug": "text/scrambletext/scrambletext-parameters/settlerate"
  },
  "next": {
    "title": "delay",
    "slug": "text/scrambletext/scrambletext-parameters/delay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# settleDuration

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration)
> Breadcrumb: Text → scrambleText → scrambleText parameters → settleDuration

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            settleDuration                                              
        

          
        Time in ms each character spends scrambling before settling into its final glyph.

## Accepts

`Number`

## Default

`300`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [100, 300, 1000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleDuration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Define how long each character spends scrambling before settling into its final settled value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>100</button>
    <button>300</button>
    <button>1000</button>
  </fieldset>
</div>
```

---

← Prev: **settleRate** (`text/scrambletext/scrambletext-parameters/settlerate`) | Next: **delay** (`text/scrambletext/scrambletext-parameters/delay`) →
