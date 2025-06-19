## Geolocation API

### Definition

- A browser-provided API to access the user's current geographic location (like latitude and longitude).
- It **requires the user's permission** to get their location.

```js
if (navigator.geolocation) {
```

- This checks if the browser supports the Geolocation API.
- Not all browsers may support it, so it’s a **safe check** before using it.

```js
  navigator.geolocation.getCurrentPosition(
```

- This method tries to get the user's current position.
- It takes **two callback functions** as arguments:

  1. One for when the location is successfully obtained.
  2. One for when the location fetch fails.

```js
    function (position) {
      console.log(position.coords);
```

- The **first callback** is triggered **on success**.
- The `position` object contains a `coords` property, which holds all location-related data.

```js
const { latitude, longitude } = position.coords;
console.log(latitude);
console.log(longitude);
```

- This uses **destructuring** to extract `latitude` and `longitude` from the `coords` object.
- These values can then be used to display a map, send to a server, etc.

```js
    },
    function () {
      alert('Could not get your position!');
    },
```

- The **second callback** is triggered **on failure** (e.g., user denies permission, or there's an error).

#### `position.coords`

If successful, `position.coords` might look like this:

```js
{
  latitude: 37,
  longitude: 127,
  accuracy: 51,
  altitude: null,
  speed: null,
  ...
}
```

### Notes

- Location access **requires user permission**.
- It only works on **secure (HTTPS) connections** in most modern browsers.
