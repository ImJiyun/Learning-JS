'use strict';

// calcAge : defined in a global scope
function calcAge(birthYear) {
  // this function also creates its own scope equivalent to the variable environment of execution context
  const age = 2037 - birthYear;
  // console.log(firstName); // firstName is in global scope so through scope chain, it's avaiable

  function printAge() {
    let output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      var minllenial = true;
      // creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';
      const str = `Oh, and you're a minllenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // Reassigining outer scope's variable
      output = 'NEW OUTPUT!';
    }
    console.log(minllenial);
    // console.log(str); // reference error
    // add(2, 3); // reference error
    console.log(output); // NEW OUTPUT
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age); // only inner scope can have access to the variables of its outer scope

////////////////////////////////////////////////////////////////////////////////////////////////
// hoisting

// Variables
console.log(me); // hoisted to undefined
// console.log(job); // reference error : cannot access job before initialization
// console.log(year); // reference error

var me = 'Jiyun';
let job = 'student';
const year = 2024;

// Functions
console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 3)); // reference error : cannot access addExpr before initialization
console.log(addArrow); // undefined
// console.log(addArrow(2, 3)); // reference error : addArrow is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

var x = 1;
let y = 2;
const z = 3;

// variables with var create property on window object
console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

////////////////////////////////////////////////////////////////////////////////////////////////
// this keyword
console.log(this); // window object

// regular function (not inside object)
const calculateAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined (bc this is strict mode)
};

calculateAge(1991);

// arrow function
// lexical this keyword : it uses this keyword of its parent scope
const calculateAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window
};

calculateAgeArrow(1991);

// method
// this : the object calling the method
const jiyun = {
  year: 2010,
  calcAge: function () {
    console.log(this); // jiyun
    // console.log(2037 - this.year);
  },
};
jiyun.calcAge();

const matilda = {
  year: 2017,
};

// method borrowing
matilda.calcAge = jiyun.calcAge; // copy caclAge method from jiyun to matilda
matilda.calcAge(); // this keyword = matilda

// this = object that is calling the method,
// even though this keyword is in jiyun object, it points to matilda object

const f = jiyun.calcAge; // copy the function, it's possible bc function is just a variable

f(); // this keyword = undefined
// f is a regular function call (there is no owner of f function)

////////////////////////////////////////////////////////////////////////////////////////////////
// arrow function

// var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // jonas object
    console.log(2037 - this.year);

    // solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(this); // undefined
    //   // console.log(this.year) >= 1981 && this.year <= 1996;
    //   console.log(self) >= 1981 && self <= 1996;
    // };

    // solution 2
    const isMillenial = () => {
      console.log(this); // jonas object
      console.log(this.year) >= 1981 && this.year <= 1996;
    };

    isMillenial();
  },

  greet: () => {
    console.log(this); // window object
    console.log(`Hey ${this.firstName}`);
  },
};

jonas.greet(); // this keyword = undefined
// arrow function doesn't get its own this keyword
// it uses this keyword of its parent scope
// jonas is not a code block, it's an object literal
// all of the code is in the global scope
// this = window object -> this.firstName = undefined
// bc when we try to access a propety that doesn't exist in an object, it returns undefined

// var variables create property on window object

// function inside method
jonas.calcAge();

////////////////////////////////////////////////////////////////////////////////////////////////
// arguments keyword
const expr = function (a, b) {
  console.log(arguments); // array-like object
  return a + b;
};

expr(2, 3);
expr(2, 3, 4, 5);

const arrow = (a, b) => {
  console.log(arguments); // reference error
  return a + b;
};
arrow(2, 3);

////////////////////////////////////////////////////////////////////////////////////////////////
// object references
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
// jessica is a reference to the object in the memory heap
// call stack holds the reference to the object in the memory heap

// copying object
// const marriedJessica = jessica; // we didn't create a new object, we just copied the reference
// marriedJessica.lastName = 'Davis';

function marrayPerson(originalPerson, newLastName) {
  // objects are not copied when we pass them into a function
  // reference (orginalPerson) is passed to the function
  originalPerson.lastName = newLastName;
  return originalPerson;
}

const marriedJessica = marrayPerson(jessica, 'Davis');

console.log('Before marriage:', jessica); // this original object is also changed
console.log('After marriage:', marriedJessica);

// what we can't do : assign a new object
// jessica = {
//   x : 23;
// }

jessica.age = 30; // possible bc we're not changing the reference

// copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// shallow copy : only the first level of the object is copied
const jessicaCopy = { ...jessica2 }; // place all properties of jessica2 into jessicaCopy
// new object is created in the memory heap
jessicaCopy.lastName = 'Davis';
console.log(jessica2, jessicaCopy);
// but this is not perfect deep copy

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before', jessica2);
console.log('After', jessicaCopy);

// deep copy (deep clone)
const jessicaClone = structuredClone(jessica2);
jessicaClone.family.push('Mary');
jessicaClone.family.push('John');

console.log("Original's family", jessica2.family);
console.log("Clone's family", jessicaClone.family);
