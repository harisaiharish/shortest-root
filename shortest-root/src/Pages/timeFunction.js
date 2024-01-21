const googleMapsClient = require('@googlemaps/google-maps-services-js');

const getTravelTime = async (apiKey, origin, destination, mode) => {
  const client = new googleMapsClient.Client({});
  const params = {
    origin : origin,
    destination : destination,
    mode : mode,
    key: apiKey,
  };

  try {
    const response = await client.directions(params);
    const travelTimeSeconds = response.data.routes[0].legs[0].duration.value;
    return travelTimeSeconds / 60.0;
  } catch (error) {
    console.error('Error fetching travel time:', error.message);
    throw error;
  }
};

module.exports = getTravelTime;

const origin = ["Divyasree Elan"]
const destination = ["Adarsh Palm Retreat"]
const mode = "Driving"
console.log(getTravelTime('AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A',origin,destination,mode))