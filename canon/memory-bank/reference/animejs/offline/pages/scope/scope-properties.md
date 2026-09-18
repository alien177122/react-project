---
{
  "order": 228,
  "section": "scope",
  "path": "scope-properties",
  "slug": "scope/scope-properties",
  "url": "https://animejs.com/documentation/scope/scope-properties",
  "title": "Scope properties",
  "breadcrumb": [
    "Scope",
    "Scope properties"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "refresh()",
    "slug": "scope/scope-methods/refresh"
  },
  "next": {
    "title": "Events",
    "slug": "events"
  }
}
---

# Scope properties

> Source: [https://animejs.com/documentation/scope/scope-properties](https://animejs.com/documentation/scope/scope-properties)
> Breadcrumb: Scope → Scope properties

Scope

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Scope properties                                              
        

          
        Properties available on the `Scope` instance returned by a `createScope()` function.

```js
const scope = createScope();
      ┌────────┐
scope.│methods │
scope.│root    ├─ Properties
scope.│matches │
      └────────┘
```

| Name | Description |
| --- | --- |
| data | An object used to store variables associated with the scope. Every properties added to it are cleared when the scope is reverted (`Object`) |
| defaults | Gets the default parameters for this scope (`Object`) |
| root | Gets the root element for DOM operations in this scope (`Document` \| `HTMLElement`) |
| constructors | Gets the array of constructor functions added to this scope (`Array`) |
| revertConstructors | Gets the array of revert constructor functions (`Array`) |
| revertibles | Gets the array of revertible objects created within this scope (`Array`) |
| methods | Gets the object containing methods added to this scope (`Object`) |
| matches | Gets the object containing current media query match results (`Object`) |
| mediaQueryLists | Gets the object containing MediaQueryList objects for this scope (`Object`) |

---

← Prev: **refresh()** (`scope/scope-methods/refresh`) | Next: **Events** (`events`) →
