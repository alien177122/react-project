---
{
  "order": 398,
  "section": "web-animation-api",
  "path": "api-differences-with-native-waapi/finished",
  "slug": "web-animation-api/api-differences-with-native-waapi/finished",
  "url": "https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished",
  "title": "finished",
  "breadcrumb": [
    "Web Animation API",
    "API differences with native WAAPI",
    "finished"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "easing",
    "slug": "web-animation-api/api-differences-with-native-waapi/easing"
  },
  "next": {
    "title": "waapi.convertEase()",
    "slug": "web-animation-api/waapi-convertease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# finished

> Source: [https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished)
> Breadcrumb: Web Animation API → API differences with native WAAPI → finished

Web Animation API

                          
              
                API differences              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            finished                                              
        

          
        `animation.finished` is replaced by the `animation.then()` method. It returns a `Promise` that resolves and execute a callback when the animation completes.

## Syntax comparison

## Anime.js

The `then()` method can be directly inlined like this:

```js
waapi.animate(target, {
  translate: '100px',
  duration: 500,
}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    translate: '100px',
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```

## WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');
const animations = [];

targets.forEach(($el, i) => {
  animations[i] = $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 500,
  });
});

Promise.all(
  animations
    .map((animation) => animation.finished)
    .then(() => console.log('completed'))
);
```

## Parameters

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the animation itself |

## Returns

`Promise`

## Code example (js)

```js
import { waapi, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = waapi.animate('.circle', {
  translate: '16rem',
  loop: 2,
  alternate: true,
});

animation.then(() => $value.textContent = 'fulfilled');
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

---

← Prev: **easing** (`web-animation-api/api-differences-with-native-waapi/easing`) | Next: **waapi.convertEase()** (`web-animation-api/waapi-convertease`) →
