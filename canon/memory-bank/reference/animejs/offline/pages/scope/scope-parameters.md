---
{
  "order": 224,
  "section": "scope",
  "path": "scope-parameters",
  "slug": "scope/scope-parameters",
  "url": "https://animejs.com/documentation/scope/scope-parameters",
  "title": "Scope parameters",
  "breadcrumb": [
    "Scope",
    "Scope parameters"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Register method function",
    "slug": "scope/register-method-function"
  },
  "next": {
    "title": "root",
    "slug": "scope/scope-parameters/root"
  }
}
---

# Scope parameters

> Source: [https://animejs.com/documentation/scope/scope-parameters](https://animejs.com/documentation/scope/scope-parameters)
> Breadcrumb: Scope → Scope parameters

Scope

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Scope parameters                                              
        

          
        

```js
import { createScope, animate } from 'animejs';

createScope({
┌─────────────────────────────────────────────────┐
│ root: '.section',                               │
│ defaults: {                                     │
│   duration: 250,                                │
│   ease: 'out(4)',                               │
│ },                                              ├─ Parameters
│ mediaQueries: {                                 │
│   mobile: '(max-width: 640px)',                 │
│   reducedMotion: '(prefers-reduced-motion)',    │
│ }                                               │
└─────────────────────────────────────────────────┘
})
.add( ctx => {
  const isMobile = ctx.matches.mobile;
  const reduceMotion = ctx.matches.reducedMotion;
  animate(targets, {
    x: isMobile ? 0 : '100vw',
    y: isMobile ? '100vh' : 0,
    duration: reduceMotion ? 0 : 750
  });
});
```

---

← Prev: **Register method function** (`scope/register-method-function`) | Next: **root** (`scope/scope-parameters/root`) →
