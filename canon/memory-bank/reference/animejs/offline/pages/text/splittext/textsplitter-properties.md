---
{
  "order": 263,
  "section": "text",
  "path": "splittext/textsplitter-properties",
  "slug": "text/splittext/textsplitter-properties",
  "url": "https://animejs.com/documentation/text/splittext/textsplitter-properties",
  "title": "TextSplitter properties",
  "breadcrumb": [
    "Text",
    "splitText",
    "TextSplitter properties"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "refresh()",
    "slug": "text/splittext/textsplitter-methods/refresh"
  },
  "next": {
    "title": "scrambleText",
    "slug": "text/scrambletext"
  }
}
---

# TextSplitter properties

> Source: [https://animejs.com/documentation/text/splittext/textsplitter-properties](https://animejs.com/documentation/text/splittext/textsplitter-properties)
> Breadcrumb: Text → splitText → TextSplitter properties

Text

                          
              
                splitText              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            TextSplitter properties                                              
        

          
        Properties available on the `TextSplitter` instance returned by a `splitText()` function.

```js
const split = splitText(target, parameters);
      ┌──────┐
split.│lines │
split.│words ├─ Properties
split.│chars │
      └──────┘
```

| Name | Description |
| --- | --- |
| $target | Gets the split root element (`HTMLElement`) |
| html | Gets the html to split (`String`) |
| debug | Gets if the debug styles are visible or not (`Boolean`) |
| includeSpaces | Gets if the spaces should be wrapped within the text (`Boolean`) |
| accessible | Gets if the accessible clone element should be created (`Boolean`) |
| lines | Gets the lines elements (`Array`) |
| words | Gets the lines elements (`Array`) |
| chars | Gets the lines elements (`Array`) |
| lineTemplate | The line html template (`String`) |
| wordTemplate | The word html template (`String`) |
| charTemplate | The char html template (`String`) |

---

← Prev: **refresh()** (`text/splittext/textsplitter-methods/refresh`) | Next: **scrambleText** (`text/scrambletext`) →
