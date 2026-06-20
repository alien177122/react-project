---
{
  "order": 206,
  "section": "layout",
  "path": "usage",
  "slug": "layout/usage",
  "url": "https://animejs.com/documentation/layout/usage",
  "title": "Usage",
  "breadcrumb": [
    "Layout",
    "Usage"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Layout",
    "slug": "layout"
  },
  "next": {
    "title": "Specifying a root",
    "slug": "layout/usage/specifying-a-root"
  }
}
---

# Usage

> Source: [https://animejs.com/documentation/layout/usage](https://animejs.com/documentation/layout/usage)
> Breadcrumb: Layout → Usage

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Usage                                              
        

          
        

## With the `layout.record()` & `layout.animate()` combo

Create and `record()` the initial state of a layout:

```js
const layout = createLayout(rootEl);

layout.record();
```

Change the layout state (update CSS, remove or add elements, etc.):

```js
rootEl.classList.toggle('row');
```

`animate()` from the old state to the new one automatically:

```js
layout.animate();
```

## With `layout.update()`

Or even simpler, by updating the DOM state inside the `update()` callback in one single call:

```js
const layout = createLayout(rootEl);

layout.update(() => rootEl.classList.toggle('row'));
```

---

← Prev: **Layout** (`layout`) | Next: **Specifying a root** (`layout/usage/specifying-a-root`) →
