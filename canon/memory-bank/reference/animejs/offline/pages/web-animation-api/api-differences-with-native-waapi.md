---
{
  "order": 395,
  "section": "web-animation-api",
  "path": "api-differences-with-native-waapi",
  "slug": "web-animation-api/api-differences-with-native-waapi",
  "url": "https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi",
  "title": "API differences with native WAAPI",
  "breadcrumb": [
    "Web Animation API",
    "API differences with native WAAPI"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Spring and custom easings",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings"
  },
  "next": {
    "title": "iterations",
    "slug": "web-animation-api/api-differences-with-native-waapi/iterations"
  }
}
---

# API differences with native WAAPI

> Source: [https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi)
> Breadcrumb: Web Animation API → API differences with native WAAPI

Web Animation API

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            API differences with native WAAPI                                              
        

          
        This chapter covers all major differences between the native Web Animation API `element.animate()` syntax and Anime.js `waapi.animate(element)` syntax.

## Anime.js

```js
waapi.animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
┌──────────────────┐
│ x: 100,          │
│ y: 50,           ├─ Keyframes Values
│ opacity: .5,     │
└──────────────────┘
┌──────────────────┐
│ loop: 3,         │
│ alternate: true, ├─ Playback Settings
│ ease: 'out',     │
└──────────────────┘
});
```

## WAAPI

```js
const $square = document.querySelector('.square');

┌────────────┐
│ $square    ├─ Targets
└────────────┘
.animate({
┌──────────────────────────┐
│ translate: '100px 50px', ├─ Keyframes Values
│ opacity: .5,             │
└──────────────────────────┘
}, {
┌──────────────────────────┐
│ iterations: 4,           │
│ direction: 'alternate',  ├─ Playback Settings
│ easing: 'ease-out',      │
└──────────────────────────┘
});
```

---

← Prev: **Spring and custom easings** (`web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings`) | Next: **iterations** (`web-animation-api/api-differences-with-native-waapi/iterations`) →
