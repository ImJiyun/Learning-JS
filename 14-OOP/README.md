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
