---
{
  "order": 270,
  "section": "text",
  "path": "splittext/textsplitter-settings/words",
  "slug": "text/splittext/textsplitter-settings/words",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/words",
  "title": "words",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "words"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "lines",
    "slug": "text/splittext/textsplitter-settings/lines"
  },
  "next": {
    "title": "chars",
    "slug": "text/splittext/textsplitter-settings/chars"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# words

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/words](https://animejs.com/documentation/text/splittext/textsplitter-settings/words)
> Breadcrumb: Text → splitText → TextSplitter settings → words

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            words                                              
        

          
        Defines if and how the words should be split.

Split word elements are accessed via an array returned by the `words` property of a `TextSplit` instance.

```js
const { words } = splitText(target, { words: true });
```

Internally, for browsers that support it, word splitting is done using the native `Intl.Segmenter` object, allowing splitting words for languages that don't use spaces, like Japanese, Chinese, Thai, Lao, Khmer, Myanmar, etc, and falls back to using `String.prototype.split()` for older browsers.

## Default split wrappers

By default, each word is wrapped in a span element with the following styles and data attributes:

```html
Split
by
words
```

## Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.

## Animating words when also splitting by lines

Each line split overrides existing word elements, which causes running word animations to stop once the fonts have loaded or every time the text element resizes.

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

`true`

## Related

- [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters)
- [HTML template](https://animejs.com/documentation/text/splittext/html-template)
- [split.addEffect()](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect)
- [split.revert()](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert)

## Code example (js)

```js
import { animate, splitText, stagger } from 'animejs';

const { words } = splitText('p', {
  words: { wrap: 'clip' },
})

animate(words, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
});
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="small row"></div>
```

---

← Prev: **lines** (`text/splittext/textsplitter-settings/lines`) | Next: **chars** (`text/splittext/textsplitter-settings/chars`) →
