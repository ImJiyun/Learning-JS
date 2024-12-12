'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.starterMenu[mainIndex]];
  },

  // default values : after =
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`,
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient, otherIngredient);
  },
};

///////////////////////////////////////////////////////////////////////////////
// destructuring arrays
// ES6 features
// a way of unpacking values from an object into separate variables

const arr = [2, 3, 4];
let a = arr[0];
let b = arr[1];
let c = arr[2];

let [x, y, z] = arr;
console.log(x, y, z);
// original arrays are not affected (we are not destorying it but unpacking it)
console.log(arr);

const [first, second] = restaurant.categories; // takes the first two elements of the array
console.log(first, second); // Italian, Pizzeria

let [main, , secondary] = restaurant.categories; // skips the second one
console.log(main, secondary); // Italian Vegetarian

// switch variables
[main, secondary] = [secondary, main]; // in this way, we don't need a temporary variable
console.log(main, secondary);

// Receive two return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested array
// destructuring inside destructuring
const nested = [2, 4, [5, 6]];
let [i, , j] = nested;
console.log(i, j); // 2  [5, 6]

const [w, , [e, l]] = nested;
console.log(w, e, l); // 2  5  6

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1
// without default values, r is "undefined"

///////////////////////////////////////////////////////////////////////////////
// destructuring objects
// we need to provide the variable names that exactly match the property names
// that we want to retrieve from the object.

// the order doesn't matter
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// we can reference variable name different from the original property name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default value
// if the property doesn't exist, the default value will be applied
const { menu = [], starterMenu: starters = [] } = restaurant;
// without default value, the menu is undefined

// mutate variables when destructuring object
let m = 111;
let n = 999;
const obj = { m: 23, n: 7, u: 14 };

// m needs to be 23, n needs to be 7
({ m, n } = obj);
console.log(m, n);

// nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelivery({
  time: '22 : 30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

///////////////////////////////////////////////////////////////////////////////
// spread operator
// expand an array into all its element
// unpack all the element at one

const array = [7, 8, 9];
const badNewArray = [1, 2, array[0], array[1], array[2]];
console.log(badNewArray);

const newArray = [1, 2, ...array]; // take all the values out of array and write them individually
console.log(newArray);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// desturturing vs spread operator
// spread operator takes all the elements from the array and doesn't create new variables

// shallow copy and merge two arrays
// copy arrays
const mainMenuCopy = [...restaurant.mainMenu]; // shallow copy

// join 2 arrays
const restaurantMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(restaurantMenu);

// spread operator works on iterables (all arrays, strings, maps, sets but not objects) + objects
const str = 'Jonas';
const letters = [...str, ' ', 'S'];
console.log(letters); // ["J", "o", "n", "a", "s", " ", "S"]

// we can't use spread operators to build a string using a template literal
// console.log(`${...str} Schmedtmann`);

// real world examples
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

restaurant.orderPasta(...ingredients);

// spread operator with objects
const newRestuarant = { ...restaurant, foundedIn: 1998, founder: 'Guiseppe' };
console.log(newRestuarant);

// copy objects
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano

///////////////////////////////////////////////////////////////////////////////
// rest pattern and parameters
// collect multiple elements and condense them into an array

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const array2 = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
[a, b, ...c] = [1, 2, 3, 4, 5];
// collects the elements unused in destruturing assignment

console.log(a, b, c);

const [pizza, , risotto, ...others] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, others);
// rest pattern always must be the last in the destructuring assignment
// only one rest can exist in any destructuring assignment

// objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
// can accept any arbitary amount of arguments
const add = function (...numbers) {
  // rest arguments
  // numbers is an array
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3); // [2, 3]
add(5, 3, 7, 2); // [5, 3, 7, 2]

const f = [23, 5, 7];
add(...f); // spread operator here

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
