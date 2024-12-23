'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
let restaurant = {
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
let { name, openingHours, categories } = restaurant;
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
let { menu = [], starterMenu: starters = [] } = restaurant;
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
let { sat, ...weekdays } = restaurant.openingHours;
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

///////////////////////////////////////////////////////////////////////////////
// for - of loop
// can simply get the elements
menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  // item : the current element in each iteration
  console.log(item);
}

// we can still use continue and break keywords

// it's hard to gain the index of an item
for (const item of menu.entries()) {
  console.log(item);
  console.log(`${item[0] + 1}`);
}

console.log([...menu.entries()]); // a new array which in each position contains a new array which contains the element

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
///////////////////////////////////////////////////////////////////////////////
// enhanced object literal
weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
openingHours = {
  // ES6 feature : computed property name
  // the property names of object are dynamically the computed using the weekdays array
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 feature : shorthand property
  openingHours, // when key and variable name are the same

  // ES6 feature : shorthand methods
  order(starterIndex, mainIndex) {
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
// looping objects

const properties = Object.keys(openingHours);
console.log(properties); // array

let openStr = `We are open on ${properties.length} days: `;

// looping over property names (keys)
for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// looping over property values
const values = Object.values(openingHours);
console.log(values);

// entire object
// entries = names + values
const entries = Object.entries(openingHours);
console.log(entries);

for (let [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

///////////////////////////////////////////////////////////////////////////
// strings
const airline = 'TAP Air Portugal';
const plane = 'A320';

//
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log('B737'[0]); // B

// get the length of strings
console.log(airline.length); // 16
console.log('B737'.length); // 4

// methods
// indexOf : get position of a character. gives the first occurence
console.log(airline.indexOf('r')); // 6
// lastIndexOf : get position of a character. gives the last occurence
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8

// slice : extract a part of a string
// slice method returns a new string
// first argument : start position
// second argument : end position (not included in a new string)
// deosn't mutate the original string
// strings are immutable (primitive values)
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal
// if we don't specify the end position, it will go to the end of the string

// if we use negative values, it will start from the end
console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat ✈️');
  } else {
    console.log('You got lucky 🍀');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// strings are primitive values, why do they have methods?
// when we call a method on a string, JS automatically converts it to a string object
// this is called boxing
// it converts the string to an object, then calls the method, then converts it back to a primitive value
console.log(new String('jonas')); // String {"jonas"}
console.log(typeof new String('jonas')); // object
// all string methods return a primitive value even if called on a string object
console.log(typeof new String('jonas').slice(1)); // string

// changing case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalization in name
const passenger = 'jOnAS'; // it should look like Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing email
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing parts of strings
const priceGB = '288,97£';
// first argument : what we want to replace
// second argument : what we want to replace it with
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // All passengers come to boarding gate 23. Boarding door 23!
// only the first occurence will be replaced
console.log(announcement.replaceAll('door', 'gate')); // All passengers come to boarding gate 23. Boarding gate 23!

// before reaplceAll, the solution was regular expressions
console.log(announcement.replace(/door/g, 'gate')); // All passengers come to boarding gate 23. Boarding gate 23!

// methods that return booleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320')); // true
console.log(plane2.includes('Boeing')); // false
console.log(plane2.startsWith('Airb')); // true
console.log(plane2.endsWith('neo')); // true

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// split and join
console.log('a+very+nice+string'.split('+')); // ["a", "very", "nice", "string"]
console.log('Jonas Schmedtmann'.split(' ')); // ["Jonas", "Schmedtmann"]
// retuns an array

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Mr. Jonas SCHMEDTMANN

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// padding a string
// padStart : add a certain number of characters to a string until the string has a certain length
console.log('Jonas'.padStart(25, '+')); // ++++++++++++++++++++Jonas (entire length is 25)
console.log('Jonas'.padStart(25, '+').padEnd(35, '+')); // ++++++++++++++++++++Jonas+++++++++++++++

const maskCreditCard = function (number) {
  const str = number + ''; // convert to string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(43378463864647384)); // ************7384
console.log(maskCreditCard('43378463864647384')); // ************7384

// repeat method
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInline = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInline(5);
planesInline(3);
planesInline(12);
