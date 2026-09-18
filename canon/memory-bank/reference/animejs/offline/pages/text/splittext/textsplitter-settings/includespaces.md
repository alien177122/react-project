---
{
  "order": 268,
  "section": "text",
  "path": "splittext/textsplitter-settings/includespaces",
  "slug": "text/splittext/textsplitter-settings/includespaces",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces",
  "title": "includeSpaces",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "includeSpaces"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "debug",
    "slug": "text/splittext/textsplitter-settings/debug"
  },
  "next": {
    "title": "accessible",
    "slug": "text/splittext/textsplitter-settings/accessible"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# includeSpaces

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces)
> Breadcrumb: Text → splitText → TextSplitter settings → includeSpaces

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            includeSpaces                                              
        

          
        Defines whether whitespace should be included in the split elements.

```js
splitText(target, { includeSpaces: true });
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

let includeSpaces = true;
let split;

const toggleSpaces = () => {
  if (split) split.revert();
  includeSpaces = !includeSpaces;
  split = splitText($p, {
    debug: true,
    includeSpaces: includeSpaces,
  });
}

toggleSpaces();

$button.addEventListener('click', toggleSpaces);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>Include spaces or not.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle spaces</button>
  </fieldset>
</div>
```

---

← Prev: **debug** (`text/splittext/textsplitter-settings/debug`) | Next: **accessible** (`text/splittext/textsplitter-settings/accessible`) →
