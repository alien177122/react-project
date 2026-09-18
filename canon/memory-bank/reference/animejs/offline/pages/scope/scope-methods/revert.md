---
{
  "order": 223,
  "section": "scope",
  "path": "scope-methods/revert",
  "slug": "scope/scope-methods/revert",
  "url": "https://animejs.com/documentation/scope/scope-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Scope",
    "Scope methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "keepTime()",
    "slug": "scope/scope-methods/keeptime"
  },
  "next": {
    "title": "refresh()",
    "slug": "scope/scope-methods/refresh"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/scope/scope-methods/revert](https://animejs.com/documentation/scope/scope-methods/revert)
> Breadcrumb: Scope → Scope methods → revert()

Scope

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Reverts all Anime.js objects that have been declared inside a Scope and call the constructors cleanup functions if needed.

## Returns

The Scope itself

## Code example (js)

```js
import { utils, stagger, createScope, createTimeline } from 'animejs';

const [ $button1, $button2 ] = utils.$('.revert');

function onMouseEnter() { animate(this, { scale: 2, duration: 250 }) }
function onMouseLeave() { animate(this, { scale: 1, duration: 750 }) }

const scopeConstructor = scope => {
  const circles = utils.$('.circle');
    
  circles.forEach(($circle, i) => {
    animate($circle, {
      opacity: .25,
      loop: true,
      alternate: true,
      duration: 500,
      delay: i * 100,
      ease: 'inOut(3)',
    });
    $circle.addEventListener('mouseenter', onMouseEnter);
    $circle.addEventListener('mouseleave', onMouseLeave);
  });
  
  // Cleanup function to take care of removing event listeners on revert
  return () => {
    circles.forEach($circle => {
      // Anime.js instances are automatically reverted by the Scope
      $circle.removeEventListener('mouseenter', onMouseEnter);
      $circle.removeEventListener('mouseleave', onMouseLeave);
    });
  }
}

const scope1 = createScope({ root: '.row-1' }).add(scopeConstructor);
const scope2 = createScope({ root: '.row-2' }).add(scopeConstructor);

const revertScope1 = () => scope1.revert();
const revertScope2 = () => scope2.revert();

$button1.addEventListener('click', revertScope1);
$button2.addEventListener('click', revertScope2);
```

## Code example (html)

```html
<div class="medium justified row row-1">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium justified row row-2">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert row 1</button>
    <button class="button revert">Revert row 2</button>
  </fieldset>
</div>
```

---

← Prev: **keepTime()** (`scope/scope-methods/keeptime`) | Next: **refresh()** (`scope/scope-methods/refresh`) →
