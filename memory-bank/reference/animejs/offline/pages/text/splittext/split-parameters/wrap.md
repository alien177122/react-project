---
{
  "order": 258,
  "section": "text",
  "path": "splittext/split-parameters/wrap",
  "slug": "text/splittext/split-parameters/wrap",
  "url": "https://animejs.com/documentation/text/splittext/split-parameters/wrap",
  "title": "wrap",
  "breadcrumb": [
    "Text",
    "splitText",
    "Split parameters",
    "wrap"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "class",
    "slug": "text/splittext/split-parameters/class"
  },
  "next": {
    "title": "clone",
    "slug": "text/splittext/split-parameters/clone"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# wrap

> Source: [https://animejs.com/documentation/text/splittext/split-parameters/wrap](https://animejs.com/documentation/text/splittext/split-parameters/wrap)
> Breadcrumb: Text → splitText → Split parameters → wrap

Text

                          
              
                splitText              
                          
              
                Split parameters              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            wrap                                              
        

          
        Adds an extra wrapper element with the specified CSS `overflow` property to all split elements.

## Outputs

```html

  word

```

## Accepts

- `'hidden'` | `'clip'` | `'visible'` | `'scroll'` | `'auto'`

- `Boolean` (`true` is equivalent to `'clip'`)

- `null`

## Default

`null`

## Code example (js)

```js
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: true },
});

animate(chars, {
  y: ['75%', '0%'],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
  alternate: true,
});
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split and wrap text.</p>
</div>
<div class="small row"></div>
```

---

← Prev: **class** (`text/splittext/split-parameters/class`) | Next: **clone** (`text/splittext/split-parameters/clone`) →
