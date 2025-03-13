### 1. Destructuring Arrays

Unpacking values from arrays into variables:

```javascript
const arr = [2, 3, 4];
let [x, y, z] = arr; // x=2, y=3, z=4
```

##### Skipping elements:

```javascript
const [first, , third] = arr; // first=2, third=4
```

##### Switching variables:

```javascript
let [main, secondary] = ['Italian', 'Vegetarian'];
[main, secondary] = [secondary, main]; // Swap values
```

##### Nested arrays:

```javascript
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested; // i=2, j=5, k=6
```

##### Default values:

```javascript
const [p = 1, q = 1, r = 1] = [8, 9]; // p=8, q=9, r=1
```

### 2. Destructuring Objects

Extract properties into variables:

```javascript
const { name, openingHours, categories } = restaurant;
```

##### Renaming properties:

```javascript
const { name: restaurantName, openingHours: hours } = restaurant;
```

##### Default values:

```javascript
const { menu = [], starterMenu: starters = [] } = restaurant;
```

##### Mutating variables:

```javascript
let m = 111,
  n = 999;
({ m, n } = { m: 23, n: 7 }); // m=23, n=7
```

##### Nested objects:

```javascript
const {
  fri: { open, close },
} = restaurant.openingHours; // open=11, close=23
```

### 3. Spread Operator

Expands elements of an array or object:

```javascript
const array = [7, 8, 9];
const newArray = [1, 2, ...array]; // [1, 2, 7, 8, 9]
```

##### Copying and merging arrays:

```javascript
const mainMenuCopy = [...restaurant.mainMenu];
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
```

##### Spread with objects:

```javascript
const newRestaurant = { ...restaurant, founder: 'Guiseppe' };
```

### 4. Rest Pattern and Parameters

Collects elements into an array:

```javascript
const [pizza, , risotto, ...others] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
```

##### Functions with rest parameters:

```javascript
const add = function (...numbers) {
  let sum = 0;
  for (let num of numbers) sum += num;
  console.log(sum);
};
add(2, 3); // 5
```

### 5. Function Methods in Objects

##### Example - `order` method:

```javascript
restaurant.order = function (starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
};
```

##### Example - `orderDelivery` method:

```javascript
restaurant.orderDelivery = function ({
  starterIndex = 1,
  mainIndex = 0,
  time = '20:00',
  address,
}) {
  console.log(
    `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  );
};
```

### 6. Practical Examples

##### Example - Ordering delivery:

```javascript
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
```

##### Example - Using spread operator:

```javascript
const ingredients = ['tomato', 'cheese', 'basil'];
restaurant.orderPasta(...ingredients);
```

##### Example - Using rest parameters:

```javascript
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
```

### Short Circuiting

- It allows the interpreter to stop evaluating expressions as soon as the result is determined
- NOTE :
  - we can use non-boolean values as operands
  - we can use ANY data type, return ANY data type

#### OR operator(`||`)

- It returns the first truthy value, or last falsy if all values are falsy

```javascript
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); //'Jonas' ("" is a falsy value)
console.log(true || 0); // true
console.log(undefined || null); // null (undefind is a falsy value)

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello' (It is the first value in the chain of OR operations)
```

#### AND operator(`&&`)

- It returns the first falsy value or last truthy if all are true

```javascript
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // "Jonas"

console.log('Hello' && 23 && null && 'Jonas'); // null
```

#### Nullish Coalescing (`??`)

- It returns the first non-nullish value
- Nullish values are `null` and `undefined` (NOT includes `0` or `""`)

```javascript
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 0
```

### Sets

#### Definition

- A **set** is a collection of unique values.
- It is similar to an array, but it does not allow duplicate values.
- The order of elements in a set does not matter.

#### Create a Set

```javascript
const orderSet = new Set([
  'pasta',
  'pizza',
  'risotto',
  'pizza',
  'pasta',
  'pizza',
]);

console.log(orderSet); // "pasta", "pizza", "risotto"
```

#### Properties and Methods

- **`size`**: Returns the number of unique elements in the set.

```javascript
console.log(orderSet.size); // 3
```

- **`has()`**: Checks if an element exists in the set.

```javascript
console.log(orderSet.has('pizza')); // true
console.log(orderSet.has('bread')); // false
```

- **`add()`**: Adds an element to the set. If the element already exists, it is not added again.

```javascript
orderSet.add('garlic bread');
orderSet.add('garlic bread');
console.log(orderSet); // "pasta", "pizza", "risotto", "garlic bread"
```

- **`delete()`**: Deletes an element from the set.

```javascript
orderSet.delete('risotto');
```

- **`clear()`**: Deletes all elements in the set.

```javascript
orderSet.clear();
console.log(orderSet); // Set { }
```

- **Looping over a Set**: Since sets are iterable, you can loop through them.

```javascript
for (const order of orderSet) {
  console.log(order);
}
```

- **Removing duplicates from arrays**: Use a set to remove duplicates from an array.

```javascript
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
console.log(staffUnique); // Set { "Waiter", "Chef", "Manager" }
```

- **Convert a Set to an Array**: You can convert a set back to an array using the spread operator.

```javascript
const staffUniqueArr = [...staffUnique];
console.log(staffUniqueArr); // ["Waiter", "Chef", "Manager"]
```

#### Use Cases

- **How many letters are unique?**

```javascript
console.log(new Set('Jiyun Kim')); // Set { 'J', 'i', 'y', 'u', 'n', ' ', 'K', 'm' }
```

---

### Maps

#### Definition

- a collection of key-value pairs, where both keys and values can be of any type.
- Unlike objects, the keys in maps can be any value (primitive or object).

#### Create a Map

```javascript
const rest = new Map();
rest.set('name', 'Classico Italiano'); // first arg: the key, second arg: the value
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
```

#### Properties and Methods

- **`set()`**: Adds a key-value pair to the map. Chaining is allowed as `set()` returns the map.

```javascript
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
```

- **`get()`**: Retrieves the value based on a key. If the key does not exist, it returns `undefined`.

```javascript
console.log(rest.get('name')); // Classico Italiano
console.log(rest.get('true')); // undefined
```

- **`has()`**: Checks if a map contains a certain key.

```javascript
console.log(rest.has('categories')); // true
```

- **`delete()`**: Deletes a key-value pair from the map based on the key.

```javascript
rest.delete(2); // Deletes the entry with key 2
```

- **`clear()`**: Removes all key-value pairs from the map.

```javascript
rest.clear();
console.log(rest); // Map {}
```

- **Iterating over a Map**: Maps are also iterable, and we can loop through them.

```javascript
for (const [key, value] of rest) {
  console.log(`${key}: ${value}`);
}
```

#### Use Cases

- **Using objects as map keys**: Maps allow objects as keys.

```javascript
const objKey = { name: 'objKey' };
rest.set(objKey, 'Value associated with object key');
console.log(rest.get(objKey)); // "Value associated with object key"
```

- **Converting an object to a map**: You can convert an object to a map using `Object.entries()`.

```javascript
const obj = { a: 1, b: 2, c: 3 };
const objMap = new Map(Object.entries(obj));
console.log(objMap); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
```

- **Example**: Using a map to implement a simple quiz application.

```javascript
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);

// Display question and answers
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
console.log(question.get(question.get('correct') === answer)); // Correct
```

#### Methods to Convert a Map to an Array

```javascript
console.log([...question]); // Convert map to array of entries
console.log([...question.keys()]); // Get all keys as array
console.log([...question.values()]); // Get all values as array
```

---

### Strings

#### Basic String Operations

- **Access characters in a string**: Strings are indexed similarly to arrays, starting from 0.

```javascript
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
```

- **Length of a string**:

```javascript
console.log(airline.length); // 16
console.log('B737'.length); // 4
```

- **`indexOf()`**: Returns the first occurrence of a character.

```javascript
console.log(airline.indexOf('r')); // 6
```

- **`slice()`**: Extracts a part of a string without mutating the original string.

```javascript
console.log(airline.slice(4)); // Air Portugal
```

- **String methods**: Methods like `toLowerCase()` and `toUpperCase()` are used to manipulate the case of a string.

```javascript
console.log(airline.toLowerCase()); // tap air portugal
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
```

---

### Usecase

checks if a baggage contains prohibited items can be implemented with simple string methods.

```javascript
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed to board');
  } else {
    console.log('Proceed to the gate');
  }
};

checkBaggage('knife');
checkBaggage('toothbrush');
```
