---
{
  "order": 253,
  "section": "text",
  "path": "splittext",
  "slug": "text/splittext",
  "url": "https://animejs.com/documentation/text/splittext",
  "title": "splitText",
  "breadcrumb": [
    "Text",
    "splitText"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "Text",
    "slug": "text"
  },
  "next": {
    "title": "TextSplitter settings",
    "slug": "text/splittext/textsplitter-settings"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# splitText

> Source: [https://animejs.com/documentation/text/splittext](https://animejs.com/documentation/text/splittext)
> Breadcrumb: Text → splitText

Text

                      

          
                        Since 4.1.0
                      

        
                

## 
          
            splitText                                              
        

          
        

## A lightweight, responsive and accessible text utility function to split, clone and wrap lines, words and characters of an HTML Element.

Text splits are created using the `splitText()` function.

```js
import { splitText } from 'animejs';

const split = splitText(target, parameters);
```

Since v4.2.0, the `splitText()` method can also be imported independently without importing the entire library.

```js
import { splitText } from 'animejs/text';
```

## Parameters

| Name | Accepts |
| --- | --- |
| target | A valid CSS selector `String` \| `HTMLElement` |
| parameters (opt) | An `Object` of TextSplitter settings |

## Returns

`TextSplitter`

## Code example (js)

```js
import { createTimeline, stagger, utils, splitText } from 'animejs';

const { words, chars } = splitText('p', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
}, stagger(125))
.add(chars, {
  y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();
```

## Code example (html)

```html
<div class="large centered grid square-grid">
  <p class="text-xl">
    All-in-one text splitter<br>
    テキストスプリッター
  </p>
</div>
```

## Code example (css)

```css
#text-split .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
  line-height: 1.35;
}
```

---

← Prev: **Text** (`text`) | Next: **TextSplitter settings** (`text/splittext/textsplitter-settings`) →
