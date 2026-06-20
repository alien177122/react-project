---
{
  "order": 301,
  "section": "timeline",
  "path": "timeline-methods/resume",
  "slug": "timeline/timeline-methods/resume",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/resume",
  "title": "resume()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "resume()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "alternate()",
    "slug": "timeline/timeline-methods/alternate"
  },
  "next": {
    "title": "complete()",
    "slug": "timeline/timeline-methods/complete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# resume()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/resume](https://animejs.com/documentation/timeline/timeline-methods/resume)
> Breadcrumb: Timeline → Timeline methods → resume()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            resume()                                              
        

          
        Resumes the playback of a paused timeline in its current direction.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { creatTimeline, utils } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const alternateTimeline = () => tl.alternate();
const resumeTimeline = () => tl.resume();

$pauseButton.addEventListener('click', pauseTimeline);
$alternateButton.addEventListener('click', alternateTimeline);
$resumeButton.addEventListener('click', resumeTimeline);
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
    <button class="button">Resume</button>
  </fieldset>
</div>
```

---

← Prev: **alternate()** (`timeline/timeline-methods/alternate`) | Next: **complete()** (`timeline/timeline-methods/complete`) →
