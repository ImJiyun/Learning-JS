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

### Selecting, creating, deleting elements

