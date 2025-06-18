'use strict';
// Constructor function : it's not a JS specific term, but a common pattern in many programming languages
// a normal function that is used to create objects
// arrow functions cannot be used as constructors as they do not have their own 'this' context
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // BAD practice: do not add methods to the constructor function
  // if we add methods to the constructor function, every instance will have its own copy of the method
  // it will increase memory usage and is not efficient
  //   this.calcAge = function () {
  //     console.log(2025 - this.birthYear);
  //   };
};

// regular function vs constructor function
// we use constructor functions with the 'new' keyword
const anne = new Person('Anne', 1990);
console.log(anne);

// 1. New empty object is created
// 2. Function is called, this is set to the new object
// 3. New object is linked to the prototype
// 4. Function automatically returns the new object

const mary = new Person('Mary', 1995);
const lilbeth = new Person('Lilbeth', 1998);
console.log(mary);
console.log(lilbeth);

// JS deos not have classes in the traditional sense, but we can use constructor functions to create objects
// constructor functions are a way to create objects with shared properties and methods
// we can say we 'instantiate' an object from a constructor function
console.log(anne instanceof Person); // true
console.log(mary instanceof Person); // true
console.log(lilbeth instanceof Person); // true
console.log(anne instanceof Object); // true
console.log(mary instanceof Object); // true
console.log(lilbeth instanceof Object); // true
/////////////////////////////////////////////////
// Prototypes
// every function (including constuctor function) in JS has a prototype property
// all objects created from the same constructor function share the same prototype
// we can add methods to the prototype property of the constructor function
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
// we can use calcAge method even though it's not defined in the constructor function
// this way, all instances of the Person constructor function will share the same method
anne.calcAge(); // 35
mary.calcAge(); // 30
lilbeth.calcAge(); // 27

// it works because any object always has access the methods and properties from its prototype
console.log(anne.__proto__); // Person { calcAge: [Function] }
console.log(mary.__proto__); // Person { calcAge: [Function] }
console.log(lilbeth.__proto__); // Person { calcAge: [Function] }

console.log(anne.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(anne)); // true
console.log(Person.prototype.isPrototypeOf(mary)); // true
console.log(Person.prototype.isPrototypeOf(lilbeth)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// we can also add properties to the prototype
Person.prototype.species = 'Human'; // adding a property to the prototype
console.log(anne.species); // Human
console.log(mary.species); // Human
console.log(lilbeth.species); // Human

console.log(anne.hasOwnProperty('species')); // false
console.log(mary.hasOwnProperty('species')); // false
console.log(lilbeth.hasOwnProperty('species')); // false
console.log(anne.__proto__.hasOwnProperty('species')); // true
console.log(mary.__proto__.hasOwnProperty('species')); // true
console.log(lilbeth.__proto__.hasOwnProperty('species')); // true
/////////////////////////////////////////////////
// Prototypal inheritance and the prototype chain
// we can create a new constructor function that inherits from the Person constructor function
console.log(anne.__proto__); // Person.prototype
console.log(anne.__proto__.__proto__); // Object.prototype
console.log(anne.__proto__.__proto__.__proto__); // null
// we can see that the prototype chain goes up to Object.prototype, which is the top of the prototype chain
// all objects in JS inherit from Object.prototype
// we can also check the prototype of the Person constructor function
console.log(Person.prototype.__proto__); // Object.prototype
console.log(Person.prototype.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // [Function: Person]

const arr = [1, 2, 3, 4, 5, 5, 5, 5]; // [] === new Array();
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__ == Array.prototype); // true

// we can also add methods to the Array prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // [ 1, 2, 3, 4, 5 ]

const h1 = document.querySelector('h1');
// Elements are also objects and have their own prototype
console.dir(h1.__proto__); // HTMLHeadingElement.prototype
console.dir(h1.__proto__.__proto__); // HTMLElement.prototype
console.dir(h1.__proto__.__proto__.__proto__); // Element.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__); // Node.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object.prototype
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__,
); // null

console.dir(x => x + 1); // [Function: x]
// functions are also objects and have their own prototype
// so we can call methods on functions
/////////////////////////////
// Prototypal inheritance with classes
// ES6 classes are just syntactical sugar over constructor functions

// class expression
// const PersonCl = class {};

// behind the scene, classes are functions

// class declaration
class PersonCl {
  // when we create an instance from a class, the constructor method is called
  // constructor method is a special method that is called when we create an object from the class
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // instance method
  // every method defined in the class (outside of the constructor) is added to the prototype of the class
  // so all instances of the class share the same method
  // this is more memory efficient than adding methods to the constructor function (all instances would have their own copy of the method)
  calcAge() {
    console.log(2025 - this.birthYear);
  }

  // getter methods are special methods that allow us to access properties as if they were regular properties
  // they are defined with the 'get' keyword
  // they are attached to the prototype of the class
  // we can use them like properties, without calling them as methods
  get age() {
    return 2025 - this.birthYear;
  }

  // if the name of setter method is the same as the name of a property, it will override the property
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
  // Static Method
  static heyThere() {
    console.log('Hey there!');
  }
}

const jane = new PersonCl('Jane Davis', 1992);
console.log(jane); // PersonCl { firstName: 'Jane', birthYear: 1992 }
jane.calcAge(); // 33

console.log(jane.__proto__); // PersonCl.prototype
console.log(jane.__proto__ === PersonCl.prototype); // true

PersonCl.prototype.greet = function () {
  console.log(`Hello, my name is ${this.firstName}`);
};
jane.greet(); // Hello, my name is Jane
console.log(jane.__proto__.hasOwnProperty('greet')); // true
console.log(jane.hasOwnProperty('greet')); // false

// 1. Classes are not hoisted, so we cannot use them before they are declared
// 2. Just like functions, classes are first-class citizens, so we can pass them as arguments, return them from functions, and assign them to variables
// 3. Classes are executed in strict mode, so we don't need to use 'use strict' at the top of the file
// 4. Classes can have static methods, which are called on the class itself, not on the instance
/////////////////////////////
// Getters and Setters
// They are accessors that allow us to define methods that can be used as properties
const account = {
  owner: 'Jiyun',
  movements: [200, 450, -400, 3000],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // any setter method must have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // 3000
account.latest = 50; // we can use the setter like a property
console.log(account.movements); // [ 200, 450, -400, 3000, 50 ]
console.log(account.latest); // 50

console.log(jane.age); // 33

// getters and setters are useful for data validation
const walter = new PersonCl('Walter White', 1965);
walter.fullName = 'Walter'; // Walter is not a full name!
walter.fullName = 'Walter White'; // no error
console.log(walter.fullName); // Walter White
////////////////////
// Static methods
// static methods are called on the class itself, not on the instance
// they are defined with the 'static' keyword
// they are attached to the class prototype, not the instance prototype (__proto__)
// they are attacted to entire constructor function, not to the instance
// from method is a static method on Array
// They are useful for utility functions that are not related to a specific instance
Person.heyThere = function () {
  console.log('Hey there!');
  // this keyword refers to the object that the method is called on
  // in this case, it's the Person class itself
  console.log(this); // Person
};
Person.heyThere(); // Hey there!
// anne.heyThere(); // TypeError: anne.heyThere is not a function. (In 'anne.heyThere()', 'anne.heyThere' is undefined)

PersonCl.heyThere(); // Hey there!
// jane.heyThere(); // TypeError: jane.heyThere is not a function. (In 'jane.heyThere()', 'jane.heyThere' is undefined)
//////////////////////
// Object.create()
// Object.create() is a method that allows us to create an object with a specific prototype
const personProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },
  species: 'Human',
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
// we can create an object with the personProto as its prototype
const jiyun = Object.create(personProto);
jiyun.firstName = 'Jiyun';
jiyun.birthYear = 1990;
console.log(jiyun); // { firstName: 'Jiyun', birthYear: 1990 }

console.log(jiyun.__proto__); // { calcAge: [Function: calcAge], species: 'Human' }
console.log(jiyun.__proto__ === personProto); // true

jiyun.calcAge(); // 35
console.log(jiyun.species); // Human
console.log(jiyun.hasOwnProperty('firstName')); // true
console.log(jiyun.hasOwnProperty('birthYear')); // true
console.log(jiyun.hasOwnProperty('calcAge')); // false
console.log(jiyun.hasOwnProperty('species')); // false
console.log(jiyun.__proto__.hasOwnProperty('calcAge')); // true
console.log(jiyun.__proto__.hasOwnProperty('species')); // true
console.log(jiyun.__proto__.hasOwnProperty('firstName')); // false
console.log(jiyun.__proto__.hasOwnProperty('birthYear')); // false
// Object.create() is useful when we want to create an object with a specific prototype without using a constructor function

const sarah = Object.create(personProto);
sarah.init('Sarah', 1995);
console.log(sarah); // { firstName: 'Sarah', birthYear: 1995 }
sarah.calcAge(); // 30
/////////////////////////////////////////////////
// Inheritance between classes
/*
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // BAD practice: do not add methods to the constructor function
  // if we add methods to the constructor function, every instance will have its own copy of the method
  // it will increase memory usage and is not efficient
  //   this.calcAge = function () {
  //     console.log(2025 - this.birthYear);
  //   };
};
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
*/
const Student = function (firstName, birthYear, course) {
  // Person(firstName, birthYear); // error because regular function does not have 'this' context in global scope (strict mode)
  // call the Person constructor function with the current context (this)
  Person.call(this, firstName, birthYear); // this will set 'this' to the new object created by the Student constructor function
  this.course = course;
};

// we can set the prototype of Student to be an instance of Person
// we have to do this before adding methods to the Student prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`,
  );
};

const edward = new Student('Edward', 1998, 'Computer Science');
console.log(edward); // Student { firstName: 'Edward', birthYear: 1998, course: 'Computer Science' }
edward.introduce(); // Hello, my name is Edward and I study Computer Science.
edward.calcAge(); // 27

console.log(edward.__proto__); // Student.prototype
console.log(edward.__proto__.__proto__); // Person.prototype
console.log(edward.__proto__.__proto__ === Person.prototype); // true

console.log(edward instanceof Student); // true
console.log(edward instanceof Person); // true
console.log(edward instanceof Object); // true

Student.prototype.constructor = Student; // we have to set the constructor property back to Student
/////////////////////////////////////////////
// ES6 Classes with Inheritance
class StudentCl extends PersonCl {
  // extends keyword is used to inherit from another class
  constructor(fullName, birthYear, course) {
    // call the parent constructor with the current context (this)
    // super is a special keyword that calls the parent constructor
    super(fullName, birthYear); // this will set 'this' to the new object created by the StudentCl constructor function
    // super keyword must be called before using 'this' in the constructor because it initializes the 'this' context
    this.course = course;
  }

  // instance method
  introduce() {
    console.log(
      `Hello, my name is ${this.fullName} and I study ${this.course}.`,
    );
  }

  // overriding the calcAge method from the parent class
  calcAge() {
    console.log(
      `I'm ${2025 - this.birthYear} years old and I feel more like ${2025 - this.birthYear + 10} years old.`,
    );
  }
}

const charlie = new StudentCl('Charlie Brown', 2000, 'Mathematics');
console.log(charlie); // StudentCl { fullName: 'Charlie Brown', birthYear: 2000, course: 'Mathematics' }
charlie.introduce(); // Hello, my name is Charlie Brown and I study Mathematics.
charlie.calcAge(); // 25
////////////////////////////////////////////
// Object.create() with Inheritance
const jake = Object.create(personProto);

const StudentProto = Object.create(personProto);

StudentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear); // call the parent init method
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`,
  );
};
StudentProto.calcAge = function () {
  console.log(2025 - this.birthYear);
};

const kate = Object.create(StudentProto);
kate.init('Kate', 1999, 'Physics');
console.log(kate); // { firstName: 'Kate', birthYear: 1999, course: 'Physics' }
kate.introduce(); // Hello, my name is Kate and I study Physics.
kate.calcAge(); // 26
////////////////////////////////////////
// Anohter class example
// 1) public (instance) fields -> these fields will not get inherited by the instances of the class
// 2) private fields -> it can't be accessed outside the class
// 3) public methods
// 4) private methods
// static methods of these 4

// field is like a property, but it is defined in the class body
class Account {
  // these are same as initializing properties in the constructor
  locale = navigator.language;
  bank = 'Bank of JS';
  #movements = []; // private field, it cannot be accessed outside the class
  #pin; // variable with let

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.locale = navigator.language; // get the user's locale from the browser
    console.log(`Thanks for opening an account, ${this.owner}!`);
  }

  // public interface (API)
  getMovements() {
    return this.#movements;
    // not chainable
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // return the instance to allow method chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this; // return the instance to allow method chaining
  }

  #approveLoan(val) {
    // fake approval logic
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan of ${val} approved!`);
    }
    return this; // return the instance to allow method chaining
  }
}

const acc1 = new Account('Diane', 'EUR', 1111);
console.log(acc1); // Account { owner: 'Diane', currency: 'EUR', pin: 1111 }

// deposit value
// acc1.movements.push(200);
// console.log();
acc1.deposit(200);
acc1.withdraw(450);
acc1.requestLoan(1000);
// acc1.approveLoan(1000);

console.log(acc1);
// console.log(acc1.#movements); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
////////////////////////////
// Chaining methods
// we can chain methods by returning the instance from the methods
// these methods need to be called on the instance
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .deposit(100)
  .requestLoan(500)
  .getMovements();

console.log(movements);
