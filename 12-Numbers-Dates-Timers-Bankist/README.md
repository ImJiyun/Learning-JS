# JavaScript Numbers and Math Operations

## Number Representation in JavaScript

- In JavaScript, all numbers are represented as **floating-point numbers (decimals)**.
- JavaScript has only **one** type for numbers.

```js
console.log(23 === 23.0); // true
```

- Internally, numbers are stored in **64-bit base-2 (binary)** format.
- Some numbers cannot be represented **accurately** in binary.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

## Converting Strings to Numbers

```js
console.log(Number('23')); // 23
console.log(+'23'); // 23 (Type coercion using `+`)
```

### Parsing Numbers from Strings

```js
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('e23')); // NaN (must start with a number)
console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5
```

- `Number.parseInt` and `Number.parseFloat` are **global functions**.

```js
console.log(parseFloat('2.5rem')); // 2.5
```

## Checking if a Value is NaN

```js
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20px')); // true
console.log(Number.isNaN(23 / 0)); // false (Infinity)
```

## Checking if a Value is a Number

```js
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20px')); // false
console.log(Number.isFinite(23 / 0)); // false (Infinity)
```

- `Infinity` is **not** `NaN`, nor is it a finite number.

```js
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23.12)); // false
```

---

## Math and Rounding

### Basic Math Operations

```js
console.log(Math.sqrt(25)); // 5
console.log(8 ** (1 / 3)); // 2 (Cube root)
```

### Maximum and Minimum Values

```js
console.log(Math.max(5, 10, 23, 11, 2)); // 23
console.log(Math.max(5, 10, '23', 11, 2)); // 23 (Type coercion)
console.log(Math.max(5, 10, '23px', 11, 2)); // NaN (Parsing fails)
console.log(Math.min(5, 10, 23, 11, 2)); // 2
```

### Constants

```js
console.log(Math.PI * Number.parseInt('10px') ** 2); // Area of a circle with radius 10px
```

### Random Numbers

```js
console.log(Math.random()); // Number between 0 and 1
console.log(Math.trunc(Math.random() * 6) + 1); // Random integer between 1 and 6
```

#### Generating a Random Integer in a Range

```js
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomInt(10, 20));
console.log(randomInt(0, 3));
```

### Rounding Integers

#### `trunc()`

- remove the decimal part

```js
console.log(Math.trunc(23.3)); // 23
```

#### `round()`

- round to the nearest integer
- does a type coercion

```js
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24
```

#### `ceil()`

- always round up
- does a type coercion

```js
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24
```

#### `floor()`

- always round down
- does a type coercion

```js
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23
```

#### Difference Between `trunc` and `floor`

```js
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24
```

### Rounding Decimals

- `toFixed()` **returns a string**, not a number.

```js
console.log((2.7).toFixed(0)); // "3"
console.log((2.7).toFixed(3)); // "2.700"
console.log((2.345).toFixed(2)); // "2.35"
console.log(+(2.345).toFixed(2)); // 2.35 (Converted to number)
```

---

## Remainder Operator `%`

- Returns the **remainder** of a division.

```js
console.log(5 % 2); // 1 (5 = 2 * 2 + 1)
console.log(8 % 3); // 2 (8 = 2 * 3 + 2)
```

### Checking for Even Numbers

```js
const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true
```

---

## Applying Even/Odd Background Colors in the DOM

```js
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
```
