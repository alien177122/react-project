---
{
  "order": 226,
  "section": "scope",
  "path": "scope-parameters/mediaqueries",
  "slug": "scope/scope-parameters/mediaqueries",
  "url": "https://animejs.com/documentation/scope/scope-parameters/mediaqueries",
  "title": "mediaQueries",
  "breadcrumb": [
    "Scope",
    "Scope parameters",
    "mediaQueries"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "defaults",
    "slug": "scope/scope-parameters/defaults"
  },
  "next": {
    "title": "Scope methods",
    "slug": "scope/scope-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# mediaQueries

> Source: [https://animejs.com/documentation/scope/scope-parameters/mediaqueries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries)
> Breadcrumb: Scope → Scope parameters → mediaQueries

Scope

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            mediaQueries                                              
        

          
        Defines the media queries to match for conditionally refreshing the `Scope` when one of their matches state changes.

Media queries matching states are accessible via the scope `matches` property.

## Accepts

An `Object` where

- `key` is an arbitrary name `String` for the media query.

- `Value` is the media query definition `String`.

## Code example (js)

```js
import { createScope, animate } from 'animejs';

createScope({
  mediaQueries: {
    isSmall: '(max-width: 100px)',
    isMedium: '(min-width: 101px) and (max-width: 200px)',
    isLarge: '(min-width: 201px)',
    reduceMotion: '(prefers-reduced-motion)',
  }
})
.add(self => {

  const { isSmall, isMedium, isLarge, reduceMotion } = self.matches;
    
  utils.set('.square', { scale: isMedium ? .75 : isLarge ? 1 : .5 });
    
  animate('.square', {
    x: isSmall ? 0 : ['-35vw', '35vw'],
    y: isSmall ? ['-40vh', '40vh'] : 0,
    rotate: 360,
    loop: true,
    alternate: true,
    duration: reduceMotion ? 0 : isSmall ? 750 : 1250
  });

});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

← Prev: **defaults** (`scope/scope-parameters/defaults`) | Next: **Scope methods** (`scope/scope-methods`) →
