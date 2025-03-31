## JavaScript Basics

### What is JavaScript?

JavaScript is a **high-level, object-oriented, multi-paradigm** programming language.

- **Programming Language**: Used to instruct computers to perform tasks.
- **High-Level**: Abstracts complex details like memory management.
- **Object-Oriented**: Uses objects to store most kinds of data.
- **Multi-Paradigm**: Supports different programming styles (procedural, object-oriented, and functional programming).

### ECMAScript (ES)

- **ES6 (ECMAScript 2015)**: The biggest update to JavaScript.
- Versions after ES6 are referred to as **Modern JavaScript**.

---

### Variables

#### Declaring Variables

Variables are **containers** for storing values. They should have descriptive names.

```js
let firstName = "Jonas";
```

- **Camel case** (`myFirstJob`) is convention.
- Constants should be written in **uppercase** (`PI = 3.14`).
- Variable names **cannot** start with numbers or use reserved keywords.

#### `let`, `const`, and `var`

- `let`: Mutable, can be reassigned.
- `const`: Immutable, cannot be reassigned.
- `var`: Outdated, has function scope instead of block scope.

---

### Data Types

JavaScript has **dynamic typing**: variable types are determined automatically.

#### Primitive Data Types

1. **Number**: Floating-point numbers (e.g., `23`, `3.14`).
2. **String**: Text values (e.g., `"Hello"`).
3. **Boolean**: Logical values (`true` or `false`).
4. **Undefined**: A variable that has been declared but not assigned a value.
5. **Null**: Represents an empty or unknown value.
6. **Symbol**: A unique and immutable value.
7. **BigInt**: Handles numbers larger than `Number.MAX_SAFE_INTEGER`.

```js
let age = 30; // Number
let name = "Jonas"; // String
let isMarried = false; // Boolean
let year; // Undefined
let nothing = null; // Null
```

#### Type Conversion & Coercion

- **Type Conversion**: Explicitly converting types.
  ```js
  console.log(Number("1991") + 18); // 2009
  console.log(String(23)); // "23"
  ```
- **Type Coercion**: Implicit conversion by JavaScript.
  ```js
  console.log("23" - "10" - 3); // 10
  console.log("21" * "3"); // 63
  ```

---

### Operators

#### Arithmetic Operators

```js
const now = 2037;
const ageJonas = now - 1991;
console.log(ageJonas * 2, ageJonas / 2, 2 ** 3);
```

#### Assignment Operators

```js
let x = 10 + 5; // 15
x += 10; // 25
x *= 4; // 100
```

#### Comparison Operators

```js
console.log(18 === "18"); // false (strict equality)
console.log(18 == "18"); // true (loose equality)
```

---

### Control Structures

#### If-Else Statements

```js
if (age >= 18) {
  console.log("You can drive");
} else {
  console.log("Wait a few more years");
}
```

#### Switch Statement

```js
switch (day) {
  case "monday":
    console.log("Plan course structure");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  default:
    console.log("Not a valid day");
}
```

#### Logical Operators

```js
const hasDriverLicense = true;
const hasGoodVision = false;
console.log(hasDriverLicense && hasGoodVision); // false
console.log(hasDriverLicense || hasGoodVision); // true
```

---

### Truthy & Falsy Values

Falsy values convert to `false` in a boolean context:

- `0`
- `''` (empty string)
- `undefined`
- `null`
- `NaN`

```js
console.log(Boolean(0)); // false
console.log(Boolean("Hello")); // true
```

---

### Statements & Expressions

- **Expressions**: Code that produces a value (`3 + 4`, `true && false`).
- **Statements**: Code that performs an action but does not return a value (`if-else` statements).

```js
if (23 > 10) {
  const str = "23 is bigger"; // Expression
}
```

---
