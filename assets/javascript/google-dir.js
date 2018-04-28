/// Firebase 

var config = {
  apiKey: "AIzaSyBIaYZCktWCryF8cMhxK-XUNzIJibtquU0",
  authDomain: "middlemeetup-a2868.firebaseapp.com",
  databaseURL: "https://middlemeetup-a2868.firebaseio.com",
  projectId: "middlemeetup-a2868",
  storageBucket: "middlemeetup-a2868.appspot.com",
  messagingSenderId: "482753535895"
};
firebase.initializeApp(config);

var database = firebase.database();
// Global variable
var origin = "";
var destination = "";

/// Google Directions 
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('directionsMap'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    var onClickHandler = function(event) {
        event.preventDefault();
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('Run').addEventListener('click', onClickHandler);

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      // Get origin nd destination 
      console.log("Getting here");
      origin = document.getElementById('address1').value;
      destination = document.getElementById('address2').value;

      // Push origin and destination to Firebase
      database.ref().push({    
        origin: origin,
        destination: destination,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    directionsService.route({
      // Save a call to DOM use origin and destination
      origin: document.getElementById('address1').value,
      destination: document.getElementById('address2').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }