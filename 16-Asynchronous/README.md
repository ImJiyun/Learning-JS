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
