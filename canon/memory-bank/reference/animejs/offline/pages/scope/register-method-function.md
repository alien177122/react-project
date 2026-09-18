---
{
  "order": 217,
  "section": "scope",
  "path": "register-method-function",
  "slug": "scope/register-method-function",
  "url": "https://animejs.com/documentation/scope/register-method-function",
  "title": "Register method function",
  "breadcrumb": [
    "Scope",
    "Register method function"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Add constructor function",
    "slug": "scope/add-constructor-function"
  },
  "next": {
    "title": "Scope parameters",
    "slug": "scope/scope-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Register method function

> Source: [https://animejs.com/documentation/scope/register-method-function](https://animejs.com/documentation/scope/register-method-function)
> Breadcrumb: Scope → Register method function

Scope

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Register method function                                              
        

          
        A method can be registered within a Scope by passing a `String` name and a `Function` to the Scope's `add()` method. Once registered, the method becomes available on the Scope instance's `methods` object. This allows the method to be called from outside the Scope while maintaining its execution context within the Scope.

```js
scope.add('methodName', methodFunction); // Register the method

scope.methods.methodName(); // Execute the method
```

## Method arguments

| Name | Type |
| --- | --- |
| ...args | Any |

## Related

- [add()](https://animejs.com/documentation/scope/scope-methods/add)

## Code example (js)

```js
import { utils, animate, createScope } from 'animejs';

const scope = createScope({
  mediaQueries: { isSmall: '(max-width: 200px)' },
})
.add(self => {

  /* Registering the method inside the scope allows access to the scope itself */
  self.add('onClick', (e) => {

    const { clientX, clientY } = e;
    const { isSmall } = self.matches;

    animate('.square', {
      rotate: isSmall ? '+=360' : 0,
      x: isSmall ? 0 : clientX - (window.innerWidth / 2),
      y: isSmall ? 0 : clientY - (window.innerHeight / 2),
      duration: isSmall ? 750 : 400,
    });
    
  });
  
  utils.set(document.body, {
    cursor: self.matches.isSmall ? 'alias' : 'crosshair'
  });
  
});

/* Methods can be called outside the scope */
document.addEventListener('click', scope.methods.onClick);
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

← Prev: **Add constructor function** (`scope/add-constructor-function`) | Next: **Scope parameters** (`scope/scope-parameters`) →
