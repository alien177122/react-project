---
{
  "order": 234,
  "section": "text",
  "path": "scrambletext",
  "slug": "text/scrambletext",
  "url": "https://animejs.com/documentation/text/scrambletext",
  "title": "scrambleText",
  "breadcrumb": [
    "Text"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "TextSplitter properties",
    "slug": "text/splittext/textsplitter-properties"
  },
  "next": {
    "title": "scrambleText parameters",
    "slug": "text/scrambletext/scrambletext-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# scrambleText

> Source: [https://animejs.com/documentation/text/scrambletext](https://animejs.com/documentation/text/scrambletext)
> Breadcrumb: Text

Text

                      

          
                        Since 4.4.0
                      

        
                

## 
          
            scrambleText            NEW                                  
        

          
        

## Animates text with character-by-character scramble and reveal effect.

`scrambleText()` returns a function-based tween value that progressively reveals the target's text content through a scramble animation. It is used directly as a property value in `animate()`.

```js
import { scrambleText } from 'animejs';

animate(target, { innerHTML: scrambleText(parameters) });
```

Or imported as a standalone module from the `'animejs/text'` subpath:

```js
import { scrambleText } from 'animejs/text';
```

## Parameters

| Name | Accepts |
| --- | --- |
| parameters (opt) | An `Object` of scrambleText parameters |

## Returns

A function-based tween value compatible with `animate()`.

`innerHTML` is recommended over `textContent` because `scrambleText` internally uses `&nbsp;` to preserve spaces, which requires HTML parsing.

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

animate('p', {
  innerHTML: scrambleText(),
  loop: true,
  loopDelay: 1000,
});
```

## Code example (html)

```html
<div class="large row">
  <p class="text-s text-mono">scrambleText() allows you to reveal a text via a smooth randomized character scramble transition effect.</p>
</div>
```

---

← Prev: **TextSplitter properties** (`text/splittext/textsplitter-properties`) | Next: **scrambleText parameters** (`text/scrambletext/scrambletext-parameters`) →
