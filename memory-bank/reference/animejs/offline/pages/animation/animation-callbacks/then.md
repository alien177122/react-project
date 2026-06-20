---
{
  "order": 28,
  "section": "animation",
  "path": "animation-callbacks/then",
  "slug": "animation/animation-callbacks/then",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/then",
  "title": "then()",
  "breadcrumb": [
    "Animation",
    "Animation callbacks",
    "then()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onPause",
    "slug": "animation/animation-callbacks/onpause"
  },
  "next": {
    "title": "Animation methods",
    "slug": "animation/animation-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# then()

> Source: [https://animejs.com/documentation/animation/animation-callbacks/then](https://animejs.com/documentation/animation/animation-callbacks/then)
> Breadcrumb: Animation → Animation callbacks → then()

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            then()                                              
        

          
        Returns a `Promise` that resolves and execute a callback when the animation completes.

The `then()` method can be directly inlined like this:

```js
animate(target, {x: 100, duration: 500}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    x: 100,
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```

## Parameters

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the animation itself |

## Returns

`Promise`

## Code example (js)

```js
import { animate } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
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

← Prev: **onPause** (`animation/animation-callbacks/onpause`) | Next: **Animation methods** (`animation/animation-methods`) →
