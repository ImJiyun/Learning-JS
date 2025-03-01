## DOM and Events

### Listening Events

- Event : something that happens on the page
  - mouse click, mouse moving, key press
- Listening Events
  1. Select the element where the event should happen
  2. use `addEventListener`

```javascript
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); // convert string to number

  // assume there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  }
});
```

#### `textContent` property

- It modifies only the text inside an element, not the HTML structure
- cf) innerHTML can modify the HTML structure

```javascript
console.log(document.querySelector('.number')); // <div class="number">?</div>
console.log(document.querySelector('.number').textContent); // ?
```

- The first line logs `<div class="number">?</div>` to the console
- The second on logs `?` to the console

```javascript
const secretNumber = Math.trunc(Math.random() * 20) + 1;

document.querySelector('.number').textContent = secretNumber;
```

- It changes the text `?` to `secretNumber`

#### `value` property

- a property used to get or set the value of an `<input>`,` <textarea>`, or `<select>` element.
- Differences with `textContent` property
  - `textContent` property works with `<p>`, `<div>`, `<span>`, and so on
  - `value` property with `<input>`, `<textarea>`, `<select>`
- `value` property always returns a `string` type

```javascript
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
```

### Manipulating style

#### `style` property

- It allows direct access to inline style
- After `.style`, specify the name of property that we wanna change

```javascript
// can access css style with style property
// after style property, specify the name of property that we want to change (write it in camelCase)
document.querySelector('body').style.backgroundColor = '#60b347'; // change background color
document.querySelector('.number').style.width = '30rem'; // change width of number
// whenever mainpulate css style, we need to use string
```

- CSS property names must be written in camelCase (e.g., `backgroundColor`, not `background-color`).
- Values must be strings, even if they are numeric (`'30rem'`, not `30rem`).
