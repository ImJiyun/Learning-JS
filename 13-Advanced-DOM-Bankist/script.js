'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // returns a NodeList
// NodeList is a collection of nodes, similar to an array, but not an array

const openModal = function (e) {
  e.preventDefault(); // prevents the default behavior of the element
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// selecting, creating, deleting elements
// selecting elements

// document is not the real element, it's the root of the DOM tree
console.log(document.documentElement); // html element
console.log(document.head); // head element
console.log(document.body); // body element

const header = document.querySelector('.header'); // selects the first element with the class 'header'
const allSections = document.querySelectorAll('.section'); // selects all elements with the class 'section'
// returns a NodeList
console.log(allSections);
document.getElementById('section--1'); // selects the element with the id 'section--1'
// we don't need the # symbol
const allButtons = document.getElementsByTagName('button'); // selects all button elements
// returns an HTMLCollection
// HTMLCollection is live, it updates automatically when the DOM changes
// NodeList is static, it doesn't update automatically
console.log(allButtons);
document.getElementsByClassName('btn'); // selects all elements with the class 'btn'
// returns an HTMLCollection

// creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div'); // accepts the tag name and returns a DOM element
// an object that represents a DOM element
// this element is not yet anywhere in DOM
// we have to manually insert it into the DOM

// add class
message.classList.add('cookie-message');

// add text
message.textContent = 'We use cookies for improved functionality and analytics';

// insert HTML
message.innerHTML =
  'We use cookies for improved functionality and analytics,. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
// prepend adds the element as the first child of the element (in this case, header)
header.append(message);
// append adds the element as the last child
// move the element from being the first child to last child
// DOM elements are unique, it has to be only one

// header.append(message.cloneNode(true));

header.before(message); // insert before to header element
header.after(message); // insert after to header element

// delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

///////////////////////////////////////
// Styles, Attributes, and Classes

// Styles
message.style.backgroundColor = '#37383d'; // set inline style
message.style.width = '120%';

// accessing with style only works with inline style

console.log(message.style.color); // returns nothing
console.log(message.style.backgroundColor); // rgb(55, 56, 61)
console.log(message.style.height); // returns nothing

console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 112px

message.style.height = parseFloat(getComputedStyle(message).height) * 40 + 'px';

// change css variables
// document.documentElement = root
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// JS automatically create attribute properties on the object
console.log('************');
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
console.log(logo.className); // nav__logo

// set attributes
logo.alt = 'Beautiful minmalist logo';

// non-standard
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // jiyun
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // absolute path (http://127.0.0.1:5500/img/logo.png)
console.log(logo.getAttribute('src')); // relative path (img/logo.png)

// data attribute
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
