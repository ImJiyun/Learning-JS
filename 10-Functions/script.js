"use strict";
////////////////////////////////////////////////////////////////////////////////////
// default parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
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

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", 2);

// skip default parameters
createBooking("LH123", undefined, 1000); // second parameter is undefined, so it will take default value

////////////////////////////////////////////////////////////////////////////////////
// how passing arguments works: value vs reference
const flight = "KR123";
const jiyun = {
  name: "Jiyun Kim",
  passport: 14259208421,
};

const checkIn = function (flightNum, passenger) {
  // flightNum is copy of original value, not itself
  // a completely new variable
  flightNum = "KR999";
  // when we pass an object, we pass a reference to the object
  // so, we can change the object
  passenger.name = "Ms. " + passenger.name;

  if (passenger.passport === 14259208421) {
    alert("Check in");
  } else {
    alert("Wrong passport!");
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
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
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
transformer("Javascript is the best!", upperFirstWord); // we are not calling the function here, we are passing the function
transformer("Javascript is the best!", oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log("👋");
};

// high5 is a callback function that JS will call as soon as the event happens
// addEventListener is a higher-order function
document.body.addEventListener("click", high5);

// forEach accepts callback function
// for each of items in array will call callback function
["Jiyun", "Diane", "Alex"].forEach(high5);

////////////////////////////////////////////////////////////////////////////////////
// Functions returning functions
const greet = function (greeting) {
  return function(name) {
    console.log(`${greeting} ${name}`);
  }
}

const greeterHey = greet("Hey"); // the greeterHey is a value, a function!
// we can now use the greeter function as if was any other function 
greeterHey("Jiyun");
greeterHey("Steven");

// why it works? because of closer

// call it all in one go
greet("hello")("Jiyun");

const greetArrow = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  }
}

greetArrow("Hi")("Alex");