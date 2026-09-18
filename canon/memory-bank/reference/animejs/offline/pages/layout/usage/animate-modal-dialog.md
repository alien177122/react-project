---
{
  "order": 207,
  "section": "layout",
  "path": "usage/animate-modal-dialog",
  "slug": "layout/usage/animate-modal-dialog",
  "url": "https://animejs.com/documentation/layout/usage/animate-modal-dialog",
  "title": "Modal dialog animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Modal dialog animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Swap parent animation",
    "slug": "layout/usage/swap-parent-animation"
  },
  "next": {
    "title": "Settings",
    "slug": "layout/layout-settings"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Modal dialog animation

> Source: [https://animejs.com/documentation/layout/usage/animate-modal-dialog](https://animejs.com/documentation/layout/usage/animate-modal-dialog)
> Breadcrumb: Layout → Usage → Modal dialog animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Modal dialog animation                                              
        

          
        Easily create seamless transitions between a clickable element and its expanded version inside a modal.

You can even animate from elements outside of the specified root by using a combination of layout ids and specifying children.

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const buttons = utils.$('button');

// Create demo dialog and append it to the body
const $dialog = document.createElement('dialog');
$dialog.id = 'layout-dialog';
document.body.appendChild($dialog);

// Create the modal layout by setting the dialog as the root
// Since the elements are not yet part of the modal root, it's necessary to specify all animated children
// to tell the layout what to look for during an update
const modalLayout = createLayout($dialog, {
  children: ['.item', 'h2', 'h3', 'p'],
  properties: ['--overlay-alpha'],
});

const closeModal = (e) => {
  let $item;
  modalLayout.update(({ root }) => {
    $dialog.close();
    $item = buttons.find(item => item.classList.contains('is-open'));
    $item.classList.remove('is-open'); // Makes the clicked element visible again
    $item.focus(); // Focus to the closed element to preserve the keyboard navigation flow
  });
};

const openModal = e => {
  const $target = e.target;
  const $item = $target.closest('.item');
  const $clone = $item.cloneNode(true);
  $dialog.innerHTML = ''; // Make sure old clones are removed from the modal before adding a new one
  $dialog.appendChild($clone); // Append the clicked element clone to the modal
  modalLayout.update(() => {
    $dialog.showModal(); // Open the modal
    $item.classList.add('is-open'); // Hide the clicked element
  }, {
    duration: $item.dataset.duration // Custom duration depending of the button clicked
  });
}

buttons.forEach($button => $button.addEventListener('click', openModal));
$dialog.addEventListener('cancel', closeModal);
$dialog.addEventListener('click', closeModal);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <button data-layout-id="A" data-duration="500" class="button item col">
      <h2 data-layout-id="A-title">Item A</h2>
      <h3 data-layout-id="A-duration">(500ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="B" data-duration="1000" class="button item col">
      <h2 data-layout-id="B-title">Item B</h2>
      <h3 data-layout-id="B-duration">(1000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="C" data-duration="2000" class="button item col">
      <h2 data-layout-id="C-title">Item C</h2>
      <h3 data-layout-id="B-duration">(2000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
  </div>
</div>
```

## Code example (css)

```css
#layout-dialog {
  --overlay-alpha: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  max-width: 100%;
  max-height: 100%;
  border: none;
  background: transparent;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--hex-black-1), transparent var(--overlay-alpha));
}

#layout-dialog[open] {
  --overlay-alpha: 40%;
  pointer-events: auto;
}

#layout-dialog::backdrop {
  background: transparent;
}

#layout-dialog .item {
  position: relative;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 22rem;
  height: 14.5rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--hex-green-6);
  font-size: 1rem;
  color: var(--hex-green-6);
  background-color: var(--hex-green-1);
}

#layout-dialog[open] .item {
  visibility: visible;
}

#layout-dialog .item h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  will-change: font-size;
  text-wrap: nowrap;
}

#layout-dialog .item h3 {
  position: absolute;
  top: 2.9rem;
  right: 2rem;
}

#layout-usage-animate-modal-dialog .item {
  cursor: pointer;
}

#layout-usage-animate-modal-dialog .item.is-open {
  visibility: hidden;
}

#layout-usage-animate-modal-dialog .item p {
  text-align: left;
  display: none;
}

#layout-dialog .item p {
  padding-top: 1rem;
  border-top: 1px solid currentColor;  
}

#layout-dialog[open] .item p {
  display: block;
}
```

---

← Prev: **Swap parent animation** (`layout/usage/swap-parent-animation`) | Next: **Settings** (`layout/layout-settings`) →
