---
{
  "order": 240,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/delay",
  "slug": "text/scrambletext/scrambletext-parameters/delay",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay",
  "title": "delay",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "delay"
  ],
  "prev": {
    "title": "settleDuration",
    "slug": "text/scrambletext/scrambletext-parameters/settleduration"
  },
  "next": {
    "title": "duration",
    "slug": "text/scrambletext/scrambletext-parameters/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay)
> Breadcrumb: Text → scrambleText → scrambleText parameters → delay

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            delay                                              
        

          
        Delay in ms before the scramble animation starts.

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

const values = [0, 500, 1500];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ delay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the scramble animation starts.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>1500</button>
  </fieldset>
</div>
```

---

← Prev: **settleDuration** (`text/scrambletext/scrambletext-parameters/settleduration`) | Next: **duration** (`text/scrambletext/scrambletext-parameters/duration`) →
