---
{
  "order": 401,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api",
  "slug": "web-animation-api/improvements-to-the-web-animation-api",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api",
  "title": "Improvements to the Web Animation API",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Hardware-accelerated animations",
    "slug": "web-animation-api/hardware-accelerated-animations"
  },
  "next": {
    "title": "Sensible defaults",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/sensible-defaults"
  }
}
---

# Improvements to the Web Animation API

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API

Web Animation API

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Improvements to the Web Animation API                                              
        

          
        The `waapi.animate()` method adds lots of quality of life improvements and greatly improves the overall experience of using WAAPI.

On top of all the improvements to the API listed in this chapter, it is also possible to link WAAPI animations to Anime.js built-in ScrollObserver

```js
waapi.animate('.square', {
  translate: '100px',
  autoplay: onScroll()
});
```

And use a Scope for easy media queries handling and component cleanup:

```js
createScope({
  mediaQueries: { reduceMotion: '(prefers-reduced-motion)' }
})
.add(({ matches }) => {
  const { reduceMotion } = matches;
  waapi.animate('.square', {
    transform: reduceMotion ? ['100px', '100px'] : '100px',
    opacity: [0, 1],
  });
});
```

## Related

- [ScrollObserver](https://animejs.com/documentation/events/onscroll)
- [Scope](https://animejs.com/documentation/scope)

---

← Prev: **Hardware-accelerated animations** (`web-animation-api/hardware-accelerated-animations`) | Next: **Sensible defaults** (`web-animation-api/improvements-to-the-web-animation-api/sensible-defaults`) →
