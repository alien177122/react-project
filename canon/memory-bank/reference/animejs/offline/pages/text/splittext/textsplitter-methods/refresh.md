---
{
  "order": 261,
  "section": "text",
  "path": "splittext/textsplitter-methods/refresh",
  "slug": "text/splittext/textsplitter-methods/refresh",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh",
  "title": "refresh()",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter methods",
    "refresh()"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "revert()",
    "slug": "text/splittext/textsplitter-methods/revert"
  },
  "next": {
    "title": "TextSplitter properties",
    "slug": "text/splittext/textsplitter-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# refresh()

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh](https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh)
> Breadcrumb: Text → splitText → TextSplitter methods → refresh()

Text

                          
              
                splitText              
                          
              
                Methods              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            refresh()                                              
        

          
        Manually splits the text again, taking into account any parameters changes.

```js
const split = splitText(target);

split.html = 'Some new text to split';

split.refresh();
```

The properties that can be safely manually updated are:

| Name | Description |
| --- | --- |
| $target | The split element (`HTMLElement`) |
| html | The html to split (`String`) |
| debug | Defines if the debug styles are visible or not (`Boolean`) |
| includeSpaces | Defines if the spaces should be wrapped within the text (`Boolean`) |
| accessible | Defines if the accessible clone element should be created (`Boolean`) |
| lineTemplate | The line html template (`String`) |
| wordTemplate | The word html template (`String`) |
| charTemplate | The char html template (`String`) |

## Returns

`TextSplitter`

## Code example (js)

```js
import { animate, stagger, splitText, utils } from 'animejs';

const [ $add, $remove ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  lines: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['0%', '75%'],
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
  delay: stagger(150)
}));

const words = ['sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'tortor', 'lectus', 'aliquet'];

const addRandomWord = () => {
  split.html += ' ' + utils.randomPick(words);
  split.refresh();
}

const removeRandomWord = () => {
  const words = split.words.map(w => w.innerHTML);
  split.html = (words.splice(utils.random(0, words.length - 1), 1), words).join(' ');
  split.refresh();
}

$add.addEventListener('click', addRandomWord);
$remove.addEventListener('click', removeRandomWord);
```

## Code example (html)

```html
<div class="large centered row">
  <p class="text-xl">Lorem ipsum dolor</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add word</button>
    <button>Remove word</button>
  </fieldset>
</div>
```

---

← Prev: **revert()** (`text/splittext/textsplitter-methods/revert`) | Next: **TextSplitter properties** (`text/splittext/textsplitter-properties`) →
