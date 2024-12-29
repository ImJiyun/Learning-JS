## Working with Arrays

### **Array Methods in JavaScript**

Arrays are objects in JavaScript, and like other objects, they can have methods attached to them. Array methods are built-in functions that operate on arrays. These methods are useful for manipulating, transforming, and iterating through arrays.

---

### **Basic Array Methods**

#### **1. slice()**
- **Purpose**: Extracts a portion of an array and returns a new array without modifying the original one.
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

#### **2. splice()**
- **Purpose**: Modifies the original array by adding/removing elements at a specific position.
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

#### **3. reverse()**
- **Purpose**: Reverses the order of elements in the array.
- **Syntax**: `array.reverse()`
  - **Note**: Mutates the original array.

**Example**:
```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.reverse()); // ['e', 'd', 'c', 'b', 'a']
console.log(arr); // Original array is reversed.
```

#### **4. concat()**
- **Purpose**: Combines two or more arrays into one new array.
- **Syntax**: `array.concat(array2, array3, ...)`
- **Note**: Does not modify the original arrays.

**Example**:
```javascript
let arr1 = ['a', 'b', 'c'];
let arr2 = ['d', 'e', 'f'];
let combined = arr1.concat(arr2);
console.log(combined); // ['a', 'b', 'c', 'd', 'e', 'f']
```

#### **5. join()**
- **Purpose**: Combines all elements of the array into a single string with a specified separator.
- **Syntax**: `array.join(separator)`
  - `separator`: The string to separate elements. Default is a comma `,`.

**Example**:
```javascript
let arr = ['a', 'b', 'c'];
console.log(arr.join('-')); // 'a-b-c'
```

---

### **Iterating Over Arrays**

#### **1. forEach()**
- **Purpose**: Executes a provided function on each element in the array.
- **Syntax**: `array.forEach(callback(currentValue, index, array))`
  - `callback`: A function that takes three arguments: `currentValue`, `index`, and the `array`.

**Example**:
```javascript
let movements = [200, 450, -400, 3000, -650];
movements.forEach(function(mov, i) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
```

**Note**: `forEach()` does not return anything and does not allow for breaking out of the loop.

---

### **Transforming Arrays**

#### **1. map()**
- **Purpose**: Creates a new array with the results of calling a provided function on every element in the array.
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

#### **2. filter()**
- **Purpose**: Creates a new array with all elements that pass a test implemented by the provided function.
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

### **Reducing Arrays**

#### **1. reduce()**
- **Purpose**: Applies a function to each element in the array (from left to right) to reduce it to a single value.
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

#### **Finding Maximum Value**

```javascript
const max = movements.reduce((acc, mov) => (acc > mov ? acc : mov), movements[0]);
console.log(max); // 3000
```

---

### **Data Transformations Using map, filter, and reduce**

1. **map()**:
   - Transforms the data and returns a new array.
   - Example: Converting all elements in the array to another form (e.g., converting currency).
   
2. **filter()**:
   - Filters elements based on a condition and returns a new array with only the elements that pass the test.
   - Example: Extracting only positive numbers from an array.

3. **reduce()**:
   - Reduces all elements to a single value (e.g., sum of elements).
   - Example: Calculating the total balance from an array of deposits and withdrawals.

--- 
