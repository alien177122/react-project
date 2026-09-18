---
{
  "order": 365,
  "section": "utilities",
  "path": "pad-start",
  "slug": "utilities/pad-start",
  "url": "https://animejs.com/documentation/utilities/pad-start",
  "title": "padStart()",
  "breadcrumb": [
    "Utilities",
    "padStart()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "roundPad()",
    "slug": "utilities/round-pad"
  },
  "next": {
    "title": "padEnd()",
    "slug": "utilities/pad-end"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# padStart()

> Source: [https://animejs.com/documentation/utilities/pad-start](https://animejs.com/documentation/utilities/pad-start)
> Breadcrumb: Utilities → padStart()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            padStart()                                              
        

          
        Pads a `Number` from the start with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padStart(value, totalLength, padString);
const padderFunction = utils.padStart(totalLength, padString);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

## Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the start:

```js
const padTo5WithZeros = utils.padStart(5, '0');
padTo5WithZeros('123');  // '00123'
padTo5WithZeros(78);     // '00078'
padTo5WithZeros('1234'); // '01234'

const roundAndPad = utils.round(2).padStart(5, '0'); // Round to 2 decimal places then pad to 5 characters
roundAndPad(12.345);  // '12.35'
roundAndPad(7.8);     // '07.80'
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 10000,
  modifier: utils.round(0).padStart(6, '-'),
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

← Prev: **roundPad()** (`utilities/round-pad`) | Next: **padEnd()** (`utilities/pad-end`) →
