api_key = 'AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A'
src="https://maps.googleapis.com/maps/api/js?key=&loading=async&libraries=places&callback=initMap"
function getPlaceDetails(placeId) {
    const service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
      placeId: placeId,
      fields: ['name', 'formatted_address', 'place_id', 'reviews'], // Request reviews here
    }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Process place details, including reviews if available
        console.log(place.reviews);
        return place.reviews
      }
    });
  }
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: { lat: 37.7749, lng: -122.4194 }, // Example coordinates
    radius: 500, // Search radius in meters
    type: ['restaurant'] // Optional type filter
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (const result of results) {
        const placeId = result.place_id;
        console.log(placeId);ne
        // Use the Place ID as needed
      }
    }
  });

  
