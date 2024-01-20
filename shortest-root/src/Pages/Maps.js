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
            lat: 37.69,
            lng: 238.27
        },
        {
            lat: 37.89,
            lng: 238.67
        },
        {
            lat: 37.39,
            lng: 239
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

    function getPlaceID(apiKey, lat, lng) {
        return new Promise((resolve, reject) => {
          const geocoder = new window.google.maps.Geocoder();
          const location = new window.google.maps.LatLng(lat, lng);
      
          geocoder.geocode({ location: location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                resolve(results[0].place_id);
              } else {
                reject(new Error('No results found'));
              }
            } else {
              reject(new Error(`Geocoder failed with status: ${status}`));
            }
          });
        });
      }
      const apiKey = 'AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A';
      getPlaceID(apiKey, avgLat, avgLng)
      .then((placeID) => {
        console.log(getNearbyPlaces(apiKey,placeID,7000,"Restaurant"))
    })

    function getNearbyPlaces(apiKey, placeId, radius = 5000, keyword = null) {
        return new Promise((resolve, reject) => {
          const detailsService = new window.google.maps.places.PlacesService(document.createElement('div'));
      
          detailsService.getDetails({ placeId: placeId }, (placeDetails, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              const location = placeDetails.geometry.location;
      
              const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
              const request = {
                location: location,
                radius: radius,
                keyword: keyword,
                key: apiKey,
              };
      
              placesService.nearbySearch(request, (results, nearbyStatus) => {
                if (nearbyStatus === window.google.maps.places.PlacesServiceStatus.OK) {
                  // Sort nearby places by prominence
                  const sortedPlaces = results.sort((a, b) => b.prominence - a.prominence);
      
                  // Extract details including budget and star rating
                  const sortedPlaceDetails = sortedPlaces.map(place => ({
                    name: place.name,
                    budget: place.price_level || 'Unknown',
                    starRating: place.rating || 'Unknown',
                  }));
      
                  // Resolve the Promise with sorted place details
                  resolve(sortedPlaceDetails);
                } else {
                  reject(new Error(`Nearby search failed with status: ${nearbyStatus}`));
                }
              });
            } else {
              reject(new Error(`Place details request failed with status: ${status}`));
            }
        });
      });
    }

    const customMarkerIcon = {
        path: 'M22-48h-44v43h16l6 5 6-5h16z',
        fillColor: '#03a100', // Customize the fill color
        fillOpacity: 1,
        scale: 0.5,
        //strokeColor: 'black',
        //strokeWeight: 2,
        anchor: new window.google.maps.Point(22, 0),
      };
      return (

        <div>
            <button onClick={avgLocation} style={{width: "100px", height: "20px"}}></button>
            <GoogleMap center={{lat: 37, lng: 238}} id='map' mapContainerStyle={mapContainerStyle} zoom={8}>
                {arr.map(element => (
                    <Marker position={{lat: element.lat, lng: element.lng}}/>
                ))}
                {showAvg && (
                    <Marker 
                        position={{lat: avgLat, lng: avgLng}}
                        icon ={customMarkerIcon}
                    />
                )}
            </GoogleMap>
        </div>
    )
}

export default Maps;