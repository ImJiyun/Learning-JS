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
