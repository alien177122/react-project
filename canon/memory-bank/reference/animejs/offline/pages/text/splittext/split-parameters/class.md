---
{
  "order": 256,
  "section": "text",
  "path": "splittext/split-parameters/class",
  "slug": "text/splittext/split-parameters/class",
  "url": "https://animejs.com/documentation/text/splittext/split-parameters/class",
  "title": "class",
  "breadcrumb": [
    "Text",
    "splitText",
    "Split parameters",
    "class"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "Split parameters",
    "slug": "text/splittext/split-parameters"
  },
  "next": {
    "title": "wrap",
    "slug": "text/splittext/split-parameters/wrap"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# class

> Source: [https://animejs.com/documentation/text/splittext/split-parameters/class](https://animejs.com/documentation/text/splittext/split-parameters/class)
> Breadcrumb: Text → splitText → Split parameters → class

Text

                          
              
                splitText              
                          
              
                Split parameters              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            class                                              
        

          
        Specifies a custom CSS class applied to all split elements.

## Outputs

```html

  word

```

## Accepts

- `String`

- `null`

## Default

`null`

## Code example (js)

```js
import { animate, stagger, splitText } from 'animejs';

splitText('p', {
  chars: { class: 'split-char' },
});

animate('.split-char', {
  y: ['0rem', '-1rem', '0rem'],
  loop: true,
  delay: stagger(100)
});
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Custom CSS class.</p>
</div>
<div class="small row"></div>
```

## Code example (css)

```css
.split-char {
  color: var(--hex-current-1);
  background-color: var(--hex-current-3);
  outline: 1px solid var(--hex-current-2);
  border-radius: .25rem;
}
```

---

← Prev: **Split parameters** (`text/splittext/split-parameters`) | Next: **wrap** (`text/splittext/split-parameters/wrap`) →
