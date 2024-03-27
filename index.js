// make variables for the html elements
const latitudeReadout = document.getElementById("latitudeReadout");
const longitudeReadout = document.getElementById("longitudeReadout");
const mainContainer = document.getElementById("mainContainer");

// state variables for latitude and longitude
let latitude = 0;
let longitude = 0;

latitudeReadout.innerHTML = `${0}&deg; ${0}&prime;`;
longitudeReadout.innerHTML = `${0}&deg; ${0}&prime;`;

function degreesToDegreesAndMinutes(x) {
    let s = Math.sign(x);
    let y = Math.abs(x);
    let q = Math.floor(y);
    let r = y - q;

    let m = Math.round(r * 60);
    let d = s * q;
    return `${d}&deg; ${m}&prime;`
}

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
    latitudeReadout.innerHTML = degreesToDegreesAndMinutes(latitude); 
    longitudeReadout.innerHTML = degreesToDegreesAndMinutes(longitude);
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
