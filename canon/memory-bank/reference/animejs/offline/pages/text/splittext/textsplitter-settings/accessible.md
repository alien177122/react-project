---
{
  "order": 265,
  "section": "text",
  "path": "splittext/textsplitter-settings/accessible",
  "slug": "text/splittext/textsplitter-settings/accessible",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible",
  "title": "accessible",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings",
    "accessible"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "includeSpaces",
    "slug": "text/splittext/textsplitter-settings/includespaces"
  },
  "next": {
    "title": "Split parameters",
    "slug": "text/splittext/split-parameters"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# accessible

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible](https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible)
> Breadcrumb: Text → splitText → TextSplitter settings → accessible

Text

                          
              
                splitText              
                          
              
                Settings              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            accessible                                              
        

          
        Creates an accessible cloned element that preserves the structure of the original split element.

```js
splitText(target, { accessible: true });
```

## Accepts

`Boolean`

## Default

`true`

## Code example (js)

```js
import { createTimeline, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const split = splitText('p', { debug: true });
const $accessible = split.$target.firstChild;

$accessible.style.cssText = `
  opacity: 0;
  position: absolute;
  color: var(--hex-green-1);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  outline: currentColor dotted 1px;
`;

const showAccessibleClone = createTimeline({
  defaults: { ease: 'inOutQuad' },
})
.add($accessible, {
  opacity: 1,
  z: '-2rem',
}, 0)
.add('p', {
  rotateX: 0,
  rotateY: 60
}, 0)
.add(split.words, {
  z: '6rem',
  opacity: .75,
  outlineColor: { from: '#FFF0' },
  duration: 750,
  delay: stagger(40, { from: 'random' })
}, 0)
.init();

const toggleAccessibleClone = () => {
  showAccessibleClone.alternate().resume();
}
 
$button.addEventListener('click', toggleAccessibleClone);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle accessible</button>
  </fieldset>
</div>
```

## Code example (css)

```css
.docs-demo.is-active #text-splittext-textsplitter-settings-accessible .docs-demo-template {
  opacity: 0;
}

#text-splittext-textsplitter-settings-accessible .large.row {
  perspective: 600px;
}

#text-splittext-textsplitter-settings-accessible .text-xl {
  transform-style: preserve-3d;
}
```

---

← Prev: **includeSpaces** (`text/splittext/textsplitter-settings/includespaces`) | Next: **Split parameters** (`text/splittext/split-parameters`) →
