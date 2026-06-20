---
{
  "order": 238,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/chars",
  "slug": "text/scrambletext/scrambletext-parameters/chars",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars",
  "title": "chars",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "chars"
  ],
  "prev": {
    "title": "text",
    "slug": "text/scrambletext/scrambletext-parameters/text"
  },
  "next": {
    "title": "override",
    "slug": "text/scrambletext/scrambletext-parameters/override"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# chars

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars)
> Breadcrumb: Text → scrambleText → scrambleText parameters → chars

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                      

        
                

## 
          
            chars                                              
        

          
        Characters used during the scramble animation. Accepts a literal string of characters `'ABC123'`, range syntax `'a-d'` (expands to `'abcd'` by Unicode code point order), or a combination of both: `'a-zA-Z0-9'`.

## Accepts

- `String` (literal characters, range syntax, or a named preset)

- `Function(target, index, targets)` returning a `String`

To include a literal `-` character, place it at the start or end of the string (e.g. `'-a-z'` or `'a-z-'`), otherwise it will be interpreted as a range separator.

## Named presets

| Name | Characters |
| --- | --- |
| `'lowercase'` | `a-z` |
| `'uppercase'` | `A-Z` |
| `'numbers'` | `0-9` |
| `'symbols'` | `!%#_\\|*+=` |
| `'braille'` | `⠀-⣿` |
| `'blocks'` | `▀-▟` |
| `'shades'` | `░-▓` |

## Default

`'a-zA-Z0-9!%#_'`

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const charSets = ['braille', 'blocks', 'numbers'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ chars: charSets[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">Define which characters appear during the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>braille</button>
    <button>blocks</button>
    <button>numbers</button>
  </fieldset>
</div>
```

---

← Prev: **text** (`text/scrambletext/scrambletext-parameters/text`) | Next: **override** (`text/scrambletext/scrambletext-parameters/override`) →
