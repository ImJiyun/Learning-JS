
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

4.  **JavaScript Runtime:**
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
        
3. `**this**` **Keyword:**
    
    - The `this` keyword is dynamically determined based on how the function is called.
        

- The content of an execution context (variable environment, scope chain, `this` keyword) is generated during the **creation phase**, right before execution starts.
    
- Execution contexts for arrow functions behave differently:
    
    - Arrow functions **do not get their own** `**arguments**` **object or** `**this**` **keyword**.
        
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