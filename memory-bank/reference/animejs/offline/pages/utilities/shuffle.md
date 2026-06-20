---
{
  "order": 373,
  "section": "utilities",
  "path": "shuffle",
  "slug": "utilities/shuffle",
  "url": "https://animejs.com/documentation/utilities/shuffle",
  "title": "shuffle()",
  "breadcrumb": [
    "Utilities",
    "shuffle()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "randomPick()",
    "slug": "utilities/random-pick"
  },
  "next": {
    "title": "round()",
    "slug": "utilities/round"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# shuffle()

> Source: [https://animejs.com/documentation/utilities/shuffle](https://animejs.com/documentation/utilities/shuffle)
> Breadcrumb: Utilities → shuffle()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            shuffle()                                              
        

          
        Mutates an array by randomizing the order of its elements.

```js
const shuffledArray = utils.shuffle(array);
```

## Parameters

| Name | Accepts |
| --- | --- |
| array | `Array` |

## Returns

The mutated `Array`

## Code example (js)

```js
import { utils, animate, stagger } from 'animejs';

const [ $shuffle ] = utils.$('button');
const squares = utils.$('.square');
const x = stagger('3.2rem');

// Initial squares x position
utils.set(squares, { x });

const shuffle = () => animate(utils.shuffle(squares), { x });

$shuffle.addEventListener('click', shuffle);
```

## Code example (html)

```html
<div class="large row">
  <div class="square">A</div>
  <div class="square">B</div>
  <div class="square">C</div>
  <div class="square">D</div>
  <div class="square">E</div>
  <div class="square">F</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Shuffle</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#utilities-shuffle .square {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(var(--rgb-current-1), .25);
}

#utilities-shuffle .docs-demo-template .square {
  opacity: 0;
}
```

---

← Prev: **randomPick()** (`utilities/random-pick`) | Next: **round()** (`utilities/round`) →
