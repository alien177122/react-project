---
{
  "order": 244,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/override",
  "slug": "text/scrambletext/scrambletext-parameters/override",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override",
  "title": "override",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "override"
  ],
  "prev": {
    "title": "chars",
    "slug": "text/scrambletext/scrambletext-parameters/chars"
  },
  "next": {
    "title": "ease",
    "slug": "text/scrambletext/scrambletext-parameters/ease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# override

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override)
> Breadcrumb: Text → scrambleText → scrambleText parameters → override

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            override                                              
        

          
        Controls the starting appearance of the text before the scramble animation begins.

## Accepts

| Value | Description |
| --- | --- |
| `true` | Scrambles the original text using the `chars` set |
| `false` | Shows the original text as-is |
| `''` | Starts from blank |
| `' '` | Replaces characters with spaces |
| `String` | Characters set (see the `chars` parameter) |

## Default

`true`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const overrides = [false, 'uppercase', '_'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ override: overrides[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Controls the starting appearance of the text before the scramble animation begins.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>false</button>
    <button>'uppercase'</button>
    <button>'_'</button>
  </fieldset>
</div>
```

---

← Prev: **chars** (`text/scrambletext/scrambletext-parameters/chars`) | Next: **ease** (`text/scrambletext/scrambletext-parameters/ease`) →
