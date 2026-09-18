---
{
  "order": 187,
  "section": "layout",
  "path": "common-auto-layout-gotchas",
  "slug": "layout/common-auto-layout-gotchas",
  "url": "https://animejs.com/documentation/layout/common-auto-layout-gotchas",
  "title": "Common auto layout gotchas",
  "breadcrumb": [
    "Layout",
    "Common auto layout gotchas"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Layout properties",
    "slug": "layout/layout-properties"
  },
  "next": {
    "title": "Scope",
    "slug": "scope"
  }
}
---

# Common auto layout gotchas

> Source: [https://animejs.com/documentation/layout/common-auto-layout-gotchas](https://animejs.com/documentation/layout/common-auto-layout-gotchas)
> Breadcrumb: Layout → Common auto layout gotchas

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Common auto layout gotchas                                              
        

          
        While the layout API handles most animation scenarios automatically, some edge cases may produce unexpected results. Here's what to watch out for.

## Some elements are fading out unexpectedly

When using a `children` selector, elements that are descendants of matched children (but not targets themselves) will only get their state updated at 50% of the transition progress. To avoid hard cut between the two states, these elements are fading to opacity 0 then back to 1 under these conditions:

- The element is not explicitly targeted by the `children` selector

- The element's size has changed

- Its parent is a target and the parent's size has also changed

## Workaround

Either add the elements you want to keep visible to the `children` selectors array.

Or change the `swapAt` parameter to `opacity: 1`.

```js
const layout = createLayout('#root', {
  children: '.card', // Only .card elements are targets
  swapAt: { opacity: 1 } // This will make sure all descendants of .card are always visible during the transition.
});
```

## The root element position "jumps" during a transition

The position of the root element is never animated because it could cause other issues like having the root siblings jumping during a transition because they are not part of the layout.

The root dimensions can be animated because animating the width and height will affect other elements position (in most cases).

## Workaround

If you end up in a situation where the position of the root element of your layout needs to be animated, you'll have to use the parent element of the current root as the new root:

```js
// From this
const layout = createLayout('#container .grid'); // .grid position can't be animated.
// To this
const layout = createLayout('#container'); // Now .grid position can be animated
```

## My text is jumping during a layout transition

Animating `fontSize` alongside `width` or `height` can cause text to reflow mid-animation, especially in Firefox. Even if the start and end states have identical line breaks, intermediate frames may have a width/font-size ratio that triggers wrapping.

## Workaround

Use `white-space: nowrap` on the element if text wrapping isn't needed.

## Some elements inlined within the text are not moving

To prevents breaking text flow during a transition, elements adjacent to text nodes are excluded from position animations. 

```html
Some text inline element more text

```

## Workaround

Wrap text elements in span tags to allow text nodes to animate with the inlined elements.

```html
Some text inline element more text

```

## Transform shorthands are not working

The `enterFrom`, `leaveTo`, and `swapAt` parameters do not support CSS transform shorthands like `scale`, `rotate`, `x`, `y` etc.

```js
// Won't work
createLayout('#root', {
  enterFrom: { scale: 0 }
});
```

## Workaround

Use the `transform` property with a full transform string:

```js
// Use transform string
createLayout('#root', {
  enterFrom: { transform: 'scale(0)' }
});
```

## SVG elements are not animated

SVG elements and their descendants are excluded from layout animations. Only HTML elements are tracked and animated.

---

← Prev: **Layout properties** (`layout/layout-properties`) | Next: **Scope** (`scope`) →
