---
{
  "order": 219,
  "section": "scope",
  "path": "scope-methods/add",
  "slug": "scope/scope-methods/add",
  "url": "https://animejs.com/documentation/scope/scope-methods/add",
  "title": "add()",
  "breadcrumb": [
    "Scope",
    "Scope methods",
    "add()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Scope methods",
    "slug": "scope/scope-methods"
  },
  "next": {
    "title": "addOnce()",
    "slug": "scope/scope-methods/addonce"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# add()

> Source: [https://animejs.com/documentation/scope/scope-methods/add](https://animejs.com/documentation/scope/scope-methods/add)
> Breadcrumb: Scope → Scope methods → add()

Scope

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            add()                                              
        

          
        Adds constructor or registers method functions to a Scope.

## Parameters for adding a constructor

```js
scope.add(constructor);
```

| Name | Accepts |
| --- | --- |
| constructor | A constructor `Function` |

## Parameters for registering a method

```js
scope.add(name, method);
```

| Name | Accepts |
| --- | --- |
| name | A `String` used to store and access the method |
| method | A method `Function` |

## Returns

The Scope itself

## Code example (js)

```js
import { createScope, createAnimatable, createDraggable } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {

  const [ $circle ] = utils.$('.circle');
    
  if (self.matches.isSmall) {
    $circle.classList.add('draggable');
    self.circle = createDraggable($circle, {
      container: document.body,
    });
  } else {
    $circle.classList.remove('draggable');
    self.circle = createAnimatable($circle, {
      x: 500,
      y: 500,
      ease: 'out(3)'
    });
  }
  
  let win = { w: window.innerWidth, h: window.innerHeight };
  
  self.add('refreshBounds', () => {
    win.w = window.innerWidth;
    win.h = window.innerHeight;
  });
      
  self.add('onMouseMove', e => {
    if (self.matches.isSmall) return;
    const { w, h } = win;
    const hw = w / 2;
    const hh = h / 2;
    const x = utils.clamp(e.clientX - hw, -hw, hw);
    const y = utils.clamp(e.clientY - hh, -hh, hh);
    if (self.circle.x) {
      self.circle.x(x);
      self.circle.y(y);
    }
  });
  
  self.add('onPointerDown', e => {
    const { isSmall } = self.matches;
    animate($circle, {
      scale: [
        { to: isSmall ? 1.25 : .25, duration: isSmall ? 50 : 150 },
        { to: 1, duration: isSmall ? 250 : 500 },
      ]
    });
  });
  
});

window.addEventListener('resize', scope.methods.refreshBounds);
window.addEventListener('mousemove', scope.methods.onMouseMove);
document.addEventListener('pointerdown', scope.methods.onPointerDown);
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="circle"></div>
    </div>
  </div>
</div>
```

---

← Prev: **Scope methods** (`scope/scope-methods`) | Next: **addOnce()** (`scope/scope-methods/addonce`) →
