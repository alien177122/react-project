---
{
  "order": 371,
  "section": "utilities",
  "path": "round-pad",
  "slug": "utilities/round-pad",
  "url": "https://animejs.com/documentation/utilities/round-pad",
  "title": "roundPad()",
  "breadcrumb": [
    "Utilities",
    "roundPad()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "damp()",
    "slug": "utilities/damp"
  },
  "next": {
    "title": "padStart()",
    "slug": "utilities/pad-start"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# roundPad()

> Source: [https://animejs.com/documentation/utilities/round-pad](https://animejs.com/documentation/utilities/round-pad)
> Breadcrumb: Utilities → roundPad()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            roundPad()                                              
        

          
        Rounds a value to a specified decimal length, pads with zeros if needed, and returns the result as a string, or creates a rounding and padding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedPaddedValue = utils.roundPad(value, decimalLength);
const roundPadderFunction = utils.roundPad(decimalLength);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` / `String` |
| decimalLength | `Number` |

## Returns

A `String` if a value is provided, otherwise a chain-able utility `Function` to round and pad numbers to the specified decimal length:

```js
const roundPadTo2Decimals = utils.roundPad(2);
roundPadTo2Decimals(90.12345);  // '90.12'
roundPadTo2Decimals(120);       // '120.00'
roundPadTo2Decimals(15.9);      // '15.90'

const snapAndRoundPad = utils.snap(50).roundPad(2); // Snap to nearest 50 then roundPad to 2 decimal places
snapAndRoundPad(123.456); // '100.00'
snapAndRoundPad(175.789); // '200.00'
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: '8.1',
  modifier: utils.roundPad(3),
  duration: 10000,
  ease: 'linear',
});
```

## Code example (html)

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0.000</span>
  </pre>
</div>
```

---

← Prev: **damp()** (`utilities/damp`) | Next: **padStart()** (`utilities/pad-start`) →
