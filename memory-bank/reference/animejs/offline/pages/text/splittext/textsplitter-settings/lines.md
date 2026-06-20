---
{
  "order": 269,
  "section": "text",
  "path": "splittext/textsplitter-settings/lines",
  "slug": "text/splittext/textsplitter-settings/lines",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/lines",
  "title": "lines",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "lines"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "TextSplitter settings",
    "slug": "text/splittext/textsplitter-settings"
  },
  "next": {
    "title": "words",
    "slug": "text/splittext/textsplitter-settings/words"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# lines

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/lines](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines)
> Breadcrumb: Text → splitText → TextSplitter settings → lines

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            lines                                              
        

          
        Defines if and how the lines should be split.

Split line elements are accessed via an array returned by the `lines` property of a `TextSplit` instance.

```js
const { lines } = splitText(target, { lines: true });
```

## Default split wrappers

By default, each line is wrapped in a span element with the following styles and data attributes:

```html
This is the first line
This is the second line
This is the third line
```

## Custom split wrappers

Split wrappers can be configured by passing an `Object` of Split parameters or by passing a custom HTML template `String`.

## Splitting nested elements

Nested elements are duplicated across lines when necessary. For example, the following HTML:

```html

  This is a text with a link 
  that contains a nested *em 
  element*

```

Results in the following structure after splitting (CSS styles avoided for clarity):

```html

  This is a text with a link
  that contains a nested *em*
  *element*

```

## Font loading and line resize handling

To prevent incorrect line calculation, lines are split after all font loading and layout operations are complete by waiting for the `document.fonts.ready.then` promise to fulfill.

Then, if the target element resizes, lines are automatically re-split, overriding the existing lines, words and chars elements in the process.

## Animating lines, words and chars when splitting by lines

Each line split overrides existing split elements, which causes running split elements animations to stop once the fonts have loaded or every time the text element resizes.

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

splitText('p', {
  lines: { wrap: 'clip' },
})
.addEffect(({ lines }) => animate(lines, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(200),
  loop: true,
  loopDelay: 500,
}));
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by lines.<br>線で分割します。</p>
</div>
<div class="small row"></div>
```

---

← Prev: **TextSplitter settings** (`text/splittext/textsplitter-settings`) | Next: **words** (`text/splittext/textsplitter-settings/words`) →
