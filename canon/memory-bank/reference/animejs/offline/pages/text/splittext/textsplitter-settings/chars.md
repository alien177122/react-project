---
{
  "order": 266,
  "section": "text",
  "path": "splittext/textsplitter-settings/chars",
  "slug": "text/splittext/textsplitter-settings/chars",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/chars",
  "title": "chars",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "chars"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "words",
    "slug": "text/splittext/textsplitter-settings/words"
  },
  "next": {
    "title": "debug",
    "slug": "text/splittext/textsplitter-settings/debug"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# chars

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/chars](https://animejs.com/documentation/text/splittext/textsplitter-settings/chars)
> Breadcrumb: Text → splitText → TextSplitter settings → chars

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            chars                                              
        

          
        Defines if and how the chars should be split.

Split characters elements are accessed via an array returned by the `chars` property of a `TextSplit` instance.

```js
const { chars } = splitText(target, { chars: true });
```

## Default split wrappers

By default, each character is wrapped in a span element with the following styles and data attributes:

```html
H
E
Y
```

## Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.

## Animating chars when also splitting by lines

Each line split overrides existing character elements, which causes running character animations to stop once the fonts have loaded or every time the text element resizes.

Declaring an animation within the `split.addEffect()` method ensures continuous playback between resizes and automatically reverts it when using `split.revert()`.

```js
const split = splitText(target, params);

split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

split.revert(); // This also reverts the animation declared with addEffect
```

## Accepts

- `Boolean`

- `Object` of Split parameters

- HTML template `String`

## Default

`false`

## Related

- [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters)
- [HTML template](https://animejs.com/documentation/text/splittext/html-template)
- [split.addEffect()](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect)
- [split.revert()](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert)

## Code example (js)

```js
import { animate, splitText, stagger } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: 'clip' },
});

animate(chars, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
});
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="small row"></div>
```

---

← Prev: **words** (`text/splittext/textsplitter-settings/words`) | Next: **debug** (`text/splittext/textsplitter-settings/debug`) →
