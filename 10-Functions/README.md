
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
     return str.replace(/ /g, "").toLowerCase();
   };

   const upperFirstWord = function (str) {
     const [first, ...others] = str.split(" ");
     return [first.toUpperCase(), ...others].join(" ");
   };
   ```

2. **Higher-Order Function with Callback**
   ```javascript
   const transformer = function (str, fn) {
     console.log(`Original string: ${str}`);
     console.log(`Transformed string: ${fn(str)}`);
     console.log(`Transformed by: ${fn.name}`);
   };

   transformer("Javascript is the best!", upperFirstWord); 
   transformer("Javascript is the best!", oneWord);
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
       console.log("👋");
     };

     document.body.addEventListener("click", high5);
     ```
     - `addEventListener` is a higher-order function.
     - `high5` is executed when the event occurs.

   - **Array Methods (e.g., `forEach`)**
     ```javascript
     ["Jiyun", "Diane", "Alex"].forEach(high5);
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

   const greeterHey = greet("Hey"); 
   greeterHey("Jiyun");
   greeterHey("Steven");

   // All-in-one invocation
   greet("Hello")("Jiyun");
   ```

2. **Arrow Function Syntax**
   ```javascript
   const greetArrow = (greeting) => {
     return (name) => {
       console.log(`${greeting} ${name}`);
     };
   };

   greetArrow("Hi")("Alex");
   ```

---

#### **Why It Works?**
- Functions returning functions leverage **closures**:
  - A closure allows the inner function to access variables from its parent function, even after the parent function has returned.

