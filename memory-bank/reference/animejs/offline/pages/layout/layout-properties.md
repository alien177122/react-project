---
{
  "order": 195,
  "section": "layout",
  "path": "layout-properties",
  "slug": "layout/layout-properties",
  "url": "https://animejs.com/documentation/layout/layout-properties",
  "title": "Layout properties",
  "breadcrumb": [
    "Layout",
    "Layout properties"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Layout callbacks",
    "slug": "layout/layout-callbacks"
  },
  "next": {
    "title": "Common auto layout gotchas",
    "slug": "layout/common-auto-layout-gotchas"
  }
}
---

# Layout properties

> Source: [https://animejs.com/documentation/layout/layout-properties](https://animejs.com/documentation/layout/layout-properties)
> Breadcrumb: Layout → Layout properties

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Layout properties                                              
        

          
        Properties available on the `AutoLayout` instance returned by `createLayout()`.

```js
const layout = createLayout(root, parameters);
       ┌──────────────────────┐
layout.│root                  │
layout.│timeline              ├─ Properties
layout.│entering              │
       └──────────────────────┘
```

| Name | Description |
| --- | --- |
| `params` | Configuration object passed to `createLayout()` (`AutoLayoutParams`) |
| `root` | Resolved root element where measurements start (`HTMLElement`) |
| `children` | Selector(s) used to find tracked elements each time `.record()` runs (`String\|Array`) |
| `enterFromParams` | Animation parameters for nodes entering the layout (`Object`) |
| `leaveToParams` | Animation parameters for nodes leaving the layout (`Object`) |
| `swapAtParams` | Animation parameters for nodes swapping during a layout transition (`Object`) |
| `properties` | Set of CSS property names interpolated whenever their values change (`Set`) |
| `oldState` | `LayoutSnapshot` objects containing previous measurements |
| `newState` | `LayoutSnapshot` objects containing latest measurements |
| `timeline` | Timeline instance returned by the last `.animate()` / `.update()` call (`Timeline`\|`null`) |
| `animating` | Arrays of DOM nodes animated during latest `.animate()` call (`Array`) |
| `swapping` | Arrays of DOM nodes swapped during the latest `.animate()` call (`Array`) |
| `entering` | Arrays of DOM nodes entering during the latest `.animate()` call (`Array`) |
| `leaving` | Arrays of DOM nodes leaving during the latest `.animate()` call (`Array`) |
| `id` | Gets and sets the ID of the layout (`String` \| `Number`) |

## LayoutSnapshot helpers

`layout.oldState` and `layout.newState` expose methods like `.getNode(element)` and `.getComputedValue(element, property)` to inspect recorded measurements.

## Inspecting runtime arrays

`layout.entering`, `layout.leaving`, and `layout.swapping` are cleared and repopulated every time `.animate()` runs. Use them immediately after calling `layout.update()` to coordinate custom states before the timeline completes.

---

← Prev: **Layout callbacks** (`layout/layout-callbacks`) | Next: **Common auto layout gotchas** (`layout/common-auto-layout-gotchas`) →
