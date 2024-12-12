

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
let [main, secondary] = ["Italian", "Vegetarian"];
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
let m = 111, n = 999;
({ m, n } = { m: 23, n: 7 }); // m=23, n=7
```

##### Nested objects:
```javascript
const { fri: { open, close } } = restaurant.openingHours; // open=11, close=23
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
const newRestaurant = { ...restaurant, founder: "Guiseppe" };
```

### 4. Rest Pattern and Parameters
Collects elements into an array:

```javascript
const [pizza, , risotto, ...others] = [...restaurant.mainMenu, ...restaurant.starterMenu];
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
restaurant.orderDelivery = function ({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
  console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
};
```

### 6. Practical Examples

##### Example - Ordering delivery:
```javascript
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});
```

##### Example - Using spread operator:
```javascript
const ingredients = ["tomato", "cheese", "basil"];
restaurant.orderPasta(...ingredients);
```

##### Example - Using rest parameters:
```javascript
restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");
```
