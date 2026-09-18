---
{
  "order": 254,
  "section": "text",
  "path": "splittext/html-template",
  "slug": "text/splittext/html-template",
  "url": "https://animejs.com/documentation/text/splittext/html-template",
  "title": "HTML template",
  "breadcrumb": [
    "Text",
    "splitText",
    "HTML template"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "clone",
    "slug": "text/splittext/split-parameters/clone"
  },
  "next": {
    "title": "TextSplitter methods",
    "slug": "text/splittext/textsplitter-methods"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# HTML template

> Source: [https://animejs.com/documentation/text/splittext/html-template](https://animejs.com/documentation/text/splittext/html-template)
> Breadcrumb: Text → splitText → HTML template

Text

                          
              
                splitText              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            HTML template                                              
        

          
        Custom HTML templates can be used on the `lines`, `words`, and `chars` properties, which then serve as wrappers for all split elements.

The HTML template must contain at least one `'{value}'` variable that will be replaced by the split value. Similarly, the `'{i}'` variable can be used and will be replaced by the current split index.

All the necessary styles, like `'display: inline-block;'`, will be applied automatically and don't need to be defined in the template.

For example, if you pass the following template to the char parameter like this:

```js
splitText('p', { chars: '{value}*' });
```

The split output will be:

```html

  H*
  E*
  L*
  L*
  O*

```

## Accepts

A `String` containing at least one reference to `'{value}'`

## Code example (js)

```js
import { createTimeline, stagger, splitText } from 'animejs';

splitText('p', {
  chars: `<span class="char-3d word-{i}">
    <em class="face face-top">{value}</em>
    <em class="face-front">{value}</em>
    <em class="face face-bottom">{value}</em>
  </span>`,
});

const charsStagger = stagger(100, { start: 0 });

createTimeline({ defaults: { ease: 'linear', loop: true, duration: 750 }})
.add('.char-3d', { rotateX: -90 }, charsStagger)
.add('.char-3d .face-top', { opacity: [.5, 0] }, charsStagger)
.add('.char-3d .face-front', { opacity: [1, .5] }, charsStagger)
.add('.char-3d .face-bottom', { opacity: [.5, 1] }, charsStagger);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Custom HTML template.</p>
</div>
```

## Code example (css)

```css
.char-3d {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 1rem;
}

.face {
  position: absolute;
  left: 0;
}

.face-bottom {
  top: 100%;
  transform-origin: 50% 0%;
  transform: rotateX(90deg);
}

.face-top {
  bottom: 100%;
  transform-origin: 50% 100%;
  transform: rotateX(-90deg);
}
```

---

← Prev: **clone** (`text/splittext/split-parameters/clone`) | Next: **TextSplitter methods** (`text/splittext/textsplitter-methods`) →
