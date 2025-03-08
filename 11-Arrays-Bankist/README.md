## Working with Arrays

[1. slice() ](#1-slice) <br>
[2. splice() ](#2-splice) <br>
[3. reverse() ](#3-reverse) <br>
[4. concat() ](#4-concat) <br>
[5. join() ](#5-join) <br>
[6. forEach() ](#1-foreach) <br>
[7. map() ](#1-map) <br>
[8. filter() ](#2-filter) <br>
[9. reduce() ](#1-reduce) <br>
[10. find(), findIndex(), findLast(), findLastIndex()](#find-findindex-findlast-findlastindex) <br>
[11. some(), every()](#some-every) <br>
[12. flat(), flatMap()](#flat-flatmap) <br>
[13. sort()](#sorting-arrays-in-javascript) <br>
[14. fill(), Array.from()](#creating-and-filling-arrays)

### Array Methods in JavaScript

Arrays are objects in JavaScript, and like other objects, they can have methods attached to them. Array methods are built-in functions that operate on arrays. These methods are useful for manipulating, transforming, and iterating through arrays.

---

### Basic Array Methods

#### 1. `slice()`

- Extracts a portion of an array and returns a new array without modifying the original one.
- **Syntax**: `array.slice(startIndex, endIndex)`
  - `startIndex`: The index where extraction starts (inclusive).
  - `endIndex`: The index where extraction ends (exclusive).
  - Negative indices can be used to start from the end of the array.

**Examples**:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); // ["c", "d", "e"]
console.log(arr.slice(2, 4)); // ["c", "d"]
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(-1)); // ["e"]
console.log(arr.slice(1, -2)); // ["b", "c"]
```

**Note**: `slice()` does not modify the original array.

#### 2. `splice()`

- Modifies the original array by adding/removing elements at a specific position.
- **Syntax**: `array.splice(startIndex, deleteCount, item1, item2, ...)`
  - `startIndex`: The index at which to start changing the array.
  - `deleteCount`: The number of elements to remove from the array.
  - `item1, item2, ...`: Optional items to add to the array.

**Examples**:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.splice(1, 2)); // Removes 'b' and 'c', returns ["b", "c"]
console.log(arr); // ['a', 'd', 'e']
```

**Note**: `splice()` changes the original array.

#### 3. `reverse()`

- Reverses the order of elements in the array.
- **Syntax**: `array.reverse()`
  - **Note**: Mutates the original array.

**Example**:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.reverse()); // ['e', 'd', 'c', 'b', 'a']
console.log(arr); // Original array is reversed.
```

#### 4. `concat()`

- Combines two or more arrays into one new array.
- **Syntax**: `array.concat(array2, array3, ...)`
- **Note**: Does not modify the original arrays.

**Example**:

```javascript
let arr1 = ['a', 'b', 'c'];
let arr2 = ['d', 'e', 'f'];
let combined = arr1.concat(arr2);
console.log(combined); // ['a', 'b', 'c', 'd', 'e', 'f']
```

#### 5. `join()`

- Combines all elements of the array into a single string with a specified separator.
- **Syntax**: `array.join(separator)`
  - `separator`: The string to separate elements. Default is a comma `,`.

**Example**:

```javascript
let arr = ['a', 'b', 'c'];
console.log(arr.join('-')); // 'a-b-c'
```

---

### Iterating Over Arrays

#### 1. `forEach()`

- Executes a provided function on each element in the array.
- **Syntax**: `array.forEach(callback(currentValue, index, array))`
  - `callback`: A function that takes three arguments: `currentValue`, `index`, and the `array`.

**Example**:

```javascript
let movements = [200, 450, -400, 3000, -650];
movements.forEach(function (mov, i) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
```

**Note**: `forEach()` does not return anything and does not allow for breaking out of the loop.

---

### Transforming Arrays

#### 1. `map()`

- Creates a new array with the results of calling a provided function on every element in the array.
- **Syntax**: `array.map(callback(currentValue, index, array))`
  - Returns a new array.

**Example**:

```javascript
let movements = [200, 450, -400, 3000, -650];
const eurToUsd = 1.1;
const movementUSD = movements.map(mov => mov * eurToUsd);
console.log(movementUSD); // [220, 495, -440, 3300, -715]
```

**Note**: Unlike `forEach()`, `map()` returns a new array with transformed data.

#### 2. `filter()`

- Creates a new array with all elements that pass a test implemented by the provided function.
- **Syntax**: `array.filter(callback(currentValue, index, array))`
  - The callback should return a boolean value.

**Example**:

```javascript
let movements = [200, 450, -400, 3000, -650];
const deposits = movements.filter(mov => mov > 0);
console.log(deposits); // [200, 450, 3000]
```

**Note**: `filter()` creates a new array with elements that meet the condition.

---

### Reducing Arrays

#### 1. `reduce()`

- Applies a function to each element in the array (from left to right) to reduce it to a single value.
- **Syntax**: `array.reduce(callback(accumulator, currentValue, index, array), initialValue)`
  - `accumulator`: Accumulates the result.
  - `initialValue`: Optional initial value for the accumulator.

**Example**:

```javascript
let movements = [200, 450, -400, 3000, -650];
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // 2600
```

**Note**: `reduce()` is often used for summing, multiplying, or finding other aggregate values.

#### Finding Maximum Value

```javascript
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0],
);
console.log(max); // 3000
```

---

### Data Transformations Using `map`, `filter`, and `reduce`

1. `map()`:
   - Transforms the data and returns a new array.
   - Example: Converting all elements in the array to another form (e.g., converting currency).
2. `filter()`:

   - Filters elements based on a condition and returns a new array with only the elements that pass the test.
   - Example: Extracting only positive numbers from an array.

3. `reduce()`:
   - Reduces all elements to a single value (e.g., sum of elements).
   - Example: Calculating the total balance from an array of deposits and withdrawals.

---

### `find`, `findIndex`, `findLast`, `findLastIndex`

1. `find()`

- it returns the first element in an array that satisfies the condition

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  const firstWithdrawl = movements.find(mov => mov < 0);
  console.log(firstWithdrawl); // -400
  ```

2. `findIndex()`

- it returns the index of first found element in the array
- difference with `indexOf()` :

  - `findIndex()` : takes a condition
  - `indexOf()` : takes a value

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  const firstWithdrawlIdx = movements.findIndex(mov => mov < 0);
  console.log(firstWithdrawlIdx); // 2
  ```

3. `findLast()`

- it searchs from the end of an array and returns the value of the first element that satisfies the condition

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  const lastWithdrawl = movements.findLast(mov => mov < 0);
  console.log(lastWithdrawl); // -650
  ```

4. `findLastIndex()`

- - it searchs from the end of an array and returns the index of first found element in the array

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  const lastWithdrawlIdx = movements.findLastIndex(mov => mov < 0);
  console.log(lastWithdrawl); // 4
  ```

### `some`, `every`

1. `some()`

- tests if at least one element in the array that passes the condition
- difference with `includes`

  - `includes` method tests for equality
  - `some` method tests for a condition

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  console.log(movements.some(mov => mov > 0)); // true
  ```

2. `every()`

- tests if all elements in the array pass the condition

  **Example**:

  ```javascript
  let movements = [200, 450, -400, 3000, -650];
  console.log(movements.every(mov => mov > 0)); // false
  ```

---

### `flat()`, `flatMap()`

1. `flat()`

- creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
- **Syntax** : `flat()` / `flat(depth)`

  - depth : how deep a nested array structure should be flattened (default value : 1)

  **Example**

  ```javascript
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

  const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
  console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]
  ```

2. `flatMap()`

- A combination of flat method and map method
- Unlike `flat()`, it can flatten only one level
- **Syntax** : `flatMap(callbackFn)` /
  `flatMap(callbackFn, thisArg)`

  **Example**

  ```javascript
  const overalBalance3 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
  ```

---

## Sorting Arrays in JavaScript

### Sorting Strings

```javascript
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort(); // Mutates the original array
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach']
```

---

### Sorting Numbers

#### Default `.sort()` Behavior

- By default, `.sort()` converts numbers to strings and sorts them lexicographically.
- This approach doesn't work as expected for numerical sorting.

```javascript
const movements = [200, -100, 50, -75, 300];
console.log(movements);
console.log(movements.sort()); // Not suitable for numbers
```

---

### Custom Sorting with Compare Function

#### Logic of the Compare Function

- **Parameters**: `a` (current element) and `b` (next element).
- **Return Values**:
  - `< 0`: Keeps the order (A, B).
  - `> 0`: Switches the order (B, A).

#### Ascending Order

```javascript
movements.sort((a, b) => {
  if (a > b) return 1; // Switch order
  if (a < b) return -1; // Keep order
});
console.log(movements); // [-100, -75, 50, 200, 300]
```

**Simplified Version**:

```javascript
movements.sort((a, b) => a - b); // a - b ensures ascending order
console.log(movements); // [-100, -75, 50, 200, 300]
```

---

#### Descending Order

```javascript
movements.sort((a, b) => {
  if (a > b) return -1; // Keep order
  if (a < b) return 1; // Switch order
});
console.log(movements); // [300, 200, 50, -75, -100]
```

**Simplified Version**:

```javascript
movements.sort((a, b) => b - a); // b - a ensures descending order
console.log(movements); // [300, 200, 50, -75, -100]
```

---

### Creating and filling arrays

#### `fill()`

- changes all elements within a range of indices in an array to a static value
- It mutates the original array
- **Syntax** :
  `fill(value, start, end)`
  - `value` (required): value to fill the array with
  - `start` (optional): the starting index to fill a value
  - `end` (optional): the final index to fill a value

**Example**

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7); // creates an array with length of 7 (empty argument)

// only one method that can work with empty array
x.fill(1);
console.log(x); // [1, 1, 1, 1, 1, 1, 1]
x.fill(1, 3, 5);
console.log(x);
arr.fill(23);
console.log(arr); // [23, 23, 23, 23, 23, 23, 23]
```

#### `Array.from()`

- It creates a new, shallow-copied Array instance from an iterable or array-like object
- a static method of the `Array` constructor
- a method that belongs to the `Array` constructor itself.
- **Syntax** : `Array.from(arrayLike, mapFunction, thisArg);`
  - `arrayLike` : array-like or iterable object that will be converted into an array
  - `mapFunction` : mapping function
  - `thisArg` : this value inside the `mapFunction`

**Example**

```javascript
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1];

const z = Array.from({ length: 7 }, (curr, idx) => idx + 1); // curr can be replaced with _ (because it's not used now)
console.log(z); //[1, 2, 3, 4, 5, 6, 7]
```
