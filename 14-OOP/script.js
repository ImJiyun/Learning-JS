'use strict';
// Constructor function : it's not a JS specific term, but a common pattern in many programming languages
// a normal function that is used to create objects
// arrow functions cannot be used as constructors as they do not have their own 'this' context
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // BAD practice: do not add methods to the constructor function
  // if we add methods to the constructor function, every instance will have its own copy of the method
  // it will increase memory usage and is not efficient
  //   this.calcAge = function () {
  //     console.log(2025 - this.birthYear);
  //   };
};

// regular function vs constructor function
// we use constructor functions with the 'new' keyword
const anne = new Person('Anne', 1990);
console.log(anne);

// 1. New empty object is created
// 2. Function is called, this is set to the new object
// 3. New object is linked to the prototype
// 4. Function automatically returns the new object

const mary = new Person('Mary', 1995);
const lilbeth = new Person('Lilbeth', 1998);
console.log(mary);
console.log(lilbeth);

// JS deos not have classes in the traditional sense, but we can use constructor functions to create objects
// constructor functions are a way to create objects with shared properties and methods
// we can say we 'instantiate' an object from a constructor function
console.log(anne instanceof Person); // true
console.log(mary instanceof Person); // true
console.log(lilbeth instanceof Person); // true
console.log(anne instanceof Object); // true
console.log(mary instanceof Object); // true
console.log(lilbeth instanceof Object); // true
/////////////////////////////////////////////////
// Prototypes
// every function (including constuctor function) in JS has a prototype property
// all objects created from the same constructor function share the same prototype
// we can add methods to the prototype property of the constructor function
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
// we can use calcAge method even though it's not defined in the constructor function
// this way, all instances of the Person constructor function will share the same method
anne.calcAge(); // 35
mary.calcAge(); // 30
lilbeth.calcAge(); // 27

// it works because any object always has access the methods and properties from its prototype
console.log(anne.__proto__); // Person { calcAge: [Function] }
console.log(mary.__proto__); // Person { calcAge: [Function] }
console.log(lilbeth.__proto__); // Person { calcAge: [Function] }

console.log(anne.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(anne)); // true
console.log(Person.prototype.isPrototypeOf(mary)); // true
console.log(Person.prototype.isPrototypeOf(lilbeth)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// we can also add properties to the prototype
Person.prototype.species = 'Human'; // adding a property to the prototype
console.log(anne.species); // Human
console.log(mary.species); // Human
console.log(lilbeth.species); // Human

console.log(anne.hasOwnProperty('species')); // false
console.log(mary.hasOwnProperty('species')); // false
console.log(lilbeth.hasOwnProperty('species')); // false
console.log(anne.__proto__.hasOwnProperty('species')); // true
console.log(mary.__proto__.hasOwnProperty('species')); // true
console.log(lilbeth.__proto__.hasOwnProperty('species')); // true
/////////////////////////////////////////////////
// Prototypal inheritance and the prototype chain
// we can create a new constructor function that inherits from the Person constructor function
console.log(anne.__proto__); // Person.prototype
console.log(anne.__proto__.__proto__); // Object.prototype
console.log(anne.__proto__.__proto__.__proto__); // null
// we can see that the prototype chain goes up to Object.prototype, which is the top of the prototype chain
// all objects in JS inherit from Object.prototype
// we can also check the prototype of the Person constructor function
console.log(Person.prototype.__proto__); // Object.prototype
console.log(Person.prototype.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // [Function: Person]

const arr = [1, 2, 3, 4, 5, 5, 5, 5]; // [] === new Array();
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__ == Array.prototype); // true

// we can also add methods to the Array prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // [ 1, 2, 3, 4, 5 ]

const h1 = document.querySelector('h1');
// Elements are also objects and have their own prototype
console.dir(h1.__proto__); // HTMLHeadingElement.prototype
console.dir(h1.__proto__.__proto__); // HTMLElement.prototype
console.dir(h1.__proto__.__proto__.__proto__); // Element.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__); // Node.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // null

console.dir(x => x + 1); // [Function: x]
// functions are also objects and have their own prototype
// so we can call methods on functions