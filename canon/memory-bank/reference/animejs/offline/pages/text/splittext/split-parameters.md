---
{
  "order": 255,
  "section": "text",
  "path": "splittext/split-parameters",
  "slug": "text/splittext/split-parameters",
  "url": "https://animejs.com/documentation/text/splittext/split-parameters",
  "title": "Split parameters",
  "breadcrumb": [
    "Text",
    "splitText",
    "Split parameters"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "accessible",
    "slug": "text/splittext/textsplitter-settings/accessible"
  },
  "next": {
    "title": "class",
    "slug": "text/splittext/split-parameters/class"
  }
}
---

# Split parameters

> Source: [https://animejs.com/documentation/text/splittext/split-parameters](https://animejs.com/documentation/text/splittext/split-parameters)
> Breadcrumb: Text → splitText → Split parameters

Text

                          
              
                splitText              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            Split parameters                                              
        

          
        Defines the CSS class, wrap behavior, or clone type of a split.

Parameters are configured by passing an object to the `lines`, `words`, and `chars` properties.

```js
splitText(target, {
  lines: true,
  words: {
  ┌──────────────────────┐
  │ wrap: 'clip',        │
  │ class: 'split-word', ├─ Split Parameters
  │ clone: true          │
  └──────────────────────┘
  },
  includeSpaces: true,
  debug: true,
});
```

---

← Prev: **accessible** (`text/splittext/textsplitter-settings/accessible`) | Next: **class** (`text/splittext/split-parameters/class`) →
