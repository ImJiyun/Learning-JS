'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal); // NodeList(3) [button.show-modal, button.show-modal, button.show-modal]

const openModal = function () {
  console.log('Button clicked');
  // remove hidden class from modal and overlay
  // classList property returns the class name(s) of an element, as a DOMTokenList object.
  // it has methods for adding, removing and toggling CSS classes.
  console.log(modal.classList); // DOMTokenList ["modal", "hidden"]
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Make the code DRY (Don't Repeat Yourself)
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// work with modals at the same time
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);

  // close the modal when clicking on the close button
  // we do not call the function itself, the JS engine calls it when the event happens
  btnCloseModal.addEventListener('click', closeModal);

  // close the modal when clicking on the overlay
  overlay.addEventListener('click', closeModal);
}

// listen for keyboard events
// keydown event is fired when a key is pressed (any key)
// we need to listen for the Escape key
// event object saves the key that was pressed

// when the key is pressed, the event object is created and passed to the event handler
// the event object has a property called key that tells us which key was pressed
// if the key is Escape, we close the modal
document.addEventListener('keydown', function (e) {
  console.log(e); // KeyboardEvent {isTrusted: true, key: "Escape", code: "Escape", location: 0, ctrlKey: false, …}

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
