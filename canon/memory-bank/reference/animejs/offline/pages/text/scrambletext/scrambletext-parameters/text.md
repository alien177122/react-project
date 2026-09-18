---
{
  "order": 252,
  "section": "text",
  "path": "scrambletext/scrambletext-parameters/text",
  "slug": "text/scrambletext/scrambletext-parameters/text",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text",
  "title": "text",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText parameters",
    "text"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "scrambleText parameters",
    "slug": "text/scrambletext/scrambletext-parameters"
  },
  "next": {
    "title": "chars",
    "slug": "text/scrambletext/scrambletext-parameters/chars"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# text

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text)
> Breadcrumb: Text → scrambleText → scrambleText parameters → text

Text

                          
              
                scrambleText              
                          
              
                Parameters              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            text                                              
        

          
        The text to transition to. If not set, the original text content of the target is used.

## Accepts

- `String`

- `Function(target, index, targets)` returning a `String`

## Default

Original text content

## Code example (js)

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

const texts = ['Transition between different text.', 'Hello World!', 'Anime.js 4.4 scrambleText()'];
let i = 0;

function play() {
  i = (i + 1) % texts.length;
  animate($p, {
    innerHTML: scrambleText({ text: texts[i] }),
  });
}

play();

$button.addEventListener('click', play);
```

## Code example (html)

```html
<div class="large row centered">
  <p class="text-l text-mono">Transition between different text.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Change text</button>
  </fieldset>
</div>
```

---

← Prev: **scrambleText parameters** (`text/scrambletext/scrambletext-parameters`) | Next: **chars** (`text/scrambletext/scrambletext-parameters/chars`) →
