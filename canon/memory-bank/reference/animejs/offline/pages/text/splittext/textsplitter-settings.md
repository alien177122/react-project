---
{
  "order": 264,
  "section": "text",
  "path": "splittext/textsplitter-settings",
  "slug": "text/splittext/textsplitter-settings",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-settings",
  "title": "TextSplitter settings",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter settings"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "splitText",
    "slug": "text/splittext"
  },
  "next": {
    "title": "lines",
    "slug": "text/splittext/textsplitter-settings/lines"
  }
}
---

# TextSplitter settings

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-settings](https://animejs.com/documentation/text/splittext/textsplitter-settings)
> Breadcrumb: Text → splitText → TextSplitter settings

Text

                          
              
                splitText              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            TextSplitter settings                                              
        

          
        Configures how text within the target HTML element should be split.

```js
splitText(target, {
┌────────────────────────┐
│ lines: true,           ├─ Settings
│ words: {               │
│   wrap: 'clip',        │
│   class: 'split-word', │
│   clone: true          │
│ },                     │
│ includeSpaces: true,   │
│ debug: true,           │
└────────────────────────┘
});
```

---

← Prev: **splitText** (`text/splittext`) | Next: **lines** (`text/splittext/textsplitter-settings/lines`) →
