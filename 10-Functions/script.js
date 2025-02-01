'use strict';
////////////////////////////////////////////////////////////////////////////////////
// default parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  // ES5
  //   numPassengers = numPassengers || 1; // if numPassengers is undefined, then it will be 1
  //   price = price || 199; // if price is undefined, then it will be 199

  // ES6
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);
createBooking('LH123', 2);

// skip default parameters
createBooking('LH123', undefined, 1000); // second parameter is undefined, so it will take default value

////////////////////////////////////////////////////////////////////////////////////
// how passing arguments works: value vs reference
const flight = 'KR123';
const jiyun = {
  name: 'Jiyun Kim',
  passport: 14259208421,
};

const checkIn = function (flightNum, passenger) {
  // flightNum is copy of original value, not itself
  // a completely new variable
  flightNum = 'KR999';
  // when we pass an object, we pass a reference to the object
  // so, we can change the object
  passenger.name = 'Ms. ' + passenger.name;

  if (passenger.passport === 14259208421) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// flight is primitive
// jiyun is reference type
checkIn(flight, jiyun);
console.log(flight); // KR123
console.log(jiyun); // {name: "Ms. Jiyun Kim", passport: 14259208421}

// is the same as doing...
const flightNum = flight;
const passenger = jiyun;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jiyun);
checkIn(flight, jiyun);

// Javascript doesn't have passing by reference
// it's always passing by value
// we in fact pass in a reference, but that reference itself is still a value
// It's simply a value that contains a memory address

////////////////////////////////////////////////////////////////////////////////////
// first-class and higher-order functions
// functions are simply values

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher-order function
// abstraction
// delegate the string transformation to the other lower lever of functions
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // calling the function
  // functions can have properties, just like objects
  console.log(`Transformed by: ${fn.name}`); // name property
};

// we are calling transformer function, into which we are passing callback function
// callback means we don't call them ourselves, but we let them be called later by other functions
transformer('Javascript is the best!', upperFirstWord); // we are not calling the function here, we are passing the function
transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};

// high5 is a callback function that JS will call as soon as the event happens
// addEventListener is a higher-order function
document.body.addEventListener('click', high5);

// forEach accepts callback function
// for each of items in array will call callback function
['Jiyun', 'Diane', 'Alex'].forEach(high5);

////////////////////////////////////////////////////////////////////////////////////
// Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // the greeterHey is a value, a function!
// we can now use the greeter function as if was any other function
greeterHey('Jiyun');
greeterHey('Steven');

// why it works? because of closer

// call it all in one go
greet('hello')('Jiyun');

const greetArrow = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

greetArrow('Hi')('Alex');

///////////////////////////////////////////////////////////////////////////////////
// call method
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

lufthansa.book(239, 'Jiyun');
lufthansa.book(482, 'Alex');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // we can store a function into a variable, bc a function is just a value
// DOES NOT WORK
// book(23, 'Lina'); // TypeError: undefined is not an object (evaluating 'this.airline')
// the book function becomes a regular function call - the this keyword becomes undefined (in strict mode)

//  we can tell JS how this keyword look like
// manipulate this keyword with call, apply, bind
book.call(eurowings, 23, 'Sarah');
// 1st arg : what this keyword points to
// after the 1st arg : arguments of the original function
console.log(eurowings);
// even thought the this keyword in book of lufthansa points to lufthansa, we can manipulate this keyword

book.call(lufthansa, 234, 'Mary');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary');
console.log(swiss);

// apply method
// works same as the call method, but doesn't receive a list of arugments
// it receives an array of arguments.
const flightData = [583, 'George'];
book.apply(swiss, flightData);
console.log(swiss);
book.call(swiss, ...flightData);

// bind method
const bookEW = book.bind(eurowings); // it will return a new function where this keyword will always be set to eurowings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven'); // don't need to specify this keyword

// just like call method, we can define a list of arguments
const bookEW23 = book.bind(eurowings, 23); // preset the "fligtNum" arg
// partial application : a part of the arugments of the original function are already applied
bookEW23('Jiyun');
bookEW23('William');

// Usecase 1 : With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// event handler always points to the element on which that handler is attached to
// this keyword now becomes btn element

// but it should be lufthansa which buy the plane
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Usecase 2 : partial application (we can preset parameters)
// in this case, we don't care about this keyword at all
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // preset the rate
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// difference between default parameters
// bind creates a new function (a more specific function based on a more general function)

// a function returning a function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
