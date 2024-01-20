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
    location, // Example coordinates
    radius: 500, // Search radius in meters
    type// Optional type filter

  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (const result of results) {
        const placeId = result.place_id;
        console.log(placeId);
        return placeId
        // Use the Place ID as needed
      }
    }
  });

  //This code will get a lat and lng from a human address. How do I pass it to nearbySearch is what idk.
  location = {}
  const geocoder = new google.maps.Geocoder();
  var address=promt("Input the address of the place : ")
  geocoder.geocode({ address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      const coordinates = results[0].geometry.location;
      location = {lat: coordinates.lat(), lng: coordinates.lng()}; //You pass this as the location for nearbysearch
      //console.log(coordinates.lat(), coordinates.lng());
    }
  });
  var TypeOfPlace=prompt("Enter the type of place : ")
  placeId=service.nearbySearch(location, radius, TypeOfPlace);
  reviews=getPlaceDetails(placeId)
  console.log(reviews)
 

  
