---
{
  "order": 257,
  "section": "text",
  "path": "splittext/split-parameters/clone",
  "slug": "text/splittext/split-parameters/clone",
  "url": "https://animejs.com/documentation/text/splittext/split-parameters/clone",
  "title": "clone",
  "breadcrumb": [
    "Text",
    "splitText",
    "Split parameters",
    "clone"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "wrap",
    "slug": "text/splittext/split-parameters/wrap"
  },
  "next": {
    "title": "HTML template",
    "slug": "text/splittext/html-template"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# clone

> Source: [https://animejs.com/documentation/text/splittext/split-parameters/clone](https://animejs.com/documentation/text/splittext/split-parameters/clone)
> Breadcrumb: Text → splitText → Split parameters → clone

Text

                          
              
                splitText              
                          
              
                Split parameters              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            clone                                              
        

          
        Clones the split elements in the specified direction by wrapping the lines, words, or characters within the following HTML structure and setting the `top` and `left` CSS properties accordingly.

## Outputs

```html

  word
  word

```

## Accepts

- `'left'` | `'top'` | `'right'` | `'bottom'` | `'center'`

- `Boolean` (`true` is equivalent to `'center'`)

- `null`

## Default

`null`

## Code example (js)

```js
import { createTimeline, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: {
    wrap: 'clip',
    clone: 'bottom'
  },
});

createTimeline()
.add(chars, {
  y: '-100%',
  loop: true,
  loopDelay: 350,
  duration: 750,
  ease: 'inOut(2)',
}, stagger(150, { from: 'center' }));
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split and clone text.</p>
</div>
<div class="small row"></div>
```

---

← Prev: **wrap** (`text/splittext/split-parameters/wrap`) | Next: **HTML template** (`text/splittext/html-template`) →
