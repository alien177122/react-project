---
{
  "order": 364,
  "section": "utilities",
  "path": "pad-end",
  "slug": "utilities/pad-end",
  "url": "https://animejs.com/documentation/utilities/pad-end",
  "title": "padEnd()",
  "breadcrumb": [
    "Utilities",
    "padEnd()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "padStart()",
    "slug": "utilities/pad-start"
  },
  "next": {
    "title": "degToRad()",
    "slug": "utilities/deg-to-rad"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# padEnd()

> Source: [https://animejs.com/documentation/utilities/pad-end](https://animejs.com/documentation/utilities/pad-end)
> Breadcrumb: Utilities → padEnd()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            padEnd()                                              
        

          
        Pads a `Number` from the end with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padEnd(value, totalLength, padString);
const padderFunction = utils.padEnd(totalLength, padString);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

## Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the end:

```js
const padTo5WithZeros = utils.padEnd(5, '0');
padTo5WithZeros('123');  // '12300'
padTo5WithZeros(78);     // '78000'
padTo5WithZeros('1234'); // '12340'

const roundAndPadEnd = utils.round(0).padEnd(5, '0'); // Round to nearest integer then pad to 5 characters
roundAndPadEnd(123.456); // '12300'
roundAndPadEnd(7.8);     // '80000'
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1,
  modifier: utils.round(3).padEnd(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

## Code example (html)

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

← Prev: **padStart()** (`utilities/pad-start`) | Next: **degToRad()** (`utilities/deg-to-rad`) →
