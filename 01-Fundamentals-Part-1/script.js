// javascript is a high level, object oriented, multi-paradigm programming lanugage
// programming language : instruct computer to do things
// high-level : we don't have to worry about complex stuff like memory management
// object-oriented : based on objects for storing most kinds of data
// multi-paradigm : we can use different styles of programming

// ES stands for ECMAScript
// ES6 - biggest update to the language ever
// after ES6, we call it modern javascript

let js = "amazing";
/*
if (js === "amazing") {
  alert("Javascript 
  */
console.log(40 + 8 - 23);

// variable : a box into which we can store a value
// later declare it, we can use it over and over agian
let firstName = "Jonas";
// use camelCase (it's convention)
// for constant, use captials for all characters
// don't start with numbers
// don't use reserved keyword(new, function)
console.log(firstName);
// make sure to write the variable name descriptive
let myFirstJob = "Programmer"; // this one is much better
let job1 = "programmer";
console.log(myFirstJob);

// data types
// all values are object or primitive
// 7 primitive data types
// number : floating point numbers => used for decimals and integers
// string : sequence of characters => used for text
// boolean : logical type that can only be true or false => used for taking decisions
// undefined : value taken by a variable that is not yet defined // let children;
// null : also means empty value
// symbol : value that's unique and cannot be changed
// BigInt : larger integers than the number type can hold

// JS has dynamic typing : we don't have to manually define the data type of the value stored in a variable
// Instead, data types are determind automatically
// it's the value that has a type not the variable!
// we can assign a new value with a different data type to the same variable
// we can initally assign number, later then string

// data types
let javascriptIsFun = true;
console.log(javascriptIsFun);

// typeof operator
console.log(typeof true); // boolean
console.log(typeof javascriptIsFun); // boolean
console.log(typeof 23); // number
console.log(typeof "Jonas"); // string

// dynamic value typing : we can easily change the type of a value
javascriptIsFun = "YES!"; // assign a new value to already exising variable
console.log(typeof javascriptIsFun); // string

// undefined : a value taken by a variable that's not yet defined (an empty value)
let year;
console.log(year);
console.log(typeof year); // undefined

year = 1991;
console.log(typeof year); // number

console.log(typeof null); // should return null but object (it's a bug in JS)

// let, const, var
// let, const were introduced in ES6

// let : can be reassigned later or can mutate the variable
// also can declare an empty variable
let age = 30;
age = 31; // assign a new value to an existing variable

// const : are used when we don't want to change
// it's a immutable variable
// we cannot declare empty const variables
let birthYear = 1991;
// birthYear = 1990;
// const job;

// var
// can be mutated
var job = "programmer";
job = "teacher";

// basic operators
// arithmetic operator
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2010;
console.log(ageJonas);
console.log(ageSarah);

console.log(ageJonas * 2, ageJonas / 2, 2 ** 3);

firstName = "Jonas";
const lastName = "Schemedtmann";
console.log(firstName + " " + lastName); // concatenate string

// assignment operator

let x = 10 + 5; // 15
x += 10;
x++;
x--;
x *= 4;
console.log(x);

// comparison operator
console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(isFullAge);

// template literals
firstName = "Jonas";
job = "teacher";
birthYear = 1991;

const jonas = `I'm ${firstName}, a ${job}, ${2024 - birthYear} year old`;
console.log(jonas);

console.log(`Just a regular string...`);

console.log(`String with \n\
  multiple \n\
  lines`);

// can be used when typing multiple lines
console.log(`String
  multiple
  lines`);

// if - else
// control structure
const isOldEnough = age >= 18;
if (isOldEnough) {
  console.log(`Sarah can start driving license 🚗`);
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young, Wait another ${yearsLeft} years :) `);
}

// type conversion and coercion
// type conversion : we manually convert from one type to another
// type coercion : JS converts automatically for us

// 1) convert to number
const inputYear = "1991";
console.log(inputYear + 18); // 199118
console.log(Number(inputYear) + 18);
// Number : convert to number
// the original value is not converted

console.log(Number("Jonas")); // NaN (Not A Number) : invalid number

// 2) convert to string
console.log(String(23));

// 3) convert to boolean

// type coercion
console.log("I'm " + 23 + " years old"); // produce string
// + operator converts numbers to strings
console.log("23" - "10" - 3); // 10
// - operator converts strings to numbers
console.log("21" * "3"); // 63
console.log("21" / "3"); // 7

let n = "1" + 1; // "11"
n = n - 1;
console.log(n); // 10

console.log("10" - "4" - "3" - 2 + "5"); // 15

// truthy and falsy values
// falsy values are values that are not exactly false,
// but will become false when we try to convert them into a boolean

// 5 falsy values : 0, '', undefined, null, NaN
// truthy values : other values

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("Jonas")); // true
console.log(Boolean({})); // empty object -> true
console.log(Boolean("")); // empty string -> false

const money = 0;
if (money) {
  // logical context -> JS coerce any value into a boolean
  console.log("Don't spend it all ;)");
} else {
  // this code gets executed
  console.log("You should get a job!");
}

let height;
if (height) {
  console.log("YAY! Height is defined!");
} else {
  console.log("Height is UNDEFINED");
}

// Equality operators : == , ===
// === : strict equality operator (it doesn't perform type coercion)
// == : loose equality operator (it does type coercion)

console.log("18" == 18); // true
console.log("18" === 18); // false

age = 10;
if (age === 18) console.log("You just became an adult (strict)");
if (age == 18) console.log("You just became an adult (loose)");
// clean code: avoid loose equality operator as much as you can

const favorite = Number(prompt("What's your favorite number?")); // prompt returns string

console.log(favorite);
console.log(typeof favorite); // number

if (favorite === 23) {
  console.log("Cool! 23 is an amazing number");
} else if (favorite === 7) {
  console.log("Cool! 7 is also a cool number");
} else {
  console.log("Number is not 23 or 7");
}

if (favorite !== 23) console.log("Why not 23?");

// logical operators
const hasDriverLicnese = true;
const hasGoodVision = false;

console.log(hasDriverLicnese && hasGoodVision); // true
console.log(hasDriverLicnese || hasGoodVision); // false
console.log(!hasDriverLicnese); // false

const shouldDrive = hasDriverLicnese && hasGoodVision;

if (shouldDrive) {
  console.log("Sarah is able to drive");
} else {
  console.log("Someone else should drive");
}

const isTired = true;
console.log(hasDriverLicnese || isTired); // true

// switch
const day = "monday";

// it does strict equality
switch (day) {
  case "monday": // day === "monday"
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theroy videos");
    break;
  case "wednesday":
  case "thrusday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend :D");
  default:
    console.log("Not a valid day");
}

// statements and expressions
// expressions : pieces of code that produces a value
3 + 4;
1991;
true && false;

// statements : a bigger piece of code which doesn't produce a value itself
// if - else statement
if (23 > 10) {
  const str = "23 is bigger"; // str : expressions
}
