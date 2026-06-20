---
{
  "order": 262,
  "section": "text",
  "path": "splittext/textsplitter-methods/revert",
  "slug": "text/splittext/textsplitter-methods/revert",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter methods",
    "revert()"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "addEffect()",
    "slug": "text/splittext/textsplitter-methods/addeffect"
  },
  "next": {
    "title": "refresh()",
    "slug": "text/splittext/textsplitter-methods/refresh"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-methods/revert](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert)
> Breadcrumb: Text → splitText → TextSplitter methods → revert()

Text

                          
              
                splitText              
                          
              
                Methods              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            revert()                                              
        

          
        Reverts the split target html back to its original state, removing debug styles and reverting all animations added with `split.addEffect()` in the process.

## Returns

`TextSplitter`

## Related

- [split.addEffect()](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect)

## Code example (js)

```js
import { animate, stagger, splitText, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  words: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['100%', '0%'],
  duration: 1250,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
  alternate: true,
}));

const revertSplit = () => {
  split.revert();
  $button.setAttribute('disabled', 'true');
}

$button.addEventListener('click', revertSplit);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Revert</button>
  </fieldset>
</div>
```

---

← Prev: **addEffect()** (`text/splittext/textsplitter-methods/addeffect`) | Next: **refresh()** (`text/splittext/textsplitter-methods/refresh`) →
