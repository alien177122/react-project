---
{
  "order": 248,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/reversed",
  "slug": "text/scrambletext/scrambletext-parameters/reversed",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed",
  "title": "reversed",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "reversed"
  ],
  "prev": {
    "title": "from",
    "slug": "text/scrambletext/scrambletext-parameters/from"
  },
  "next": {
    "title": "seed",
    "slug": "text/scrambletext/scrambletext-parameters/seed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reversed

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed)
> Breadcrumb: Text → scrambleText → scrambleText parameters → reversed

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            reversed                                              
        

          
        Reverses the reveal order. For example, `'center'` with `reversed: true` reveals from the edges inward instead of center outward.

## Accepts

`Boolean`

## Default

`false`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

let reversed = false;

function play() {
  reversed = !reversed;
  $button.textContent = `reversed: ${reversed}`;
  animate($p, {
    innerHTML: scrambleText({ from: 'center', reversed }),
  });
}

play();

$button.addEventListener('click', play);
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">The animation flows in the opposite direction of the specified from value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>reversed: false</button>
  </fieldset>
</div>
```

---

← Prev: **from** (`text/scrambletext/scrambletext-parameters/from`) | Next: **seed** (`text/scrambletext/scrambletext-parameters/seed`) →
