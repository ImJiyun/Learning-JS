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
