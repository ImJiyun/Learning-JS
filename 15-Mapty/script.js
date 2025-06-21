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

class App {
  #map; // private instance variable
  #mapEvent;

  constructor() {
    this._getPosition();

    // this keyword of the function attacthed to event listener is the element itself
    // so we need to bind the context of this to the current instance
    form.addEventListener('submit', this._newWorkout.bind(this));

    // detect on change of select element
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // get two arugments - all are callback functions
    // first one is executed when successfully getting the location
    // second one is executed when failing to get it
    if (navigator.geolocation) {
      // check if the browser has geolocation API
      // regular function call, this keyword becomes undefined
      // so we use bind to set the context of this to the current instance
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position!');
        },
      );
    }
  }

  _loadMap(position) {
    console.log('position:', position);
    console.log('coords:', position.coords);
    const { latitude, longitude } = position.coords;

    const coords = [latitude, longitude];

    console.log(this);
    // Leftlet gives us L namespace, which gives us functions
    // L is a global object
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // map is comming from Leaflet library
    // on is event handler
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus(); // by doing this, user can type the distance field immediately
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // display marker
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    // add marker on the map
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();
