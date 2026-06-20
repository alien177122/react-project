---
{
  "order": 216,
  "section": "scope",
  "path": "add-constructor-function",
  "slug": "scope/add-constructor-function",
  "url": "https://animejs.com/documentation/scope/add-constructor-function",
  "title": "Add constructor function",
  "breadcrumb": [
    "Scope",
    "Add constructor function"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Scope",
    "slug": "scope"
  },
  "next": {
    "title": "Register method function",
    "slug": "scope/register-method-function"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Add constructor function

> Source: [https://animejs.com/documentation/scope/add-constructor-function](https://animejs.com/documentation/scope/add-constructor-function)
> Breadcrumb: Scope → Add constructor function

Scope

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Add constructor function                                              
        

          
        A constructor function is called inside the Scope's context immediately after being passed as a callback of the Scope's `add()` or `addOnce()` method.

The Scope registers and keeps track of all animations, timers, timelines, animatables, draggables, onScrolls, and even other scopes declared inside the constructor function.

```js
// Execute a constructor every time a media query changes
scope.add(constructor);

// Execute a constructor once
scope.addOnce(constructorFunction);
```

## Constructor function argument

| Name | Type |
| --- | --- |
| self | The current Scope instance |

## Returns (optional)

A cleanup `Function` called when the Scope is reverted or when a media query changes.

## Related

- [add()](https://animejs.com/documentation/scope/scope-methods/add)
- [addOnce](https://animejs.com/documentation/scope/scope-methods/addonce)

## Code example (js)

```js
import { utils, animate, createScope, createDraggable } from 'animejs';

createScope({
  mediaQueries: { isSmall: '(max-width: 200px)' },
  defaults: { ease: 'linear' },
})
.add(self => {

  /* Media queries state are accessible on the matches property */
  const { isSmall } = self.matches;
  /* The $() utility method is also scoped */
  const [ $square ] = utils.$('.square');

  if (self.matches.isSmall) {
    /* Only animate the square when the iframe is small */
    animate($square, {
      rotate: 360,
      loop: true,
    });
  } else {
    /* Only create the draggable when the iframe is large enough */
    $square.classList.add('draggable');
    createDraggable($square, {
      container: document.body,
    });
  }
  
  return () => {
    /* Removes the class 'draggable' when the scope reverts itself */
    $square.classList.remove('draggable');
  }

});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

← Prev: **Scope** (`scope`) | Next: **Register method function** (`scope/register-method-function`) →
