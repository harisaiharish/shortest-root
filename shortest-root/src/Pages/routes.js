// route.js

const getRoutes = async () => {
    const apiKey = 'AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A';
  
    const data = {
      origins: [
        {
          waypoint: {
            location: {
              latLng: {
                latitude: 37,
                longitude: -122,
              },
            },
          },
          routeModifiers: { avoid_ferries: true },
        },
        {
          waypoint: {
            location: {
              latLng: {
                latitude: 38.403184,
                longitude: -122.097371,
              },
            },
          },
          routeModifiers: { avoid_ferries: true },
        },
      ],
      destinations: [
        {
          waypoint: {
            location: {
              latLng: {
                latitude: 38.020999,
                longitude: -122.086894,
              },
            },
          },
        },
      ],
      travelMode: 'TRANSIT',
      routingPreference: 'TRAFFIC_AWARE',
    };
  
    const response = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters,status,condition',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const result = await response.json();
    return result;
  };
  
  export default getRoutes;
  