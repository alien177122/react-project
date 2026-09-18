---
{
  "order": 242,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/ease",
  "slug": "text/scrambletext/scrambletext-parameters/ease",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease",
  "title": "ease",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "ease"
  ],
  "prev": {
    "title": "override",
    "slug": "text/scrambletext/scrambletext-parameters/override"
  },
  "next": {
    "title": "cursor",
    "slug": "text/scrambletext/scrambletext-parameters/cursor"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# ease

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease)
> Breadcrumb: Text → scrambleText → scrambleText parameters → ease

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            ease                                              
        

          
        The easing applied to the scramble animation.

## Accepts

Any valid easing value

## Default

`'linear'`

## Related

- [easing](https://animejs.com/documentation/easings)

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');
const easeCurves = ['linear', 'inOut(3)', 'outExpo'];

function play(ease) {
  animate($p, { innerHTML: scrambleText({ ease, override: false }) });
}

play(easeCurves[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(easeCurves[i])));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Apply easing functions to control the acceleration and deceleration of the scramble reveal wave.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>linear</button>
    <button>inOut</button>
    <button>outExpo</button>
  </fieldset>
</div>
```

---

← Prev: **override** (`text/scrambletext/scrambletext-parameters/override`) | Next: **cursor** (`text/scrambletext/scrambletext-parameters/cursor`) →
