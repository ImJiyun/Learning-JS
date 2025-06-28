// function
// function decalaration
function calAge1(birthYear) {
  return 2037 - birthYear;
}

// parameter : placeholder in the function
// argument : actual value we use to fill the function

const ageOne = calAge1(1992);
console.log(ageOne);

// function expression
// function can be without a name (anonymous function)
// also can be named
// expressions produce values
// functions are just values (they aren't types)
const calAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const ageTwo = calAge2(1991);
console.log(ageTwo);

// function decalaration vs function expression
// we can call function declarations before they are defined in the code
// => hoisting

////////////////////////////////////////////////////////////////////////
// arrays
// a big container into which we can throw variables and then later reference them

// create a new array
const friends = ["Michel", "Steven", "Peter"];
console.log(friends);

const years = new Array(1991, 1984, 2000, 2020);

// pull item out of array
console.log(friends[0]);

console.log(friends.length); // not zero based
console.log(friends[friends.length - 1]); // friends.length - 1 : expression

// mutate the array
friends[2] = "Jay";
console.log(friends); // replace the item

// variables declared with const cannot be changed
// only primitive values are immuatble
// a array is not a primitive value
// what we can't do is to actually replace the entire array
// friends = ["Bob", "Alice"]; // error

// array can hold different types
// bc JS expects expressions (produces a value)
const jonas = ["Jonas", "Schmedtmann", 34, "teacher", friends];
console.log(jonas);

// Exercise
const calAge = function (birthYear) {
  return 2037 - birthYear;
};

const age1 = calAge(years[0]);
const age2 = calAge(years[1]);

const ages = [
  calAge(years[0]),
  calAge(years[1]),
  calAge(years[years.length - 1]),
];

// array methods
// push : adds elements to end of an array
const newLength = friends.push("Alex");
console.log(friends);
// push function returns the length of the new array
console.log(newLength);

// unshift : add elements to the beginning of the array
// also returns the length of the new array
friends.unshift("John");

// remove elements from arrays
// pop : remove the last element of the array
// returns the removed elements
const popped = friends.pop();
console.log(popped);
console.log(friends);

// shift
friends.shift(); // remove the first element
console.log(friends);

// indexOf
// return index at which the element is located
console.log(friends.indexOf("Steven"));
// when call element not inside the array
console.log(friends.indexOf("Bob")); // -1

// includes (ES6)
// return true if the element is in the array
// uses strict equality (it also means it doesnt' do type coercion)
friends.push(23);
console.log(friends.includes("Steven")); // true
console.log(friends.includes("Bob")); // Bob
console.log(friends.includes("23")); // false

if (friends.includes("Peter")) {
  console.log("You have a friend called Peter");
}

////////////////////////////////////////////////////////////////////////
// Object
// in array we can reference data by name but only by their order number
// in object, we define data by key value pairs
// keys are called "properties"

// object literal syntax
const jonasObj = {
  firstName: "Jonas",
  lastName: "Schmedmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michel", "Peter", "Steven"],
};
// objects vs arrays
// order in objects doesn't matter at all when retreving data

// dot vs bracket notations
console.log(jonasObj.lastName);
console.log(jonasObj["lastName"]); // we can put any expression

const nameKey = "Name";
console.log(jonasObj["first" + nameKey]);
console.log(jonasObj["last" + nameKey]);

// dot notation : we have to use real final property name not a computed property name

const interestedIn = prompt(
  "What do you want to know about Jonas? Choese between firstName, lastName, age, job and friends"
);

console.log(jonasObj.interestedIn); // undefined (bc the object doesn't have a interestedIn property)
console.log(jonasObj[interestedIn]);

if (jonasObj[interestedIn]) {
  console.log(jonasObj[interestedIn]);
} else {
  console.log(
    "Wrong request! Choese between firstName, lastName, age, job and friends"
  );
}

// add new properties
jonasObj.location = "Portugal";
jonasObj["twitter"] = "@jonasschmedtman";
console.log(jonasObj);

// Challenge
console.log(
  `${jonasObj.firstName} has ${jonasObj.friends.length} friends, and his best friend is called ${jonasObj.friends[0]}`
);

// object methods

// functions are another type of value and we can create a key value pair
const john = {
  firstName: "john",
  lastName: "trump",
  birthYear: 1992,
  job: "politician",
  friends: ["Micheal", "Peter", "Steven"],
  hasDriverLicense: true,

  // this keyword : the object calling the method
  // calAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // },

  // function decalaration gets an error...
  //   function calAge(birthYear) {
  //     return 2037 - birthYear;
  //   }

  calAge: function () {
    this.age = 2037 - this.birthYear; // create a new property on the current object
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calAge()} old ${this.job}, and he has ${this.hasDriverLicense ? "a" : "no"} driver's license.`;
  },
};

// console.log(john.calAge());
// console.log(john["calAge"](1991));
// inside the bracket it has to be string

console.log(john.calAge());
console.log(john.age);

// challenge
console.log(john.getSummary());

// arrays are objects
// so they have methods that can use 