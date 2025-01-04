## Asynchronous JavaScript

### Asynchronous

- **Synchronous code**
  - Most code is synchronous.
  - Executed line by line.
  - Each line of code waits for the previous line to finish.
  - Long-running operations block code execution (e.g., `alert`).
- **Asynchronous code**
  - Coordinates behavior of a program over a period of time.
  - Executed **after a task that runs in the "background" finishes.**
  - Non-blocking.
  - Execution doesn't wait for an asynchronous task to finish its work.
  - Examples:
    - Timer with callback.
    - Asynchronous image loading with events and callbacks.
    - Geolocation API or AJAX calls.
  - **Note:**
    - Callback functions alone do **NOT** make code asynchronous (e.g., array methods).
    - `addEventListener` does **NOT** automatically make code asynchronous; it simply waits for an event like a click to happen.

### AJAX calls

- **Asynchronous JavaScript and XML:** Allows communication with remote web servers asynchronously, enabling dynamic data requests.
- JSON (JavaScript Object Notation) is now the most popular API data format, replacing XML.

### API

- **Application Programming Interface:** A piece of software used by another software to allow applications to communicate.
- Types of APIs in web development:
  - DOM API
  - Geolocation API
  - Custom Class API
  - "Online" API: An application running on a server that receives and responds to data requests.
- Examples of "Online" APIs:
  - Weather data.
  - Country data.
  - Flight data.
  - Currency conversion.
  - Email or SMS sending.
  - Google Maps.
- We can build custom APIs (requires backend development) or use third-party APIs.

### XMLHttpRequest Example

```javascript
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // Request sent asynchronously in the background.

  request.addEventListener('load', function () {
    // Fired once the request is complete.
    console.log(this.responseText);

    // Convert JSON string to object.
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
        <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
      </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
```

### Sequence of AJAX Calls

- Nested callbacks ensure asynchronous tasks run in sequence.

```javascript
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} million people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
      <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render main country.
    renderCountry(data);

    // Get neighbour country (if exists).
    const [neighbour] = data.borders || [];
    if (!neighbour) return;

    // AJAX call for neighbour country.
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');
```

### Callback Hell Example

```javascript
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

---

### **Promise and Fetch API**

#### **Promise**

- **ES6 Feature**: Introduced in ES6, promises provide a cleaner and more manageable way to handle asynchronous operations.
- **Purpose**: A Promise is an object that serves as a placeholder for a value that is initially unknown but will be available in the future.
  - It is a container for an asynchronously delivered value.
  - Think of it as a container for a "future value."

#### **When is a Promise Useful?**

- When initiating an asynchronous task (like an AJAX call), there is no value immediately, but we know that a value will be returned eventually.
- Promises provide a way to handle this future value when it arrives.

#### **Analogy**:

- A Promise is like a lottery ticket. You purchase the ticket (start the asynchronous operation), and you don’t know if you’ll win (whether the result will be successful or not), but you can claim your prize (use the value) when it arrives.

#### **Advantages of Using Promises**

- **Avoiding Callback Hell**: Promises allow us to chain asynchronous operations without deeply nesting callback functions, making code cleaner and easier to maintain.
- **Better Handling**: Instead of relying on events and callbacks passed into asynchronous functions, Promises give us a structured way to handle asynchronous results.

---

#### **Lifecycle of a Promise**

A Promise goes through different states during its lifecycle:

1. **Pending**:

   - This is the initial state. The promise is in progress, and the asynchronous task is still running.
   - At this point, there is no value yet, but the promise indicates that a result will be provided eventually.

2. **Settled**:
   - The promise has completed the asynchronous task, but it could have two possible outcomes:
     - **Fulfilled**: The asynchronous operation was successful, and the value is now available.
     - **Rejected**: An error occurred during the asynchronous operation, and the promise could not be fulfilled.

- **Note**: Once a promise is settled (either fulfilled or rejected), it cannot change its state. This means that the promise is **immutable** after it settles.

---

### **Code Example**

1. **Basic Fetch Request**  
   The `fetch()` function returns a Promise, which is in a pending state until it is fulfilled (or rejected). Example:

   ```javascript
   const request = fetch('https://restcountries.com/v3.1/name/portugal'); // GET request
   console.log(request); // Logs a pending Promise
   ```

2. **Consuming the Promise**  
   We can use `.then()` to handle the Promise once it is fulfilled:

   ```javascript
   const getCountryData = function (country) {
     const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
       .then(response => {
         console.log(response);
         return response.json(); // .json() returns a Promise
       })
       .then(data => {
         console.log(data);
         renderCountry(data[0]); // Handle the data
       });
   };
   ```

3. **Chaining Promises**  
   We can chain `.then()` methods to handle sequential operations:

   ```javascript
   getCountryData('portugal');
   ```

4. **Handling Errors with `.catch()`**  
   Use `.catch()` to handle any rejected promises:

   ```javascript
   const getJSON = function (url, errorMsg = 'Something went wrong') {
     return fetch(url).then(response => {
       if (!response.ok) {
         throw new Error(`${errorMsg} (${response.status})`); // Manually throw error
       }
     });
   };
   ```

5. **Handling Multiple Promises Sequentially**  
   When handling multiple promises, we can chain them, ensuring each request runs in sequence:

   ```javascript
   const getCountryDataArr = country => {
     getJSON(
       `https://restcountries.com/v3.1/name/${country}`,
       'Country not found',
     )
       .then(data => {
         renderCountry(data[0]);
         const neighbour = data[0].borders[0];

         if (!neighbour) throw new Error('No neighbour found!'); // Throw error if no neighbour

         return getJSON(
           `https://restcountries.com/v3.1/alpha/${neighbour}`,
           'Country not found',
         );
       })
       .then(data => renderCountry(data[0], 'neighbour'))
       .catch(err => {
         console.error(`${err} 💥💥💥`);
         renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
       })
       .finally(() => {
         countriesContainer.style.opacity = 1; // Final cleanup
       });
   };

   getCountryDataArr('Belgium');
   ```

6. **Handling Rejected Promises**  
   `fetch()` will only reject a promise if there is a network issue. We can catch errors using `.catch()`:

   ```javascript
   btn.addEventListener('click', function () {
     getCountryDataArr('Netherlands');
   });
   ```

   - The **first `.then()` callback** handles the fulfilled promise.
   - The **second `.then()` callback** handles the rejected promise, though fetch rarely rejects unless there's a network error.

7. **Global Error Handling**  
   If any error is thrown within the promise chain, it will propagate until it is caught by `.catch()`:

   ```javascript
   getCountryDataArr('asefae'); // This triggers a 404 error
   ```

8. **The `.finally()` Method**  
   `.finally()` always runs, regardless of whether the promise is fulfilled or rejected. It is useful for tasks such as cleaning up after the operation, for example, hiding a loading spinner:

   ```javascript
   .finally(() => {
     countriesContainer.style.opacity = 1; // Reset UI
   });
   ```

---

### JavaScript Runtime

- **Runtime in the browser**: A container that includes all the components necessary to execute JavaScript code.
- **Engine**: The core of the runtime.
- **Heap**: Where objects are stored in memory.
- **Call stack**: The place where code is executed. It supports only one thread of execution (no multitasking).
- **Web API**: APIs provided to the engine but not part of JavaScript itself (e.g., DOM, fetch API, timers, AJAX calls).
- **Callback queue**: A data structure holding ready-to-be-executed callback functions (triggered by events).
  - An ordered list of callback functions waiting to be executed.
- **Event loop**: Moves callbacks from the queue to the call stack whenever the call stack is empty. It enables asynchronous behavior and makes the non-blocking concurrency model in JavaScript possible.

### How Asynchronous JavaScript Works Behind the Scenes

```javascript
const el = document.querySelector('img');
el.src = 'dog.jpg';
el.addEventListener('load', () => {
  el.classList.add('fadeIn');
});

fetch('https://someurl.com/api').then(res => console.log(res));
```

- The **web APIs environment** handles asynchronous tasks related to the DOM, timers, and AJAX calls.
- **Loading an image** does not happen in the call stack or the main thread of execution but in the web APIs environment.
  - To perform an action after the image finishes loading, we listen to the `load` event.
  - A callback is registered in the web APIs environment and remains there until the `load` event is emitted.
- The **asynchronous fetch operation** also occurs in the web APIs environment.
  - A callback is registered in the web API environment.
- When all code in the call stack is finished, and the `load` event is emitted for the image:
  - The callback for the event is placed into the **callback queue**.
- The **event loop** checks the call stack and, if it is empty (except for the global context), transfers the first callback from the callback queue to the call stack (event loop tick).
- **When data arrives from the fetch operation**:
  - Callbacks related to promises do not enter the callback queue.
  - Instead, these callbacks go into the **microtask queue**, which has priority over the callback queue.

### Key Points

- JavaScript itself lacks awareness of time; asynchronous operations do not happen in the engine.
- The **runtime** manages all asynchronous behavior, while the **event loop** determines which code will execute.

---

### Code Example

```javascript
// event loop in practice

console.log('Test start'); // 1

setTimeout(() => console.log('0 sec timer'), 0); // 5

// Timers are not guaranteed to execute exactly at the specified time. The specified time is the minimum delay before execution.

Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3

// Promises are resolved immediately but their `.then` handlers are executed as microtasks.
// Microtasks have higher priority than macrotasks (like `setTimeout`), so they are executed first.

Promise.resolve('Resolved promise 2').then(res => {
  // Promise itself will be resolved immediately.
  // The `.then` callback is added to the microtask queue.
  for (let i = 0; i < 1000000000; i++) {}
  // This loop simulates a delay, causing the `0 sec timer` to execute later than expected.
  console.log(res);
}); // 4

console.log('Test end'); // 2

// Code outside of any callback function is executed first (synchronous code).
// Callbacks related to Web APIs go to the Web API section and then to the callback queue.
// The event loop prioritizes tasks in the microtask queue (e.g., Promises) over the callback queue (e.g., `setTimeout`).
```
---

### **Event Loop in Practice**

1. **Execution Order:**
   - Code outside callbacks executes first.
   - **Microtasks (Promises)** are processed before **macrotasks (setTimeout, setInterval)**.

2. **Code Execution Breakdown:**
   - `console.log('Test start');` → Synchronous code (executes first).
   - `setTimeout(() => console.log('0 sec timer'), 0);` → Macrotask (executes later via callback queue).
   - `Promise.resolve('Resolved promise 1').then(res => console.log(res));` → Microtask (executes before macrotasks).
   - `Promise.resolve('Resolved promise 2').then(res => { /* Simulated delay */ });` → Microtask with delay due to loop.

3. **Important Notes:**
   - Promises are resolved immediately but their callbacks go into the **microtask queue**.
   - The **event loop** processes the microtask queue before moving to the callback queue.
   - `setTimeout` specifies the **minimum delay**, not a guaranteed execution time.

---

### **Async/Await and Error Handling**

1. **Key Concepts:**
   - `async` functions run in the background and return a promise.
   - `await` pauses the execution until the promise is settled.
   - **Try/Catch** is used to handle errors inside `async` functions.
   - Errors must be manually thrown for non-network issues.

2. **Example Flow:**
   ```javascript
   const whereAmI = async function () {
       try {
           const pos = await getPosition(); // Get location
           const { latitude: lat, longitude: lng } = pos.coords;

           const resGeo = await fetch(`reverse-geocode API`);
           if (!resGeo.ok) throw new Error('Problem getting location data');
           const dataGeo = await resGeo.json();

           const res = await fetch(`restcountries API`);
           if (!res.ok) throw new Error('Problem getting country');
           const data = await res.json();

           console.log(`You are in ${dataGeo.city}, ${dataGeo.country}`);
       } catch (err) {
           console.error(err);
       }
   };
   ```

3. **Mixing `then` and `async/await`:**
   - **Not recommended** as it can lead to inconsistent code readability.

4. **Best Practices:**
   - Use `async/await` for cleaner syntax.
   - Always handle errors with `try/catch`.

---

### **Parallel Execution with `Promise.all`**

1. **Problem with Sequential Execution:**
   - Sequential `await` calls wait for each promise to resolve before moving to the next.

2. **Optimized Solution:**
   - `Promise.all` runs multiple promises in parallel and resolves when all are settled:
     ```javascript
     const get3Countries = async function (c1, c2, c3) {
         try {
             const data = await Promise.all([
                 getJSON(`restcountries API for ${c1}`),
                 getJSON(`restcountries API for ${c2}`),
                 getJSON(`restcountries API for ${c3}`),
             ]);
             console.log(data.map(d => d[0].capital));
         } catch (err) {
             console.error(err);
         }
     };
     ```

3. **Caveats:**
   - If any promise is rejected, the entire `Promise.all` fails.

---

### **Additional Notes**

1. **IIFE (Immediately Invoked Function Expression):**
   - Commonly used to encapsulate `async` logic:
     ```javascript
     (async function () {
         try {
             const city = await whereAmI();
             console.log(city);
         } catch (err) {
             console.error(err);
         }
     })();
     ```

2. **Error Handling:**
   - Always rethrow errors in `catch` if they need to propagate.

3. **Geolocation API:**
   - Wrap in a promise for cleaner usage with `async/await`.

---
