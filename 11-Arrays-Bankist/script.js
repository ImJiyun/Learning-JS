'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// instead of working with global variables, start passing the data that function needs
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``;

  // slice method is used for a shallow copy
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} 
          ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    // afterbeginn : just inside the element, before its first child
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  // we don't want a new array but modify the array that we get as an input
  // side effect : to mutate the original accounts array
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        return name[0];
      })
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // default behavior of clicking submit buttion is for the page to reload
  // callback function can get access to the event object
  e.preventDefault(); // prevent the form from submitting (for AJAX)

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  // find returns undefind if no cases match the condition
  console.log(currentAccount);

  // the value of input tag is string
  // optional chaining : pin property only will be read if the currentAccount exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // clear input fields
    console.log('inputLoginUsername', inputLoginUsername);
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur(); // loses its focus

    // update the UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );

  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Basic Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method : extract the part of array, without changing the original array
// 1st param : the index at which we will start extracting
console.log(arr.slice(2)); // return a new array // ["c", "d", "e"]
// end param : is not included in output
console.log(arr.slice(2, 4)); // ["c", "d"]
// negative param : copy from the end of the array
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(-1)); // ["e"]
console.log(arr.slice(1, -2)); // ["b", "c"]

// use slice method to shallow copy of any array
console.log(arr.slice());
console.log([...arr]); // can use spread operator to shallow copy

// Splice method
// simliar to slice, but it changes the original array
console.log(arr.splice(-1)); // ["e"]
// second arg : number of element we want to delete
console.log(arr.splice(1, 2)); // ["b", "c"]
console.log(arr); // original array loses the part extracted

// reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ["f", "g", "h", "i", "j"]
console.log(arr2); // original array is mutated

// concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // this give us the exact same result

// join
// returns a string with the seperator that we specify
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i -

///////////////////////////////////////////////////////////////////////////////////
// forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('--- FOREACH ---');
// forEach is a higher order function which requires a callback function
// forEach function will call the callback function
// loop over the array and in each iteration it will execute callback function
// in each iteration, it will pass the current element of the array as an argument
// it passes the element (the 1st param), the index (the 2nd param), and the entire array (the 3rd param)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0 : function(200)
// 1 : function(450)
// 2 : function(400)
// ...

// continue and break don't work in forEach loop

///////////////////////////////////////////////////////////////////////////////////
// map method
// unlike forEach, map will produce a brand new array

const eurToUsd = 1.1;
// map needs a callback fuction as an argument.
// callback also gets an argument, the current element
// inside callback, we need to return the value that we want the new array to have in the current position
// map returns a brand new array
const movementUSD = movements.map(function (mov) {
  // functional programming
  // function solves problem of creating a new array
  return mov * eurToUsd;
});

console.log(movements); // the original array isn't mutated
console.log(movementUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  // loops the array and manully create a new one
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

// const movementUSDArr = movements.map(mov => mov * eurToUsd);
// console.log(movementUSDArr);

// like forEach, map can access the exact same parameters
const movementsDescriptions = movements.map((mov, i, arr) => {
  // it's the map method which calls the callback
  // it will simply pass in the current element, index, the whole array
  return `Movement ${i + 1}: You ${
    mov > 0 ? `deposited` : `withdrew`
  } ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);

// forEach vs map
// forEach creates a side effect - log the current element in each iteration to the console
// map returns each of item and put them into a new array

///////////////////////////////////////////////////////////////////////////////////
// filter
// filter the elemnts that satisfy a certain condition
const deposits = movements.filter(function (mov) {
  // only if the current condition is true, filter will put the element into a new array
  return mov > 0; // return boolean value
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}
console.log(depositsFor);

const withdrawals = movements.filter(mov => {
  return mov < 0;
});
console.log(withdrawals);

///////////////////////////////////////////////////////////////////////////////////
// reduce method
// boils down all the elements in an array to one single value
// returns a single value
// 1st arg of reduce : a callback function
// 1st arg of callback : accumulator (a snowball that keeps accumulating the value that we want to return)
// 2nd arg of reduce : initial value of the accumulator
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  // callback will be called in each iteration of a looping over the array
  return acc + cur; // add the element to the accumulator
  // in each loop iteration, we return the updated accumulator
}, 100);
console.log(balance);

// for of
// we need an external value
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  // acc here keeps trakc of the current maximum value
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);

///////////////////////////////////////////////////////////////////////////////////
// Chaining methods
// We can only chain a method after a method that returns an array
// filter and map return a new array, reduce returns a value
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// NOTE : DO NOT OVERUSE chaining methods
// chaining lots of method could deteriorate performance
// DO NOT chain a method like splice, or reverse method

///////////////////////////////////////////////////////////////////////////////////
// find
// accepts a condition, a callback function
// it returns an element of the array
// unlike filter method, it will not return a new array, but the first element in the array that satisfies the condition ("JUST ONE VALUE")
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

///////////////////////////////////////////////////////////////////////////////////
// findIndex method
// returns the index of the found element (the first index that matches the condition)
// takes a condition that will return a boolean value
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    // splice method mutates the original array
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// indexOf : takes a value,
// findIndex: takes a condition
///////////////////////////////////////////////////////////////////////////////////
// The New findLast and findLastIndex Methods (ES2023)
// these two methods search from the end of the array
console.log(movements);
const lastWithdrawl = movements.findLast(mov => mov < 0);
console.log('lastWithdrawl');
console.log(lastWithdrawl);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);

console.log(latestLargeMovementIndex);
console.log(
  `Your latest movement was ${
    movements.length > latestLargeMovementIndex - 1
  } movements ago`,
);

///////////////////////////////////////////////////////////////////////////////////
// some method : if any value for which the condition is true, it returns true
console.log(movements);
// inclues : EQUALITY
console.log(movements.includes(-130)); // test if an array inclueds a certain value(true or false)
// includes method tests for equality
// some method tests for a condition

// some : CONDITION
console.log(movements.some(mov => mov === -130)); // true
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > account * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// every
// if all of the elements in the array satisfy the condition, it returns true
// if every element passes the test in callback function, it returns true
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0));

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
///////////////////////////////////////////////////////////////////////////////////
// flat & flatMap method (ES 2019)
// flat : flatten the array in one depth
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat()); // default : 1

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // depth level : 2

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// chaining
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// flatMap method : a combination of flat method and map method
// can flatten only one level
const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
///////////////////////////////////////////////////////////////////////////////////
// sorting arrays
// strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort(); // mutates the original array
console.log(owners);

// numbers
console.log(movements);
// console.log(movements.sort()); // doesn't work as expected
// sort method only works with strings
// it converts the numbers to strings and then sort them

movements.sort((a, b) => {
  // 1st param : current element
  // 2nd param : next element
  // return < 0, A, B (keep order)
  // return > 0, B, A (switch order)
  // ascending order
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
// simplified version
movements.sort((a, b) => a - b); // ascending order

// descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements);
// simplified version
movements.sort((a, b) => b - a); // descending order
///////////////////////////////////////////////////////////////////////////////////
// create and fill arrays

const arr4 = [1, 2, 3, 4, 5, 6, 7];
// empty array
const x = new Array(7); // creates an array with length of 7 (empty argument)

// only one method that can work with empty array
x.fill(1); // fills the array with 1 [1, 1, 1, 1, 1, 1, 1]
// second arg : start index
// 3rd arg: end index
x.fill(1, 3, 5);
console.log(x);
// fill method mutates the original array
arr4.fill(23);
console.log(arr4); // [23, 23, 23, 23, 23, 23, 23]

// Array.from()
// a static method of the Array constructor
// a method that belongs to the Array constructor itself.

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1];

const z = Array.from({ length: 7 }, (curr, idx) => idx + 1); // curr can be replaced with _ (because it's not used now)
console.log(z); //[1, 2, 3, 4, 5, 6, 7]

// iterables (strings, maps, sets) can be converted to arrays using Array.from()
// querySelectorAll returns a NodeList
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );
  console.log(movementsUI);

  // spreading a NodeList also can create an array, but we need to do mapping separately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
