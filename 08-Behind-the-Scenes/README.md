## Javascript : Behind The Scenes

### **JavaScript Overview**

1. **High-Level:**

   - JavaScript provides abstraction, freeing developers from manual memory management.

2. **Garbage-Collected:**

   - The garbage collector removes objects no longer referenced, managed by the JavaScript engine.

3. **Interpreted or Just-In-Time Compiled:**

   - JavaScript was historically an interpreted language but now uses Just-In-Time (JIT) compilation, combining the benefits of interpretation (fast startup) and compilation (optimized execution).

4. **Multi-Paradigm:**

   - JavaScript supports multiple programming paradigms:
     - **Procedural:** Code is executed in a step-by-step manner.
     - **Object-Oriented:** Based on objects, prototypes, and inheritance.
     - **Functional:** Treats functions as first-class citizens, supports immutability and higher-order functions.

5. **Prototype-Based Object-Oriented:**

   - A prototype is a mechanism by which JavaScript objects inherit features from one another.
   - Every JavaScript object has an internal link to another object called its prototype (accessible via `__proto__` or the modern `Object.getPrototypeOf()`).
   - Prototype inheritance allows sharing properties and methods between objects.

6. **First-Class Functions:**

   - Functions in JavaScript are first-class citizens, meaning:
     - They can be assigned to variables.
     - Passed as arguments.
     - Returned from other functions.
     - Stored in data structures.

7. **Dynamic:**

   - JavaScript uses **dynamic typing**, meaning variables are not bound to specific data types and can change types at runtime.

8. **Single-Threaded:**

   - JavaScript operates on a single main thread (the call stack).

9. **Non-Blocking Event Loop:**
   - The event loop enables asynchronous programming by allowing long-running tasks (e.g., timers, HTTP requests) to execute outside the main thread and later enqueue their callbacks for execution.

---

### **JavaScript Engine and Runtime**

1. **JavaScript Engine:**

   - It executes JavaScript code. The key components are:
     - **Call Stack:** Manages function calls and execution contexts.
     - **Heap:** Manages memory allocation for objects.

2. **Compilation vs. Interpretation:**

   - Modern JavaScript engines use Just-In-Time (JIT) compilation:
     - Combines parsing, compilation, and execution.
     - Produces machine code for execution without an intermediate file.

3. **Modern Just-In-Time Compilation:**

   - **Parsing:** Converts code into an **Abstract Syntax Tree (AST)**, representing the structure of the code.
   - **Compilation:** Generates initial machine code.
   - **Optimization:** Continuously optimizes the machine code during execution, leveraging runtime feedback.

4. **JavaScript Runtime:**
   - The **JavaScript Runtime Environment** includes:
     - **JavaScript Engine:** Executes code (call stack + heap).
     - **Web APIs:** Provided by the browser (e.g., `DOM`, `setTimeout`, `fetch`).
     - **Callback Queue:** Holds asynchronous callbacks ready to execute.
     - **Event Loop:** Monitors the call stack and callback queue, moving callbacks to the stack when it's empty.

---

### **Corrections and Clarifications**

1. **Garbage-Collected:**

   - Mention that the specific algorithm (e.g., **mark-and-sweep**) varies by engine. Most modern engines use mark-and-sweep to identify and remove unreachable objects.

2. **Prototype-Based Object-Oriented:**

   - Clarify that JavaScript does not use classical class-based inheritance (as in Java or C++). Instead, it uses prototype-based inheritance.

3. **Single-Threaded:**

   - Add that while the main thread is single-threaded, modern JavaScript can use worker threads (e.g., **Web Workers**) for parallel processing.

4. **Callback Queue vs Microtask Queue:**
   - The **Callback Queue** (or Task Queue) handles regular callbacks like `setTimeout`.
   - The **Microtask Queue** handles higher-priority tasks like `Promises` or `MutationObserver`. Microtasks are executed before regular tasks.

---

### **Additional Details**

1. **JavaScript Engines:**

   - Some popular engines:
     - **V8 (Chrome, Node.js)**: Developed by Google, open-source.
     - **SpiderMonkey (Firefox)**: Developed by Mozilla.
     - **JavaScriptCore (Safari)**: Also known as Nitro, developed by Apple.
     - **Chakra (Legacy Edge)**: Developed by Microsoft (no longer actively maintained).

2. **Execution Context:**

   - JavaScript executes within an **Execution Context**, which contains:
     - **Variable Environment:** Holds variables and functions.
     - **Lexical Environment:** Tracks where the code was defined.
     - **This Binding:** Determines the value of `this`.

3. **Event Loop:**
   - The **Event Loop** prioritizes the **Microtask Queue** over the **Callback Queue**, ensuring promises and async/await callbacks are handled before regular callbacks.

---

### Execution Context and The Call Stack

#### What is an Execution Context?

- After compiling the code, the **global execution context** is created for top-level code (code that is not inside any function).
  - Only the code outside of functions will be executed immediately. Functions are executed only when they are explicitly called.
  - An **execution context** is the environment in which a piece of JavaScript is executed. It's like a container that stores all the necessary information for the code to run. JavaScript code is always executed within an execution context.
  - There is exactly **one** global execution context, which serves as the default context. This is created for the top-level code.

#### Lifecycle of Execution Context

1. Execution of top-level code (inside the global execution context):

   - Execution refers to the process where the computer CPU processes the machine code derived from the JavaScript code.

2. Execution of functions and handling callbacks (e.g., click event callbacks):

   - For each function call, a new execution context is created containing all the information necessary to run that function.
   - **One execution context per function call.**

#### Execution Context in Detail

1. **Variable Environment (VE):**

   - Contains:
     - Variables declared with `let`, `const`, and `var`.
     - Functions.
     - The `arguments` object.

2. **Scope Chain (SC):**

   - Contains references to variables located outside of the current function (outer variables).
   - Each execution context stores its own scope chain to keep track of variable access.

3. `this` **Keyword:**

   - The `this` keyword is dynamically determined based on how the function is called.

- The content of an execution context (variable environment, scope chain, `this` keyword) is generated during the **creation phase**, right before execution starts.
- Execution contexts for arrow functions behave differently:
  - Arrow functions **do not get their own** `arguments` **object or** `this` **keyword**.
  - Instead, they inherit these from their closest regular parent function.

#### The Call Stack

- The call stack is a structure where execution contexts are stacked on top of each other. It keeps track of where we are in the execution process.
- When a function finishes executing, its execution context is removed from the stack, and the previous execution context becomes active again.

#### How the Call Stack Works:

1. Top-level code starts execution.
2. The global execution context is created and placed at the bottom of the call stack.
3. When a function (e.g., `first()`) is called:

   - A new execution context is created for that function.
   - The new execution context is pushed onto the stack.

4. If another function (e.g., `second()`) is called within `first()`, its execution context is created and pushed onto the stack.
5. Once a function finishes execution, its context is removed (popped) from the stack.
6. Execution then resumes in the previous execution context (e.g., back to `first()`).
7. When the program finishes (e.g., the browser tab or window is closed), the global execution context is removed from the stack.

#### Key Points:

- **Single-threaded execution:** JavaScript executes one task at a time. While one function is being executed, no other function can execute.
- The call stack ensures that the order of execution is maintained and never lost.

### Scope and Scope Chain

#### Scoping and scope in javascript

- scope : the accessibility or visibility of variables and functions in different parts of the code. the place where variables are declared
- lexical scope : JavaScript uses lexical (or static) scoping, meaning the scope of a variable is determined by its position in the source code.
- scope of a variable : region of code where a certain variable can be accessed.

#### The 3 types of scope

- **global scope**
  - outside of any function or block
  - variables declared in global scope are accessible anywhere
- **function scope**
  - variables are accessible only inside function. NOT outside
  - each function creates its own scope
  - also called local scope
- **block scope (ES6)**
  - variables are accessible only inside block
  - HOWERVER, this only applies to let and const variables. (var variables end up in the closest function scope)
  - Functions are also block scoped (only in strict mode)

**variable lookup** : Scope has access to variables from all outer scopes

- variables are not copied from one scope to another!
- scopes look up variables until they find what they need
- A certain scope will never have access to inner scope (it cannot look down.)

**Scope chain vs call stack**

- scope chain has nothing to do with the order of the execution contexts in the call stack
- Scope chain gets the variable environments from the execution context.
- It is equal to adding all the variable enviornments of all the parent scopes

### Code Examples and Explanations

#### 1. Scope Chain and Variable Lookup
```javascript
'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); // Accesses 'firstName' from global scope
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
```
- **Scope Chain**: If a variable is not found in the current scope, JavaScript looks for it in the parent scope, and so on, up to the global scope.  
- **Execution Order**: Even though `firstName` is declared after `calcAge`, it’s available during the function call due to JavaScript’s execution order.  

---

#### 2. Nested Functions and Access to Variables
```javascript
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
```
- **Nested Scope**: `printAge` can access `age` (from `calcAge`) and `firstName` (from global scope) through the scope chain.  
- **Global Scope Restriction**: Variables like `age` are not available in the global scope.  

---

#### 3. `var` vs `let`/`const`
```javascript
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    if (birthYear >= 1991 && birthYear <= 1996) {
      var millennial = true; // Function-scoped
      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);
    }
    console.log(millennial); // Accessible (function-scoped)
    // console.log(str); // Reference Error (block-scoped)
  }

  printAge();
}

const firstName = 'Jonas';
calcAge(1991);
```
- **`var`**: Function-scoped. Accessible outside the block it’s defined in but within the function.  
- **`let`/`const`**: Block-scoped. Only accessible within the block they are defined in.  

---

#### 4. Functions as Block-Scoped in Strict Mode
```javascript
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    if (birthYear >= 1991 && birthYear <= 1996) {
      function add(a, b) {
        return a + b;
      }
    }
    // add(2, 3); // Reference Error (block-scoped in strict mode)
  }

  printAge();
}

calcAge(1991);
```
- **Functions in Strict Mode**: Functions declared inside a block (`if`) are block-scoped in strict mode.  
- In non-strict mode, functions declared inside blocks are function-scoped.

---

#### 5. Variable Redefinition in Inner Scope
```javascript
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      const firstName = 'Steven'; // Different variable from the global one
      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);

      output = 'NEW OUTPUT!'; // Modifies `output` from parent scope
    }

    console.log(output); // 'NEW OUTPUT!'
  }

  printAge();
}

const firstName = 'Jonas';
calcAge(1991);
```
- **Variable Redefinition**: A variable defined in an inner scope with `let` or `const` is independent of a variable with the same name in the parent scope.  
- **Variable Mutation**: Variables declared with `let` in a parent scope can be modified inside a child scope.  

---

#### 6. Using Shadowed Variables
```javascript
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      const firstName = 'Steven'; // Shadows global `firstName`
      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);
    }

    console.log(output); // Uses parent scope's `output`
  }

  printAge();
}

const firstName = 'Jonas';
calcAge(1991);
```
- **Variable Shadowing**: Inner `firstName` shadows the global one. JavaScript uses the closest variable in the scope chain.  


---

### **Hoisting in JavaScript**
- Hoisting makes certain types of variables accessible in the code before they are actually declared. 
- Behind the scenes, before execution, the code is scanned for variable declarations. For each variable, a new property is created in the **Variable Environment Object**.

#### **1. Function Declarations**
- **Hoisted**: The initial value in the Variable Environment is set to the actual function.
- We can use function declarations before they are declared in the code because they are stored in the Variable Environment Object.

#### **2. `var` Variables**
- **Hoisted**: The initial value is set to `undefined`.  
- Accessing a `var` variable before it is declared in the code results in `undefined`.
- This is one reason why developers avoid using `var` in modern JavaScript.

#### **3. `let` and `const` Variables**
- **Technically hoisted**, but they are placed in a **Temporal Dead Zone (TDZ)**.  
- Variables declared with `let` or `const` cannot be accessed between the start of the scope and the point where they are declared in the code.

#### **4. Function Expressions and Arrow Functions**
- Their behavior depends on whether they are declared with `var`, `let`, or `const`:
  - If declared with `var`: Hoisted with an initial value of `undefined`.
  - If declared with `let` or `const`: They are subject to the TDZ and cannot be accessed before their declaration.

---

### **Temporal Dead Zone (TDZ) and `let`/`const`**
```javascript
const myName = 'Jiyun';

if (myName === 'Jiyun') {
  console.log(`Jiyun is a ${job}`); // ReferenceError: Cannot access 'job' before initialization

  const age = 2037 - 2010;
  console.log(age);

  const job = 'programmer';
  console.log(x); // ReferenceError: x is not defined
}
```

#### **Key Points:**
- The **TDZ** for the `job` variable starts from `console.log(...)` to the line where `job` is declared (`const job = 'programmer';`).
- **TDZ**: A region of the scope where the variable is defined but cannot be used in any way.
- The error message "Cannot access 'job' before initialization" indicates that the engine recognizes the variable (`job`) as declared but uninitialized due to being in the TDZ.

#### **How the TDZ Works:**
1. During the scanning phase, the engine places the `job` variable in the Variable Environment and marks it as **uninitialized**.
2. When execution reaches the line where the variable is declared, the TDZ ends, and the variable is initialized.

#### **Why TDZ Exists:**
1. **Error Prevention:** Accessing variables before declaration is bad practice and the TDZ helps catch such errors.
2. **Support for `const`:** Since `const` variables cannot be reassigned, it would be problematic to initialize them to `undefined` and then assign their actual value later.

---

### **Why Does Hoisting Exist?**
1. **Function Hoisting:** Using functions before their declaration can be useful for certain programming techniques, such as mutual recursion.
2. **`var` Hoisting:** This is more of a side effect of hoisting functions.
3. **Historical Context:** JavaScript was initially created for small-scale scripts, not as the large-scale programming language it has become today.

---

#### Code Explantion
```javascript
// Functions

console.log(addDecl(2, 3)); // 5
console.log(addExpr(2, 3)); // reference error : cannot access addExpr before initialization
console.log(addArrow(2, 3)); // reference error : addArrow is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) { 
  return a + b;
};

var addArrow = (a, b) => a + b;
```
- function declaration is hoisted
- function expression and expression depend on its variable
	- with const, it's in TDZ  - gets `reference error : cannot access addExpr before initialization` error
	- with var, it's undefined. so it's calling undefined, gets `reference error : addArrow is not a function`
```javascript
if (!numProducts) deleteShoppingCart(); // here numProducts is undefined

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}
```
- undefined is falsy value, so deleteShoppingCart will be executed
### Best Practices
- don't use var variables
- declare variables at the top of each scope
- declare functions first and use them only after the declaration

---

### `this` Keyword in JavaScript

The `this` keyword is a special variable automatically created for every execution context. Its value depends on **how the function is called**, not where it's defined.

---

#### **Key Points About `this`**
- **Dynamic nature**: `this` is assigned its value when the function is called.
- **Not static**: It does not always point to the same thing.
- **Does not point to**:
  - The function itself.
  - The function's variable environment.

---

### Scenarios for `this`

1. **Global Context**
   ```javascript
   console.log(this); // `window` object in browsers
   ```

2. **Method Calls**
   - When a function is called as a method, `this` points to the object calling the method.
   ```javascript
   const obj = {
     value: 42,
     showValue: function () {
       console.log(this.value); // 42
     },
   };
   obj.showValue(); // `this` refers to `obj`
   ```

3. **Simple Function Calls**
   - When a regular function is called, `this` depends on the mode:
     - **Strict mode**: `this` is `undefined`.
     - **Non-strict mode**: `this` is the global object (`window` in browsers).
   ```javascript
   'use strict';

   const func = function () {
     console.log(this); // undefined
   };

   func();

   const funcNonStrict = function () {
     console.log(this); // `window` object in non-strict mode
   };

   funcNonStrict();
   ```

4. **Arrow Functions**
   - **No `this` binding**: Arrow functions inherit `this` from their **lexical parent** (the surrounding function or context).
   ```javascript
   const arrowFunc = () => {
     console.log(this); // `this` refers to the surrounding context
   };

   arrowFunc(); // `window` in global scope or parent's `this` in a method
   ```

5. **Event Listeners**
   - In event handlers, `this` refers to the **DOM element** the listener is attached to.
   ```javascript
   const button = document.querySelector('.btn');

   button.addEventListener('click', function () {
     console.log(this); // DOM element (`button`)
   });
   ```

---
