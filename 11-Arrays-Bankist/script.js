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
const displayMovements = function (movements) {
  containerMovements.innerHTML = ``;
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} 
          ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    // afterbeginn : just inside the element, before its first child
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

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

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

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
  return `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`;
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
