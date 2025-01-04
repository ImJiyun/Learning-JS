'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// AJAX call: XMLHttpRequest
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // 1st argument: type of request
  // 2nd argument: URL
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // sending the request is being done asynchronously in the background
  // once the request is done, the load event will be fired

  request.addEventListener('load', function () {
    // as soon as the data arrives, this function will be called
    console.log(this.responseText); // this will show the response data

    // convert JSON string to object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa'); // send a request to the server way before the previous request is finished
getCountryData('germany');
*/

// sequence of AJAX calls: second request runs only after the first request is finished
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// Nested callbacks -> callback hell
// we have nested callbacks to execute asynchronous tasks in sequence
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  // 1st argument: type of request
  // 2nd argument: URL
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // sending the request is being done asynchronously in the background
  // once the request is done, the load event will be fired

  request.addEventListener('load', function () {
    // as soon as the data arrives, this function will be called
    console.log(this.responseText); // this will show the response data

    // convert JSON string to object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1
    renderCountry(data);

    // get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
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

// getCountryAndNeighbour('portugal');
// second ajax call is only made after the first one is finished
getCountryAndNeighbour('usa');

// callback hell makes code look ugly and difficult to understand
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

///////////////////////////////////////////////////////////////////////
// PROMISES AND FETCH API
const request = fetch('https://restcountries.com/v3.1/name/portugal'); // GET request
// fetch immediately returns a promise
// at first, the promise is pending
console.log(request);
// consuming Promise
const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); // json is a method that is available on the response object caomming from fetch
      // json itself is also asynchronous and returns a promise
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    }); // callback inside then will be called as soon as the promise is fulfilled
};
// two then methods are chained in sequence
// Promises don't get rid of callback, but callback hell is avoided
getCountryData('portugal');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  // returns promise
  return fetch(url).then(response => {
    // handling errors manually
    // throwing an error will reject the promise
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
  });
};
// Chaining Promises
// then method always returns a promise no matter if we return a value or not
// if we do return a value, that value will be the fulfilled value of the promise
/*
const getCountryDataArr = country => {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);

      // handling errors manually
      // throwing an error will reject the promise
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    }) // returns a promise
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      // handling errors manually
      // throwing an error will reject the promise
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      // err is an object that contains the error message
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

const getCountryDataArr = country => {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found',
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      // err is an object that contains the error message
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryDataArr('Belgium');

///////////////////////////////////////////////////////////////////////////
// Handling Rejected Promises
// if a promise is rejected, the catch method will be called
// the only way in which the fetch promise rejects is when there is a network problem

btn.addEventListener('click', function () {
  getCountryDataArr('Netherlands');
});

// the 1st callback in then is for the fufilled promise
// the 2nd callback in then is for the rejected promise

// catch method - handling errors globally
// erros propagate through the promise chain until they are caught
// catch method is the last in the promise chain

// finally method - always executed no matter if the promise is fulfilled or rejected
// finally method is used to do some clean-up work
// it's useful for example to hide a loading spinner

// getCountryDataArr('asefae');
// with 404 error, the fetch promise will still get fulfilled
// the catch method will be called only when there is a network error

////////////////////////////////////////////////////////////////////
// event loop in practice
console.log('Test start'); // 1
setTimeout(() => console.log('0 sec timer', 0)); // 5
// timer is not a guaranteed time, it's a minimum time
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3
// create a promise that is immediately resolved
// setTimeout and promises finish at the same time, but promises are executed first (because they are microtasks)

Promise.resolve('Resolved promise 2').then(res => {
  // Promise itself will be resolved immediately
  // microtasks will be put on the microtask queue, and it will take some time
  for (let i = 0; i < 1000000000; i++) {}
  // the timer above will take a longer time than 0 seconds to execute console.log
  console.log(res);
}); // 4

console.log('Test end'); // 2

// code outside of any callback function is executed first
// callbacks related to web APIs go to the web API section and then to callback queue
// the event loop takes the callback from the callback queue and executes it
// fetch goes to microtask queue

///////////////////////////////////////////////////////////////////
// Async and Await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// async functions are running in the background and when they are done, they will return a promise
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    );
    // resGeo is a response object that has ok property
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    // await will pause the execution of the function until the promise is settled
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${dataGeo.countryCode}`,
    );
    // it's not blocking the main thread of execution because the function is running asynchronously
    // await will wait for the promise to be settled
    // async and await are syntactic sugar over then method
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json(); // json is a method that converts the response to json object and it returns a promise
    console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    // err is an object that contains the error message
    renderError(`💥 ${err.message}`);

    // rethrow the error so that the promise returned by the async function will be rejected
    throw err;
  }
};
console.log('1: Will get location');
const city = whereAmI(); // this function is loaded in the background. JavaScript will immediately move to the next line of code
console.log(city); // this will be pending because the function is still running in the background

// below code mixes async/await with then method -> not recommended
/*
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finished getting location'));
  */
// the argument of the then method is the result value of the async function

// IIFE : Immediately Invoked Function Expression
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

console.log('2: Finished getting location');

// error handling with async/await
// try / catch block has nothing to do with promises
// it's just a way to handle errors in JavaScript
// we have to manually throw an error in the async function (for other than network errors)

// running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    console.log([data1.capital, data2.capital, data3.capital]);

    // Promise.all method
    // takes an array of promises and returns a new promise
    // run all promises at the same time
    const data = Promise.all(
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    );
    // if one of promises is rejected, the whole promise returned by Promise.all will be rejected
    console.log((await data).map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('norway', 'canada', 'netherlands');
