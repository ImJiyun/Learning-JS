# Object Oriented Programming

## What is OOP?

- OOP is a programming paradiam based on the concepts of objects
- We use objects to **describe** real-world or abstract features
- Objects may contain data (properties) and code (methods). By using objects, we pack **data and the corresponding behavior** into one block
- In OOP, objects are **self-contained** pieces/blocks of code
- Objects are building blocks of applications, and interact with one another
- Interactions happen through a **public interface** (API) methods that the code **outside** of the object can access and use to communicate with the object
- OOP was developed with the goal of **organizing** code, to make it **more flexiable and easier to maintain** (avoid "spaghetti code")

## Classes and Instances

1. Class

- A blueprint from which we can create new objects
- It packs data and the correspoding behavior

2. Instance

- A real object that we can use in code, made from the class
- A real house created from an abstract blueprint

## 4 Fundamental OOP Principles

1. Abstraction

- Ignores or hides details that don't matter
- Allows us to get an **overview** perspective the thing we're implementing, instead of messing with details that don't matter

2. Encapsulation

- Keeps properties and method **private** inside the class, so they are **not accessible from outside the class**
- Some methods can be exposed as public interface (API)
- Prevents external code from accidentally manipulating internal properties/state
- Allows to change internal implementation without the risk of breaking external code

3. Inheritance

- Makes all properties and methods of a certain class **available to a child class**, forming a hierarchical relationship between classes
- Allows us to **reuse common logic** and to model real-world relationships
- Child class can have own methods and properties

4. Polymorphism

- A child class can **overwrite** a method it inherited from a parent class

## OOP in JavaScript

### Definition

- Objects are **linked** to a prototype object (Each object has a certain prototype)
- **Prototypal inheritance**: The prototype contains methods (behavior) that are **accessible to all objects linked to that prototype**
- Behavior is **delegated** to the linked prototype object
- Example
  - Array.prototype is the prototype of all array objects. Therefore, all arrays have access to the map method

### Prototypal Inheritance vs Classical Inheritance

#### **Conceptual Model**

| Aspect                | Prototypal Inheritance (JavaScript)                 | Classical Inheritance (Java, C++, etc.)   |
| --------------------- | --------------------------------------------------- | ----------------------------------------- |
| **Core idea**         | Objects inherit from other **objects**              | Classes define blueprints for **objects** |
| **Structure**         | Inheritance is **instance-based**                   | Inheritance is **class-based**            |
| **Flexibility**       | More **dynamic**, objects can be changed at runtime | More **static**, rigid structure          |
| **Instance creation** | Clone from another object                           | Instantiate from a class                  |
| **Inheritance chain** | Objects linked via prototype chain                  | Class hierarchy (parent → child)          |

#### Prototypal Inheritance (JS)

```javascript
const animal = {
  eats: true,
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats); // true (inherited from animal)
```

- Inheritance is done via object chaining (`Object.create`, `__proto__`, or class sugar syntax).
- Can create and extend objects on the fly.
- ES6 `class` is syntactic sugar for this prototype chain.

#### Classical Inheritance (Java-style)

```java
class Animal {
    boolean eats = true;
}

class Dog extends Animal {
    boolean barks = true;
}

Dog dog = new Dog();
System.out.println(dog.eats); // true
```

- Classes define types.
- Objects are instances of classes.
- Inheritance is declared statically (`extends`, `implements`).

---

#### **Use in JavaScript**

- JavaScript has **no native classes** (until ES6's `class`, which is still prototype-based internally).
- All inheritance in JS is ultimately **prototype delegation**.
- Prototypal inheritance supports more **composition over inheritance**, and is often seen as more flexible.

### 3 ways of implementing prototypal inheritance in JavaScript

1. Constructor functions

- Technique to create objects from a function
- This is how built-in objects like Arrays, Maps, or Sets are actually implemented

2. ES6 Classes

- Modern alternative to constructor function syntax
- "Syntantic suger" : behind the scenes, ES6 classes work exactly like constructor functions
- ES6 classes do NOT behave like classes in "classical OOP"

3. `Object.create()`

- The easiest and most straightword way of linking an object to a prototype object

## Constructor Functions

- a normal function that is used to create objects

```js
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const anne = new Person('Anne', 1990);
const mary = new Person('Mary', 1995);
const lilbeth = new Person('Lilbeth', 1998);
```

### What `new Person()` does behind the scence

1. Creates a new empty object

```js
const anne = {};
```

2. Sets the internal prototype (`__proto__`) of the new object to the constructor's prototype:

```js
anne.__proto__ = Person.prototype;
```

3. Executes the constructor with this bound to the new object

```js
Person.call(obj, 'Anne', 1990);
```

4. The new object is returned from the constructor function call

### `instanceof`

- JavaScript does not have classes in the traditional sense, but we can use constructor functions to create objects
- constructor functions are a way to create objects with shared properties and methods
- Therefore, we can say we 'instantiate' an object from a constructor function

```js
console.log(anne instanceof Person); // true
console.log(mary instanceof Person); // true
console.log(lilbeth instanceof Person); // true
console.log(anne instanceof Object); // true
console.log(mary instanceof Object); // true
console.log(lilbeth instanceof Object); // true
```

## Prototypes

- every function (including constuctor function) in JS has a `prototype` property
- all objects created from the same constructor function share the same prototype
- we can add methods to the prototype property of the constructor function

```js
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
```

- we can use `calcAge` method even though it's not defined in the constructor function
  - Imagin if the `calAge` function is attacted to all objects, it will impact code performance
- this way, all instances of the `Person` constructor function will share the same method

```js
anne.calcAge(); // 35
mary.calcAge(); // 30
lilbeth.calcAge(); // 27
```

- it works because any object always has access the methods and properties from its prototype

```js
console.log(anne.__proto__); // Person { calcAge: [Function] }
console.log(mary.__proto__); // Person { calcAge: [Function] }
console.log(lilbeth.__proto__); // Person { calcAge: [Function] }

console.log(anne.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(anne)); // true
console.log(Person.prototype.isPrototypeOf(mary)); // true
console.log(Person.prototype.isPrototypeOf(lilbeth)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
```

- NOTE : `Person.prototype` is **NOT** of Person, but objects **created by** `Person`
- we can also add properties to the prototype

```js
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
```

## Prototype Chain

- Each object is connected to a prototype and has ability of looking up methods and properties
- `Person.prototype` itself is an object and every object in JS has a prototype
- Therefore, `Person.prototype` must also have a prototype, which is `Object.prototype`
- It's created by the object constructor function (`new Object()`, `{}`)
  - `Person.prototype.__proto__ === Object.prototype`
- Prototype Chain is series of links between objects, linked through prototypes
  - `Object.prototype.__proto__ === null`
- `hasOwnProperty` doesn't be copied to instance objects, they inherited the method from `Object.prototype` through the prototype chain

```js
console.log(anne.__proto__); // Person.prototype
console.log(anne.__proto__.__proto__); // Object.prototype
console.log(anne.__proto__.__proto__.__proto__); // null
// we can see that the prototype chain goes up to Object.prototype, which is the top of the prototype chain
// all objects in JS inherit from Object.prototype
// we can also check the prototype of the Person constructor function
console.log(Person.prototype.__proto__); // Object.prototype
console.log(Person.prototype.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // [Function: Person]
```

### Elements

- Elements are also objects and have their own prototype

```js
const h1 = document.querySelector('h1');

console.dir(h1.__proto__); // HTMLHeadingElement.prototype
console.dir(h1.__proto__.__proto__); // HTMLElement.prototype
console.dir(h1.__proto__.__proto__.__proto__); // Element.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__); // Node.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget.prototype
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object.prototype
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__,
); // null
```

### Functions

- functions are also objects and have their own prototype
- so we can call methods on functions

```js
console.dir(x => x + 1); // [Function: x]
```

## ES6 Classes

- Classes in JavaScript don't work like traditional classes
- They are syntatic suger
- They still implement prototypal inheritance

### `constructor`

```js
class PersonCl {
  constructor(firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}
```

```js
const jane = new PersonCl('Jane', 1992);
console.log(jane); // PersonCl { firstName: 'Jane', birthYear: 1992 }
```

- when we create an instance from a class, the constructor method is called
- constructor method is a special method that is called when we create an object from the class

### instance method

```js
class PersonCl {
  constructor(firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // instance method
  calcAge() {
    console.log(2025 - this.birthYear);
  }
}
```

```js
jane.calcAge(); // 33

console.log(jane.__proto__ === PersonCl.prototype); // true
```

- every method defined in the class (outside of the constructor) is added to the prototype of the class
- so all instances of the class share the same method
- this is more memory efficient than adding methods to the constructor function (all instances would have their own copy of the method)

```js
PersonCl.prototype.greet = function () {
  console.log(`Hello, my name is ${this.firstName}`);
};
jane.greet(); // Hello, my name is Jane
```

- We can still manually add methods to the prototype, even when using classes
- The code above is same as:

```js
class PersonCl {
  constructor(firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  greet() {
    console.log(`Hello, my name is ${this.firstName}`);
  }
}
```

### Getters and Setters

- They are accessors that allow us to define methods that can be used as properties
- Getters are defined with the `get` keyword
- Setters are defined with the `set` keyword

```js
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
```

### getters and setters in a class

```js
class PersonCl {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2025 - this.birthYear);
  }

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
}
```

```js
const walter = new PersonCl('Walter White', 1965);
walter.fullName = 'Walter'; // Walter is not a full name!
walter.fullName = 'Walter White'; // no error
console.log(walter.fullName); // Walter White
```

#### **Getter**

- A **getter** is called when we **access** a property
- It allows you to define custom logic for returning a value
- We don’t use parentheses when calling it

```js
get age() {
  return 2025 - this.birthYear;
}
```

- Usage:

  ```js
  person.age; // This automatically calls the getter method
  ```

---

#### **Setter**

- A **setter** is called when we **assign a value** to a property
- It can include validation or other logic before saving the value

```js
set fullName(name) {
  if (name.includes(' ')) this._fullName = name;
  else console.log(`${name} is not a full name!`);
}
```

- Usage:

  ```js
  person.fullName = 'Charlotte Windsor'; // Calls the setter
  ```

#### How it works

```js
constructor(fullName, birthYear) {
  this.fullName = fullName; // Calls the setter
  this.birthYear = birthYear;
}
```

- When `this.fullName = fullName` is executed, it actually **calls the setter** `set fullName(...)`, not directly assign the value
- Inside the setter, the name is validated before assigning to `this._fullName`

---

#### Why use `_fullName`?

- If we try to assign to `this.fullName` inside the setter itself, it would recursively call the setter again and again → **infinite loop**
- To avoid that, developers use a different internal property name (like `_fullName`)
- This is a **common convention**, though the underscore is not required

---

#### How the getter is used

```js
console.log(person.fullName);
```

- When we read `person.fullName`, it actually **calls the getter** `get fullName()`, which returns `this._fullName`

## static method

- Static methods are methods that are called **on the class itself**, not on instances of the class
- They are typically used for **utility functions** or **helper methods** that don’t need access to instance-specific data
- Example: `Array.from()` is a static method provided by the built-in Array class

### Constructor Functions

```js
Person.heyThere = function () {
  console.log('Hey there!');
  // this keyword refers to the object that the method is called on
  // in this case, it's the Person class itself
  console.log(this); // Person
};
Person.heyThere(); // Hey there!
```

- Here, we manually add a static method to the constructor function `Person`
- `this` inside the static method refers to the constructor function (`Person`), not an instance

```js
anne.heyThere(); // TypeError: anne.heyThere is not a function. (In 'anne.heyThere()', 'anne.heyThere' is undefined)
```

- We cannot call a static method on an instance like `jane`
- Static methods belong **only** to the class (or constructor function), not to its instances

### Classes

```js
class PersonCl {
  constructor(fullName, birthYear) {
    // instance properties
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // instance method
  calcAge() {
    console.log(2025 - this.birthYear);
  }

  get age() {
    return 2025 - this.birthYear;
  }

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
```

```js
PersonCl.heyThere(); // Hey there!
```

- The `static` keyword is used to define static methods in a class
- `PersonCl.heyThere()` works because the method is defined on the class
- `jane.heyThere()` would throw an error because the method is not on the prototype or instance

## `Object.create()`

- a method used to create a new object with a specified prototype and optional property descriptors

```js
Object.create(prototype, propertiesObject);
```

- `prototype`: The object which should be the prototype of the newly-created object
- `propertiesObject` (optional): An object whose properties are added to the new object with the same behavior as `Object.defineProperties()`

```js
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

const jiyun = Object.create(personProto);
jiyun.firstName = 'Jiyun';
jiyun.birthYear = 1990;
```

- `jiyun` inherits from person, but it's a separate object

```javascript
console.log(jiyun.hasOwnProperty('firstName')); // true
console.log(jiyun.hasOwnProperty('birthYear')); // true
```

These return `true` because `firstName` and `birthYear` are **directly defined on the `jiyun` object**

- Either we assigned them directly (e.g., `jiyun.firstName = 'Jiyun'`),
- or we set them using a method like `init`, which assigns them to `this` (which refers to `jiyun`)

```javascript
console.log(jiyun.__proto__.hasOwnProperty('firstName')); // false
console.log(jiyun.__proto__.hasOwnProperty('birthYear')); // false
```

These return `false` because `firstName` and `birthYear` are **not defined directly on `jiyun.__proto__`**, the same as `personProto`

- `hasOwnProperty()` only checks **direct (own) properties** of the object
- Since `firstName` and `birthYear` were added directly to `jiyun`, not `personProto`, they are not own properties of `jiyun.__proto__`

## Inheritance

### Constructor Functions

We use constructor functions and manually set up inheritance through `call()` and `Object.create()`

```js
const Person = function (firstName, birthYear) {
  // Instance properties: these will be attached directly to the created object
  this.firstName = firstName;
  this.birthYear = birthYear;
};
```

- This is a constructor function for `Person`
- When called with `new`, it creates a new object and binds `this` to that object

```js
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
```

- This defines a method on the prototype, not on each instance
- All instances created with `new Person()` will share this method (memory-efficient)

```js
const Student = function (firstName, birthYear, course) {
  // We don't use Person() directly here because regular function does not have 'this' context in global scope (strict mode)
  // Instead, we use call() to call Person and bind its 'this' to the new Student instance
  Person.call(this, firstName, birthYear);

  // Add a new property specific to Student
  this.course = course;
};
```

- We're trying to "inherit" properties from `Person`, so we use `Person.call(...)` to copy them
- This is called _constructor inheritance_ (also known as constructor borrowing)

```js
Student.prototype = Object.create(Person.prototype);
```

- It sets up the prototype chain so that instances of `Student` also inherit methods from `Person.prototype`.
- `Student.prototype` now points to an object that delegates to `Person.prototype`

```js
Student.prototype.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`,
  );
};
```

- We add a method specific to `Student`, not present in `Person`

```js
const edward = new Student('Edward', 1998, 'Computer Science');
```

- This creates a `Student` object that:

  - Has its own properties: `firstName`, `birthYear`, `course`
  - Inherits `introduce()` from `Student.prototype`
  - Inherits `calcAge()` from `Person.prototype` via the prototype chain

```js
edward.introduce(); // Hello, my name is Edward and I study Computer Science.
edward.calcAge(); // 27
```

```js
console.log(edward.__proto__); // Student.prototype
console.log(edward.__proto__.__proto__); // Person.prototype
console.log(edward.__proto__.__proto__ === Person.prototype); // true
```

- This shows the prototype chain:

  - `edward` → `Student.prototype` → `Person.prototype` → `Object.prototype`

```js
console.log(edward instanceof Student); // true
console.log(edward instanceof Person); // true
console.log(edward instanceof Object); // true
```

- `instanceof` checks the prototype chain
- Since `edward.__proto__` → `Student.prototype` and that in turn leads to `Person.prototype`, all `instanceof` checks pass

```js
Student.prototype.constructor = Student;
```

- Important fix!
- When we did `Student.prototype = Object.create(...)`, we _lost_ the original `constructor` reference
- Now we restore it so that `edward.constructor === Student` again

---

### ES6 Classes (Syntactic Sugar for Constructor Functions)

```js
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // call the constructor of PersonCl
    this.course = course;
  }

  introduce() {
    console.log(
      `Hello, my name is ${this.fullName} and I study ${this.course}.`,
    );
  }

  calcAge() {
    console.log(
      `I'm ${2025 - this.birthYear} years old and I feel more like ${2025 - this.birthYear + 10} years old.`,
    );
  }
}
```

- `class` is syntactic sugar for constructor functions
- `extends` automatically sets the prototype chain
- `super()` is mandatory before using `this` in the constructor. It calls the parent constructor (`PersonCl`)
- We can override methods by redefining them in the subclass, like `calcAge()` here

```js
const charlie = new StudentCl('Charlie Brown', 2000, 'Mathematics');
charlie.introduce(); // Hello, my name is Charlie Brown and I study Mathematics.
charlie.calcAge(); // I'm 25 years old and I feel more like 35 years old.
```

- The same logic as before: `charlie` inherits from `StudentCl`, which inherits from `PersonCl`

---

### Object.create() (Pure Prototypal Inheritance)

This style doesn't use constructors or classes. It uses **prototype chaining directly**

```js
const jake = Object.create(personProto);
```

- Creates an empty object `jake` that delegates to `personProto`

```js
const StudentProto = Object.create(personProto);
```

- Create a prototype for students that itself inherits from `personProto`

```js
StudentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear);
  this.course = course;
};
```

- `init()` works like a constructor, but it must be called manually
- It calls the parent `init` to initialize shared properties

```js
StudentProto.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`,
  );
};

StudentProto.calcAge = function () {
  console.log(2025 - this.birthYear);
};
```

- We manually define methods on the prototype object

```js
const kate = Object.create(StudentProto);
kate.init('Kate', 1999, 'Physics');
kate.introduce(); // Hello, my name is Kate and I study Physics.
kate.calcAge(); // 26
```

- `kate` is an object that:

  - Delegates to `StudentProto`
  - Which itself delegates to `personProto`

- This is the most **low-level**, explicit form of prototype-based inheritance in JS.

## Encapsulation

### Definition

- Encapsulation means keeping certain **data (properties)** and **logic (methods)** **private** inside a class
- The goal is to **protect internal state and behavior**, so they **can’t be accessed or modified from outside** the class
- Instead, we expose specific methods for interaction — this becomes the **public API** of class

### Why Encapsulation?

- To **prevent accidental data corruption** from outside code
- To make the class **easier to maintain and update**, since internal logic can change without affecting external code
- To **clearly separate what’s internal vs. external**

### Note

JavaScript was originally a **prototype-based** language, not class-based like Java or C++
However, with the introduction of modern features like `class`, `#private`, etc., JavaScript now supports class-style encapsulation too

### Example

```js
class Account {
  // Public fields (not in constructor, declared directly in class body)
  locale = navigator.language;
  bank = 'Bank of JS';

  // Private fields: these start with '#' and are only accessible inside the class
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;       // Public property
    this.currency = currency; // Public property
    this.#pin = pin;          // Private field
    console.log(`Thanks for opening an account, ${this.owner}!`);
  }
```

```js
  // Public method: exposes private data safely
  getMovements() {
    return this.#movements;
  }

  // Public method: allows deposits
  deposit(val) {
    this.#movements.push(val);
  }

  // Public method: allows withdrawals by depositing negative values
  withdraw(val) {
    this.deposit(-val);
  }

  // Private method: can't be accessed from outside the class
  #approveLoan(val) {
    // Internal logic to approve loans (fake in this case)
    return true;
  }

  // Public method that uses private logic internally
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan of ${val} approved!`);
    }
  }
}
```

```js
const acc1 = new Account('Diane', 'EUR', 1111);
console.log(acc1);
// Account {
//   owner: 'Diane',
//   currency: 'EUR',
//   locale: 'en-US',
//   bank: 'Bank of JS',
//   #movements: [...],
//   #pin: ...
// }
```

```js
acc1.deposit(200);
acc1.withdraw(450);
acc1.requestLoan(1000);
```

- These methods work because they are **public** and defined in the class
- Internally, they use and modify the **private fields** like `#movements` and `#pin`

```js
acc1.approveLoan(1000);
// Error: Cannot access private method '#approveLoan' from outside the class
```

```js
console.log(acc1.#movements);
// SyntaxError: Private field '#movements' must be declared in an enclosing class
```

- These lines throw errors as trying to access a **private field/method** from outside the class, which is not allowed

## Chaining methods

- we can chain methods by returning the instance from the methods
- These methods need to be called on the instance

```js
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .deposit(100)
  .requestLoan(500)
  .getMovements();

console.log(movements);
```
