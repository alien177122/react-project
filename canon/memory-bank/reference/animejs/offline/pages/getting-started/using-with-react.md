---
{
  "order": 184,
  "section": "getting-started",
  "path": "using-with-react",
  "slug": "getting-started/using-with-react",
  "url": "https://animejs.com/documentation/getting-started/using-with-react",
  "title": "Using with React",
  "breadcrumb": [
    "Getting started",
    "Using with React"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Using with vanilla JS",
    "slug": "getting-started/using-with-vanilla-js"
  },
  "next": {
    "title": "Imports",
    "slug": "getting-started/imports-old"
  },
  "code_languages": [
    "js",
    "css"
  ]
}
---

# Using with React

> Source: [https://animejs.com/documentation/getting-started/using-with-react](https://animejs.com/documentation/getting-started/using-with-react)
> Breadcrumb: Getting started → Using with React

Getting started

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Using with React                                              
        

          
        Anime.js can be used with React by combining React's `useEffect()` and Anime.js `createScope()` methods.

The following example showcase how to uses Anime.js methods straight into React code.

## Code example (js)

```js
import { animate, createScope, spring, createDraggable } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const root = useRef(null);
  const scope = useRef(null);
  const [ rotations, setRotations ] = useState(0);

  useEffect(() => {
  
    scope.current = createScope({ root }).add( self => {
    
      // Every anime.js instance declared here is now scoped to <div ref={root}>

      // Created a bounce animation loop
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        loop: true,
        loopDelay: 250,
      });
      
      // Make the logo draggable around its center
      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: .7 })
      });

      // Register function methods to be used outside the useEffect
      self.add('rotateLogo', (i) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });

    });

    // Properly cleanup all anime.js instances declared inside the scope
    return () => scope.current.revert()

  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const newRotations = prev + 1;
      // Animate logo rotation on click using the method declared inside the scope
      scope.current.methods.rotateLogo(newRotations);
      return newRotations;
    });
  };

  return (
    <div ref={root}>
      <div className="large centered row">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="medium row">
        <fieldset className="controls">
        <button onClick={handleClick}>rotations: {rotations}</button>
        </fieldset>
      </div>
    </div>
  )
}

export default App;
```

## Code example (css)

```css
.logo.react {
  width: 150%;
  height: 150%;
}
```

---

← Prev: **Using with vanilla JS** (`getting-started/using-with-vanilla-js`) | Next: **Imports** (`getting-started/imports-old`) →
