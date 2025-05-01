## Advanced DOM

### DOM

- Interface between JavaScript and browser
- Allows us to make JavaScript interact with the browser
- We can write JavaScript to create, modify and delete HTML elements; set styles, classes and attributes; and listen and respond to events;
- DOM tree is generated from an HTML document, which we can then interact with;
- DOM is a very complex API that contains lots of methods and properties to interact wtih the DOM tree
  - `querySelector()`
  - `addEventListener()`
  - `createElement()`
  - `innerHTML`
  - `textContent`
  - `children`

### HOW the DOM API is organized behind the scenes

- Every single node in the DOM tree is a type of `node`
- Each node is represented in JavaScript by an object, which can get access to special node methods and properties (`textContet`, `childNodes`, `parentNode`, `cloneNode()`)
- Types of Child Nodes
  - The DOM consists of different types of nodes, including:
  - `Element` Nodes → Represent HTML elements (`<div>`, `<p>`, `<h1>`, etc.)
    - `Element` node gives HTML access to properties like `innerHTML`, `classList`, `parentElement`; methods like `append()`, `remove()`, `insertAdjacentHTML()`, `querySelector()`, `closest()`, `matches()`, `scrollIntoView()`, `setAttribute()`
    - Child types of Element nodes
      - `HTMLElement` : base class for all HTML element nodes
      - Each HTML tag corresponds to a specific subclass of `HTMLElement` (`HTMLButtonElement`, `HTMLParagraphElement`, `HTMLDivElement`, `HTMLImageElement`, etc)
  - `Text` Nodes → Contain textual content inside elements.
  - `Comment` Nodes → Represent comments (`<!-- This is a comment -->`).
  - `Document` Node → Represents the entire document (document)
    - It has methods like `querySelector()`, `createElement()`, `getElementById()`

```scss
Node
 ├── Document (represents the entire document)
 ├── Element (represents HTML/XML elements)
 │    ├── HTMLElement (for HTML elements like <div>, <p>, <img>)
 │    └── SVGElement (for SVG elements like <svg>, <circle>)
 ├── Text (represents text inside elements)
 ├── Comment (represents comments)

```

- Inheritance of methods and properties : Any `HTMLElement` will have access to `addEventListener()`, `cloneNode()`, or `closest()` methods
- `EventTarget` is a parent both `node` and `window`
  - it has methods like `addEventListener()`, `removeEventListener()`
  - Thanks to inheritance, all node types can listen to the Event
  - NOTE : We do NOT manually create an eventTarget object, it's just an abstract type

### Selecting, Creating, and Deleting Elements

#### Select elements

1. **`querySelector()`**
   ```js
   const header = document.querySelector('.header'); // selects the first element with the class 'header'
   ```
   - This method returns the **first** element that matches the specified CSS selector.
   - If no element matches, it returns `null`. It allows you to select elements using classes, IDs, or other valid CSS selectors.
2. **`querySelectorAll()`**
   ```js
   const allSections = document.querySelectorAll('.section'); // selects all elements with the class 'section'
   ```
   - This method returns a **NodeList** of all matching elements, not just the first one.
   - A `NodeList` is similar to an array, but it is not exactly the same. It allows you to select multiple elements that match a given CSS selector.
3. **`getElementById()`**

   ```js
   document.getElementById('section--1'); // selects the element with the id 'section--1'
   ```

   - This method selects an element by its `id` attribute. It returns the element if found, or `null` if no element with the specified ID exists. It is faster than `querySelector()` for selecting by ID.

4. **`getElementsByTagName()`**
   ```js
   const allButtons = document.getElementsByTagName('button'); // selects all button elements
   ```
   - This method returns an **HTMLCollection** of all elements with the specified tag name.
   - Unlike `NodeList`, **HTMLCollection** is live, meaning it updates automatically when elements are added or removed from the DOM.
5. **`getElementsByClassName()`**
   ```js
   document.getElementsByClassName('btn'); // selects all elements with the class 'btn'
   ```
   - This method returns an **HTMLCollection** of all elements with the specified class name.
   - Like `getElementsByTagName()`, the resulting collection is live, and it reflects any changes in the DOM.

#### Create elements

We can dynamically create new elements using JavaScript and add them to the DOM:

```js
const newDiv = document.createElement('div'); // creates a new <div> element
newDiv.classList.add('new-class'); // add class to the new element
newDiv.textContent = 'This is a new div!'; // set the text content
document.body.appendChild(newDiv); // appends the new element to the body
```

- `createElement()` creates a new element of the specified type (e.g., `<div>`, `<p>`, etc.).
- We can manipulate this new element before adding it to the DOM using methods like `classList.add()` to add classes or `textContent` to set text.

#### Delete elements

To delete an element from the DOM, you can use the `remove()` method:

```js
const element = document.querySelector('.element-to-remove');
element.remove(); // removes the selected element from the DOM
```

Alternatively, if we need to remove an element by reference from its parent:

```js
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');
parent.removeChild(child); // removes the child from its parent
```

- The `remove()` method deletes the element itself, while `removeChild()` deletes a specific child element from its parent.

### Styles, Attributes, and Classes

#### Styles

- We can manually set style with `style` property

```js
message.style.backgroundColor = '#37383d'; // set inline style
message.style.width = '120%';
```

`element.style.property` vs `getComputedStyle(element).property`

```js
console.log(message.style.color); // returns nothing
console.log(message.style.backgroundColor); // rgb(55, 56, 61)
console.log(message.style.height); // returns nothing

console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 112px
```

1. `element.style.property`

- This accesses the **inline styles** set directly on the element via JavaScript or the `style` attribute in HTML.
- If no inline style is set for the property, it returns an **empty string** (`""`), even if the element is styled via CSS.

2. `getComputedStyle(element).property`

- This retrieves the **final computed style** of the element, including styles applied via CSS, external stylesheets, and inherited styles.
- It returns the **actual rendered value**, even if no inline style is set.

---

We can dynamically change a CSS custom property

```js
document.documentElement.style.setProperty('--color-primary', 'orangered');
```

- `document.documentElement` : refers to the root element of the document, typically the `<html>` element in an HTML document

#### Attributes

- JavaScript dynamically maps certain attributes of an HTML element to corresponding properties on the DOM object
- For standard attributes (like `id`, `class`, `href`, `src`, `value`), JavaScript automatically creates corresponding properties on the element object

1. Standard Attribute

```html
<img
  src="img/logo.png"
  alt="Bankist logo"
  class="nav__logo"
  id="logo"
  designer="jiyun"
  data-version-number="3"
/>
```

```js
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
console.log(logo.className); // nav__logo

console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
console.log(logo.getAttribute('src')); // relative path (img/logo.png)
```

- `logo.alt` is an auto-created property that reflects the img's alt

- `element.src`
  - `logo.src` returns the absolute URL that the browser has resolved.
  - If the src attribute is set with a relative path (e.g., "`./images/logo.png`" or "`/assets/logo.png`"), the browser converts it into an absolute URL.
- `element.getAttribute('src')`
  - `logo.getAttribute('src')` returns the original value as written in the HTML.
  - If the src attribute is set as "`./images/logo.png`", it will return exactly that string without converting it to an absolute path.

2. Non-Standard Attribute

```html
<img
  src="img/logo.png"
  alt="Bankist logo"
  class="nav__logo"
  id="logo"
  designer="jiyun"
  data-version-number="3"
/>
```

```js
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // jiyun
```

`designer` is a custom attribute, so JavaScript does NOT automatically create `logo.designer`. We must use `getAttribute()` and `setAttribute()`

- `getAttribute()` method retrieves any attribute defined in the HTML, including custom attributes.
  - If it doesn't exist in the HTML, it returns null. If it exists, it returns the exact value written in the HTML.

3. Data Attribute

```js
console.log(logo.dataset.versionNumber);
```

### Event Propagation : Bubbling and Capturing

```html
<body>
  <section>
    <p>A paragraph with a <a>link</a></p>
  </section>
</body>
```

When a user interacts with a webpage, such as clicking a link, the browser creates an event that doesn't start directly at the target element. Instead, it originates from the root of the document and travels through a process called event propagation, which occurs in three phases:

1. **Capturing Phase**:
   The event travels downward from the document root toward the target element.
2. **Target Phase**:
   When the event reaches the target element (e.g., the `<a>` tag), it triggers any event listeners attached directly to it.
3. **Bubbling Phase**:
   After reaching the target, the event bubbles upward through the ancestor elements, back to the document root.

- Why is it so important?

  - It's as if the event happens on every parent element too.
  - For example, adding a click event listener to the `<section>` would still detect a click on the link inside it.
  - This allows for event delegation, where one listener can handle events from multiple child elements.

- NOTE
  - By default, events are handled during the **target and bubbling phases**.
  - However, you can set listeners to trigger during the capturing phase by passing { capture: true } as an option.
  - Not all event types support bubbling and capturing.

### Example

#### HTML Structure

```html
<nav class="nav">
  <ul class="nav__links">
    <li class="nav__item">
      <a class="nav__link" href="#">Features</a>
    </li>
  </ul>
</nav>
```

- `.nav` → outermost parent element
- `.nav__links` → intermediate container
- `.nav__link` → the actual clickable link

#### JavaScript

##### 1. Event Listener on `.nav__link`

```javascript
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // change background color of link
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // e.stopPropagation(); // uncomment to stop bubbling
});
```

- This event listener is attached to the actual link (`<a>` tag).
- `e.target` is the element where the event _actually occurred_ (in this case, the `<a>` element).
- `e.currentTarget` is the element to which the event handler is attached — here, the same as `this`.
- The handler is executed during the **target phase**.
- `stopPropagation()` can stop the event from bubbling up to parent elements.

##### 2. Event Listener on `.nav__links`

```javascript
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // change background color of container
  console.log('CONTAINER', e.target, e.currentTarget);
});
```

- This event listener is on the `<ul>` container.
- Even though the user clicked on the `<a>` tag, the event bubbles up to this element.
- `e.target` is still the `<a>` tag (origin of the event).
- `e.currentTarget` is the `<ul>` element — where this handler is attached.
- This listener runs during the **bubbling phase**.

##### 3. Event Listener on `.nav`

```javascript
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // change background of <nav>
  console.log('NAV', e.target, e.currentTarget);
});
```

- Similar to the previous one, this listener is triggered during **bubbling**.
- `e.target` is the original element clicked (`<a>`), and `e.currentTarget` is `<nav>`.

#### Event Flow (When the `<a>` is clicked)

1. The event is created at the root (document) and flows _down_ the DOM tree in the **capturing phase**:  
   `document` → `nav` → `ul` → `li` → `a`
2. When it reaches the target element (`<a>`), the **target phase** begins.
3. Then, the event flows back _up_ the DOM tree in the **bubbling phase**:  
   `a` → `li` → `ul` → `nav` → `document`

#### Summary

| Element       | Why it listens      | Phase          |
| ------------- | ------------------- | -------------- |
| `.nav__link`  | It's the **target** | Target phase   |
| `.nav__links` | It's a **parent**   | Bubbling phase |
| `.nav`        | It's a **parent**   | Bubbling phase |

---
