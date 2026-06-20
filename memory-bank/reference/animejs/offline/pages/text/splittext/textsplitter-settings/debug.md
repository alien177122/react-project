---
{
  "order": 267,
  "section": "text",
  "path": "splittext/textsplitter-settings/debug",
  "slug": "text/splittext/textsplitter-settings/debug",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/debug",
  "title": "debug",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "debug"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "chars",
    "slug": "text/splittext/textsplitter-settings/chars"
  },
  "next": {
    "title": "includeSpaces",
    "slug": "text/splittext/textsplitter-settings/includespaces"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# debug

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/debug](https://animejs.com/documentation/text/splittext/textsplitter-settings/debug)
> Breadcrumb: Text → splitText → TextSplitter settings → debug

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            debug                                              
        

          
        Toggles debug CSS styles on the split elements to better visualize the wrapper elements.

Lines are outlined in green, words in red, characters in blue.

```js
splitText(target, { debug: true });
```

## Accepts

`Boolean`

## Default

`false`

## Code example (js)

```js
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let debug = false;
let split;

const toggleDebug = () => {
  if (split) split.revert();
  debug = !debug;
  split = splitText($p, {
    lines: true,
    chars: true,
    words: true,
    debug: debug,
  });
}

toggleDebug();

$button.addEventListener('click', toggleDebug);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle debug</button>
  </fieldset>
</div>
```

---

← Prev: **chars** (`text/splittext/textsplitter-settings/chars`) | Next: **includeSpaces** (`text/splittext/textsplitter-settings/includespaces`) →
