'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// get two arugments - all are callback functions
// first one is executed when successfully getting the location
// second one is executed when failing to get it
if (navigator.geolocation) {
  // check if the browser has geolocation API
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log('position:', position);
      console.log('coords:', position.coords);
      const { latitude, longitude } = position.coords;

      const coords = [latitude, longitude];

      // Leftlet gives us L namespace, which gives us functions
      // L is a global object
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // map is comming from Leaflet library
      // on is event handler
      // Handling clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus(); // by doing this, user can type the distance field immediately
      });
    },
    function () {
      alert('Could not get your position!');
    },
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  // add marker on the map
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minwidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      }),
    )
    .setPopupContent('workout')
    .openPopup();
});

// detect on change of select element
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
