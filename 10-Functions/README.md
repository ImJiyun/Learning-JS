## Functions

### First-Class vs Higher-Order Functions

#### **1. First-Class Functions**

- In JavaScript, functions are treated as **first-class citizens**.
- This means:
  - Functions are simply **values**.
  - Functions are just another **type of object**, so they inherit the capabilities of objects.
- Key characteristics of first-class functions:
  - **Storage**: Functions can be stored in variables or object properties.
  - **Passability**: Functions can be passed as arguments to other functions.
  - **Returnability**: Functions can be returned from other functions.
  - **Methods**: Since functions are objects, we can call methods on them (e.g., `.bind()`, `.call()`, `.apply()`).

#### **2. Higher-Order Functions**

- A **higher-order function** is a function that:
  - **Receives** another function as an argument (callback function).
  - **Returns** a new function.
  - Or **does both** (receives and returns functions).
- Callback functions:
  - Are the functions passed as arguments to higher-order functions.
  - They are executed later, often within the higher-order function.

#### **3. Key Difference**

- **First-class functions** describe the **nature** of how functions are treated in JavaScript (as values).
- **Higher-order functions** describe a specific use case where functions are used as arguments, returned, or both.
  - **Higher-order functions exist because of first-class functions**.

---

### Functions Accepting Callback Functions

**Advantages of Using Callback Functions**

1. **Code Reusability**
   - Callbacks make it easy to split logic into smaller, reusable pieces.
2. **Abstraction**
   - Callbacks allow us to hide implementation details, focusing instead on the higher-level logic.

---

#### **Examples of Callbacks**

1. **Utility Functions**

   ```javascript
   const oneWord = function (str) {
     return str.replace(/ /g, '').toLowerCase();
   };

   const upperFirstWord = function (str) {
     const [first, ...others] = str.split(' ');
     return [first.toUpperCase(), ...others].join(' ');
   };
   ```

2. **Higher-Order Function with Callback**

   ```javascript
   const transformer = function (str, fn) {
     console.log(`Original string: ${str}`);
     console.log(`Transformed string: ${fn(str)}`);
     console.log(`Transformed by: ${fn.name}`);
   };

   transformer('Javascript is the best!', upperFirstWord);
   transformer('Javascript is the best!', oneWord);
   ```

   **Explanation**

   - The `transformer` function:
     - Takes a string and a callback function (`fn`) as arguments.
     - Delegates the string transformation to the callback.
   - `upperFirstWord` and `oneWord` are examples of callback functions passed to `transformer`.

3. **Callback Functions in Practice**

   - **Event Listeners**

     ```javascript
     const high5 = function () {
       console.log('👋');
     };

     document.body.addEventListener('click', high5);
     ```

     - `addEventListener` is a higher-order function.
     - `high5` is executed when the event occurs.

   - **Array Methods (e.g., `forEach`)**
     ```javascript
     ['Jiyun', 'Diane', 'Alex'].forEach(high5);
     ```
     - The `high5` function is executed for each array element.

---

### Functions Returning Functions

1. **Standard Syntax**

   ```javascript
   const greet = function (greeting) {
     return function (name) {
       console.log(`${greeting} ${name}`);
     };
   };

   const greeterHey = greet('Hey');
   greeterHey('Jiyun');
   greeterHey('Steven');

   // All-in-one invocation
   greet('Hello')('Jiyun');
   ```

2. **Arrow Function Syntax**

   ```javascript
   const greetArrow = greeting => {
     return name => {
       console.log(`${greeting} ${name}`);
     };
   };

   greetArrow('Hi')('Alex');
   ```

---

#### **Why It Works?**

- Functions returning functions leverage **closures**:
  - A closure allows the inner function to access variables from its parent function, even after the parent function has returned.

---

### `call` method

```javascript
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    // this keyword = lufthansa object itself
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
```

- Suppose there are multiple airlines and they would like to use `book` method

```javascript
const book = lufthansa.book;

book(23, 'Lina'); // DOES NOT WORK
// TypeError: undefined is not an object (evaluating 'this.airline')
```

- we can store a function into a variable, bc a function is just a value
- the `book` function now becomes a regular function call - the `this` keyword becomes `undefined` (in strict mode)
- That's why the `call` method comes into play (`apply`, `bind` too can manipulate `this` keyword)
- With `call`, we can tell JavaScript how `this` keyword looks like

#### Syntax

```javascript
book.call(eurowings, 23, 'Sarah');
```

- 1st argument : what this keyword points to
- after the 1st argument : arguments of the original function

- Result
  ```
  Sarah booked a seat on Eurowings flight EW23
  ```

---

### `apply` method

- works same as the call method, but doesn't receive a list of arugments
- It receives an array of arguments.

#### Syntax

```javascript
const flightData = [583, 'George'];
book.apply(swiss, flightData);
console.log(swiss);
```

- 1st argument : what this keyword points to
- 2nd argument : an array of arguments.

---

### `bind` method

- Just like `call` and `apply`, it can manipulate the `this` keyword
- It returns a new function

```javascript
const bookEW = book.bind(eurowings); // a new function
bookEW(23, 'Steven'); // don't need to specify this keyword
```

- just like call method, we can define a list of arguments

```javascript
const bookEW23 = book.bind(eurowings, 23); // preset the "fligtNum" arg

bookEW23('Jiyun');
bookEW23('William');
```

- **partial application** : a part of the arugments of the original function are already applied

#### 1. Usecase 1 : With event listeners

```javascript
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
```

- event handler always points to the element on which that handler is attached to
- `this` keyword now becomes btn element
- but it should be `lufthansa` which buy the plane

```javascript
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
```

#### 2. Usecase 2 : Partial application

```javascript
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // preset the rate
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));
```

- difference between default parameters : `bind` creates a new function (a more specific function based on a more general function)

---

### Closure

#### Definition

- Variable environment attached to the function, exactly as it was at the time and place the function was created. (even after that execution context is gone.)
- Closure makes a function remember all the variable that existed at the function's birthplace
- A function has access to the variable environment of the execution context in which it was created
- We do NOT have to manually create closures, this is a JavaScript feature that happens automatically. We can't even access closed-oever variables explicitly. A closure is NOT a tangible JavaScript object.

```javascript
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
```

```javascript
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
```

- How can `booker` function update the `passengerCount` defined in `secureBooking` function that actually has already finished executing?

- Execution context of `secureBooking` is popped off the call stack after the function finished running.

- This variable environmnet which holds `passengerCount` is still stored in memory

- Because of the clourse, VE was moved to heap and NOT garbage collected.
  (Usually when the EC pops off the stack, the variables in thet stack are destoryed by GC)

- The place where `booker` function was created is EC of `secureBooking`
- Therefore, `booker` can access to the VE of `secureBooking` which contains `passengerCount`

#### Exampe 1

```javascript
let f; // first defined

const g = function () {
  const a = 23;
  f = function () {
    // reassigned
    console.log(a * 2);
  };
};

g();
// g has finished execution (popped off the call stack)
f();
```

- `f` was defined in the global EC
- and was reassigned in the `g` function (VE of `g` function)
- So we can access the a variable even after `g` finished execution (it means EC of 'g' has popped off the stack)

```javascript
let f;

const g = function () {
  const a = 23;
  f = function () {
    // reassigned
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    // reassigned
    console.log(b * 2);
  };
};

g();
f(); // 46
console.dir(f); // in this point, it has a closure of g

// Re-assigned
h();
f(); // 1554
console.dir(f); // in this point, it has a closure of h
```

- Now we've got h function, and inside of that, `f` was reassigned
- `f` is closed over the VE of `h`
- `f` can acess the `b` variable

#### Exampe 2

```javascript
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(100, 2);
```

- The callback inside `setTimeout` was created in the VE Of `boardPassengers`
- so it can access the variable inside `boardPassengers`
- Another characteristics of closure : it has a priority over scope chain

```javascript
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // closure has a priority over scope chain

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

const perGroup = 1000;
boardPassengers(100, 2);
```

- If the `perGroup` in `boardPassengers` doesn't exist, the log will be `There are 3 groups, each with 100 passengers`
