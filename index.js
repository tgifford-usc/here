// make variables for the html elements
const latitudeReadout = document.getElementById("latitudeReadout");
const longitudeReadout = document.getElementById("longitudeReadout");
const mainContainer = document.getElementById("mainContainer");

// state variables for latitude and longitude
let latitude = 0;
let longitude = 0;

latitudeReadout.textContent = "0";
longitudeReadout.textContent = "0";

// when the coordinates change somehow, propagate that change everywhere
async function updateCoords(lat, lng) {
    // make sure longitude is in the range (-180, 180]
    while (lng <= -180) {
        lng += 360;
    }
    while (lng > 180) {
        lng -= 360;
    }
    
    // store the new coordinates in state variables
    latitude = lat;
    longitude = lng;
    
    // put these values into the latitude/longitude text boxes
    latitudeReadout.textContent = latitude.toFixed(4); 
    longitudeReadout.textContent = longitude.toFixed(4);

}


function getCoordinates() {
    if (! "geolocation" in navigator) { alert("Location services not available"); return; }
    navigator.geolocation.getCurrentPosition((position) => {
        updateCoords(position.coords.latitude, position.coords.longitude);
    });
}


mainContainer.addEventListener('touchstart', (event) => {
    event.preventDefault();
    mainContainer.setAttribute('style', 'color: blue;');
    getCoordinates();
});

mainContainer.addEventListener('mousedown', (event) => {
    event.preventDefault();
    mainContainer.setAttribute('style', 'color: blue;');
    getCoordinates();
});

mainContainer.addEventListener('touchend', (event) => {
    event.preventDefault();
    mainContainer.setAttribute('style', 'color: white;');
});

mainContainer.addEventListener('mouseup', (event) => {
    event.preventDefault();
    mainContainer.setAttribute('style', 'color: white;');
});

getCoordinates();