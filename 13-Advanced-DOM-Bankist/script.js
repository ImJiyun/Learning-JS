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

document.querySelector('.header'); // selects the first element with the class 'header'
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