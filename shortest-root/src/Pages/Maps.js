import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Maps = () => {

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
      };

    const libraries = ['places'];
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A',
    //     libraries,
    //   });

    const [lat, setLat] = useState(34.89)
    const [lng, setLng] = useState(45.67)
    const [showAvg, setShow] = useState(false)
    const [avgLat, setAvgLat] = useState(0)
    const [avgLng, setAvgLng] = useState(0)

    const arr = [
        {
            lat: 34.89,
            lng: 45.67
        },
        {
            lat: 35.89,
            lng: 45.67
        },
        {
            lat: 35.89,
            lng: 46.67
        }
    ]

    const avgLocation = () => {
        var sumLat = 0
        var sumLng = 0
        arr.forEach(element => {
            sumLat = sumLat + element.lat
            sumLng = sumLng + element.lng
        })
        setAvgLat(sumLat/(arr.length))
        setAvgLng(sumLng/(arr.length))
        setShow(true)
    }

    return (

        <div>
            <button onClick={avgLocation} style={{width: "100px", height: "20px"}}></button>
            <GoogleMap center={{lat: lat, lng: lng}} id='map' mapContainerStyle={mapContainerStyle} zoom={8}>
                {arr.map(element => (
                    <Marker position={{lat: element.lat, lng: element.lng}}/>
                ))}
                {showAvg && (
                    <Marker position={{lat: avgLat, lng: avgLng}}/>
                )}
            </GoogleMap>
        </div>
    )
}

export default Maps;