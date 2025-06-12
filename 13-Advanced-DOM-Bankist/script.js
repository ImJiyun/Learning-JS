'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // returns a NodeList
// NodeList is a collection of nodes, similar to an array, but not an array
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

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
// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // e.target = element (btnScrollTo)
  console.log(e.target);
  // BoundingClientRect is relative to view port

  console.log('Current Scroll (X/Y)', window.scrollX, window.screenY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.screenX,
  //   s1coords.top + window.screenY,
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.screenX,
  //   right: s1coords.top + window.screenY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' }); // works only in modern browser
});
///////////////////////////////////////
// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // #section--1
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // where the event happened
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
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

///////////////////////////////////////
// Event : a signal (something happend, a mouse click...) generated by a certain DOM node
// No matter we listen event or not, it always happens

// mouseenter: it fires whenever a mouse enters a certain element
let h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// another way of attaching event listener : on-event property (old school fashion)
h1.onmouseenter = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

// addEventListener is better...
// we can add multiple event listeners to the same event
// we can remove event listeners if we dont need it anymore (when we want to listen the event only for once)

// 3rd way : HTML attribute
///////////////////////////////////////
// Event Propagation
// Event capturing: the event starts from the root and goes down to the target element
// Event bubbling: the event starts from the target element and then goes up to the root
// Event delegation: we add event listener to a parent element and then we can listen to the events of its children
// Event delegation is better because we can add event listener to a parent element and then we can listen to the events of its children
// we can add event listener to a parent element and then we can listen to the events of its children
// we can add event listener to a parent element and then we can listen to the events of its children
// rgb(255, 255, 255) = white
/*
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
// console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // By default, event listeners listen during the bubbling phase.
  // But they can also be set to listen during the capturing phase by passing 'true' as the third argument.
  // Event listeners on the target element are triggered during the target phase.

  // `this` is the element that the event listener is attached to
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // e.target is where the event originated (not the element on which the handler is attached)
  // e.currentTarget is the element on which the handler is attached
  console.log(e.currentTarget === this); // true

  // stop propagation
  // e.stopPropagation(); // stop the event from bubbling up to the parent elements
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // the container of the links gets the radom color
  this.style.backgroundColor = randomColor();
  // event is generated at the root and then goes down to the target element
  // and then goes up to the root (passing through all the parents)
  console.log('CONTAINER', e.target, e.currentTarget); // e.target is where the event originated (not the element on which the handler is attached)
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget); // e.target is where the event originated (not the element on which the handler is attached)
});
*/

////////////////////////////////////////////////////
// DOM Traversing
// traversing means going up and down the DOM tree
// going down the DOM tree

h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // returns a NodeList
// returns all elements with the class 'highlight' that are children of h1
console.log(h1.childNodes); // returns a NodeList of all child nodes (including text nodes)
console.log(h1.children); // returns an HTMLCollection of all child elements (excluding text nodes)
console.log(h1.firstElementChild); // returns the first child element
console.log(h1.lastElementChild); // returns the last child element
h1.firstElementChild.style.color = 'white'; // change the color of the first child element
h1.lastElementChild.style.color = 'orangered'; // change the color of the last child element

// going upwards: parent
console.log(h1.parentNode); // returns the parent node (can be an element or a text node)
console.log(h1.parentElement); // returns the parent element (always an element)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // returns the closest ancestor element that matches the selector

console.log(h1.closest('h1')); // returns the closest ancestor element that matches the selector (in this case, itself)
console.log(h1.closest('h2')); // returns null, because there is no ancestor element that matches the selector

// going sideways: siblings
// we can only access direct siblings (elements that are next to each other in the DOM tree)
console.log(h1.previousElementSibling); // returns the previous sibling element
console.log(h1.nextElementSibling); // returns the next sibling element

console.log(h1.previousSibling); // returns the previous sibling node (can be an element or a text node)
console.log(h1.nextSibling); // returns the next sibling node (can be an element or a text node)

// all siblings
console.log(h1.parentElement.children); // returns an HTMLCollection of all sibling elements (including itself)
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.color = 'orangered'; // change the color of all sibling elements except itself
    el.style.transform = 'scale(0.5)'; // change the size of all sibling elements except itself
  }
});

///////////////////////////////////////////////
// Tapped component

/*
tabs.forEach(t =>
  t.addEventListener('click', () => {
    console.log('TAB');
  }),
); 
*/
// it's not a good idea to add event listener to each tab, because it will create multiple event listeners
// instead, we can add event listener to the parent element and then use event delegation

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // closest is used to find the closest ancestor element that matches the selector
  console.log(clicked);
  // Guard clause
  if (!clicked) return; // if clicked is null, we return early

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  console.log(clicked.dataset.tab); // dataset is an object that contains all data attributes of the element
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
});

////////////////////////////////////////////////
// Menu fade animation
// Passing arguments to the event handler function
// mouseenter does not bubble up, so we have to use mouseover

const handleHover = function (e) {
  console.log(this, e.currentTarget); // this is the value of the first argument passed to bind (0.5 in this case)
  // e.currentTarget is the element that the event listener is attached to (in this case, nav)
  // e.target is the element that triggered the event (in this case, the link that was hovered over)
  // By default, this keyword is the element that the event listener is attached to
  // but we can change it by using bind, call, or apply methods
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // the element that triggered the event
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // all siblings of the link
    const logo = link.closest('.nav').querySelector('img'); // the logo element

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // change the opacity of all siblings except itself
    });
    logo.style.opacity = this; // change the opacity of the logo
  }
};

// Passing "argument" to the event handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
// bind creates a new function with the this keyword set to the first argument (0.5 in this case)

nav.addEventListener('mouseout', handleHover.bind(1));
// bind creates a new function with the this keyword set to the first argument (1 in this case)

////////////////////////////////////////////////////
// Sticky navigation
// Sticky navigation: make the navigation bar stick to the top of the page when scrolling down
// scroll event is not a good idea to use, because it fires too often
/*
const initialCoords = section1.getBoundingClientRect(); // get the coordinates of the section1 element
// getBoundingClientRect returns an object with the coordinates of the element relative to the viewport
console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  console.log(e); // e is the event object that contains information about the event
  console.log(window.scrollY); // scrollY is the number of pixels that the document has been scrolled vertically

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
////////////////////////////////////////////////////
// Sticky navigation: Intersection Observer API
// Intersection Observer API: allows us to observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport

// whenever the target element (section1) intersects with the root element (viewport by default) at 10%(threshold), the callback function is called
/*
const obsCallback = function (entries, observer) {
  // entries is an array of threshold entries that are being observed
  entries.forEach(entry => {
    console.log(entry); // entry is an object that contains information about the intersection of the target element with the root element
  });
};

// root is the element that we want to observe the intersection with (viewport by default)
// target is the element that we want to observe (section1 in this case)
const obsOptions = {
  root: null, // null means the viewport
  threshold: [0, 0.2], // // threshold is the percentage of the target element that is visible in the root element
  // 0 means the target element is not visible at all, 1 means the target element is fully visible
  // intersectionRatio is 0, if the target element is not visible at all, and 1, if the target element is fully visible
};

// IntersectionObserver is more efficient than scroll event listener, because it only fires when the target element intersects with the root element
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // observe the section1 element
// IntersectionObserver takes a callback function that is called whenever the target element intersects with the root element (viewport by default)
*/

const navHeight = nav.getBoundingClientRect().height; // get the height of the nav element
// getBoundingClientRect returns an object with the coordinates of the element relative to the viewport

const stickyNav = function (entries) {
  const [entry] = entries; // destructuring assignment to get the first entry
  // console.log(entry);
  if (!entry.isIntersecting) {
    // if the target element is not intersecting with the root element (viewport by default)
    nav.classList.add('sticky'); // add the sticky class to the nav element
  } else {
    nav.classList.remove('sticky'); // remove the sticky class from the nav element
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // null means the viewport
  threshold: 0, // 0 means the target element is not visible at all
  rootMargin: `-${navHeight}px`, // margin around the root element (viewport by default), negative value means the target element is not visible until it is 90px above the viewport
  // this is used to make the sticky navigation appear when the header is scrolled out of view
});
headerObserver.observe(header); // observe the header element
////////////////////////////////////////////////////
// Reveling elements on scroll
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // if the target element is not intersecting with the root element (viewport by default)

    entry.target.classList.remove('section--hidden'); // remove the hidden class from the target element

    observer.unobserve(entry.target); // stop observing the target element after it has been revealed
    // this is used to stop observing the target element after it has been revealed, so that it doesn't trigger the callback function again
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null means the viewport
  threshold: 0.15, // 15% of the target element is visible in the root element
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); // observe each section element
  // section.classList.add('section--hidden'); // add a class to hide the section elements initially
  // this is used to hide the section elements initially, so that they can be revealed when they are scrolled into view
});
////////////////////////////////////////////////////
// Lazy loading images
// images can impact the performance of the page, so we can lazy load them
const imgTargets = document.querySelectorAll('img[data-src]'); // select all images with the data-src attribute

const loadImg = function (entries, observer) {
  const [entry] = entries; // destructuring assignment to get the first entry
  // console.log(entry);

  if (!entry.isIntersecting) return; // if the target element is not intersecting with the root element (viewport by default)
  // replace the src attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src; // set the src attribute to the value of the data-src attribute
  // replacing the src attribute with the data-src attribute happens behind the scense
  // the browser will automatically load the image when the src attribute is set
  // Ant it will omit the load event, so we have to listen to the load event to remove the loading class
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // remove the lazy-img class from the target element
  });
  observer.unobserve(entry.target); // stop observing the target element after it has been loaded
  // this is used to stop observing the target element after it has been loaded, so that it doesn't trigger the callback function again
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // null means the viewport
  threshold: 0, // 0 means the target element is not visible at all
  rootMargin: '200px', // margin around the root element (viewport by default), negative value means the target element is not visible until it is 200px above the viewport
  // this is used to make the lazy loading images appear before when they are scrolled into view
});

imgTargets.forEach(img => imgObserver.observe(img));
////////////////////////////////////////////////////
// Slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let curSlide = 0; // current slide index
  const maxSlide = slides.length; // total number of slides

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      // _ is a placeholder for the first argument, which we don't need
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active'); // remove the active class from all dots
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active'); // add the active class to the dot that corresponds to the current slide
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`; // translateX moves the element horizontally
      // we use 100 * (i - slide) to move each slide to the right by 100% of its width
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1)
      curSlide = 0; // if we are at the last slide, go back to the first slide
    else curSlide++; // otherwise, go to the next slide

    // translate value : -100%, 0%, 100%, 200%...
    goToSlide(curSlide);
    activateDot(curSlide); // activate the dot that corresponds to the current slide
  };

  const prevSlide = function () {
    if (curSlide === 0)
      curSlide = maxSlide - 1; // if we are at the first slide, go to the last slide
    else curSlide--; // otherwise, go to the previous slide

    // translate value : -200%, -100%, 0%, 100%...
    goToSlide(curSlide);
    activateDot(curSlide); // activate the dot that corresponds to the current slide
  };

  const init = function () {
    // translate value : 0%, 100%, 200%, 300%...
    goToSlide(0); // go to the first slide
    createDots(); // create dots for each slide
    activateDot(0); // activate the first dot
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // keyboard navigation
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
    // ArrowLeft and ArrowRight are the keys for left and right arrows
    // we can also use e.code to get the code of the key that was pressed
    // e.code is more reliable than e.key, because it returns the code of the key that was pressed, regardless of the keyboard layout
    // e.key is the value of the key that was pressed, which can change depending on the keyboard layout
  });

  // dots navigation (using event delegation)
  dotsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return; // if the clicked element is not a dot, return early

    const { slide } = e.target.dataset; // get the slide index from the data-slide attribute of the clicked dot
    goToSlide(slide); // go to the slide with the index of the clicked dot
    activateDot(slide); // activate the dot with the index of the clicked dot
  });
};

slider();
