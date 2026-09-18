---
{
  "order": 235,
  "section": "text",
  "path": "scrambletext/scrambletext-callbacks",
  "slug": "text/scrambletext/scrambletext-callbacks",
  "url": "https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks",
  "title": "scrambleText callbacks",
  "breadcrumb": [
    "Text",
    "scrambleText",
    "scrambleText callbacks"
  ],
  "since": "Since 4.4.0",
  "prev": {
    "title": "seed",
    "slug": "text/scrambletext/scrambletext-parameters/seed"
  },
  "next": {
    "title": "onChange",
    "slug": "text/scrambletext/scrambletext-callbacks/onchange"
  }
}
---

# scrambleText callbacks

> Source: [https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks)
> Breadcrumb: Text → scrambleText → scrambleText callbacks

Text

                          
              
                scrambleText              
                      

          
                        Since 4.4.0
                      

        
                

## 
          
            scrambleText callbacks                                              
        

          
        Execute functions during the scramble text animation.

Callbacks `Function` are specified directly in the `scrambleText()` parameters `Object`.

```js
animate(target, {
  innerHTML: scrambleText({
    text: 'Hello World',
    chars: 'uppercase',
  ┌────────────────────┐
  │ onChange: () => {} ├─ Callbacks
  └────────────────────┘
  }),
});
```

---

← Prev: **seed** (`text/scrambletext/scrambletext-parameters/seed`) | Next: **onChange** (`text/scrambletext/scrambletext-callbacks/onchange`) →
