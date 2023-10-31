// Replace 'YOUR_API_KEY' with your Google Maps Geocoding API Key
const apiKey = 'AIzaSyB_RMmoc5iVAGRDfxi8WLjQc27_QocN-eI';
const address = 'Scandic Helsfyr';

// Define the geocoding request URL
const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

// Perform the geocoding request
fetch(geocodingUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 'OK' && data.results.length > 0) {
      // Extract the latitude and longitude from the first result
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.error('Geocoding failed. Please check the address or API key.');
    }
  })
  .catch((error) => {
    console.error('Error while geocoding:', error);
  });
