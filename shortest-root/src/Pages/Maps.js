import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Maps = () => {

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
      };

    const libraries = ['places'];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC-8yJHf4WGRxgitTvRDMaRtYos7wxkE6C86A',
        libraries,
      });

    return (

        <div>
            <input />
            <GoogleMap center={{lat: 34.89, lng: 45.67}} id='map' mapContainerStyle={mapContainerStyle} zoom={8}>
                <Marker position={{lat: 34.89, lng: 45.67}}/>
            </GoogleMap>
        </div>
    )
}

export default Maps;