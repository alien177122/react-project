---
{
  "order": 241,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/duration",
  "slug": "text/scrambletext/scrambletext-parameters/duration",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration",
  "title": "duration",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "duration"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "delay",
    "slug": "text/scrambletext/scrambletext-parameters/delay"
  },
  "next": {
    "title": "perturbation",
    "slug": "text/scrambletext/scrambletext-parameters/perturbation"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration)
> Breadcrumb: Text → scrambleText → scrambleText parameters → duration

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            duration                                              
        

          
        Overrides the computed duration. If unset or `0`, the duration is automatically calculated from the text length, `interval` and `settle` parameters.

## Accepts

- `Number`

- `Function(target, index, targets)` returning a `Number`

## Default

Auto-computed

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [500, 2000, 5000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ duration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Override the auto-computed animation duration with a specific value in milliseconds for precise control.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>500</button>
    <button>2000</button>
    <button>5000</button>
  </fieldset>
</div>
```

---

← Prev: **delay** (`text/scrambletext/scrambletext-parameters/delay`) | Next: **perturbation** (`text/scrambletext/scrambletext-parameters/perturbation`) →
