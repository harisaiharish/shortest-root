import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const user_Locations = [[12.9235, 77.6851], [12.8862, 77.7459], [12.9722, 77.6843], [12.9273, 77.7051]]

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

window.onload = function () {
  console.log("HEY THERE")
  const gMap = document.getElementById('map');
  var newMarker = document.createElement('Marker');
  newMarker.setAttribute("position", { lat: 0, lng: 0 });
  gMap.appendChild(newMarker);
};

const Map = () => { 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        id = 'map'
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
/*
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {
        user_Locations.map((element) => (
          <Marker position={ {"lat":element[0], "lng":element[1]} } />
        ))}
      </GoogleMap>
    </div>
  );
};
*/


