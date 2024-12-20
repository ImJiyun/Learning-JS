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
    console.log(2037 - this.year);
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