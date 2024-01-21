import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const Maps = () => {

    const {state} = useLocation();

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
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedCenter, setSelectedCenter] = useState(null);


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
        let prom = getNearbyPlaces(apiKey,placeID,7000,"Restaurant")
        prom.then((resolvedArray) => {
            if (!showOptions) {
                setShowOptions(true)
                setOptions(resolvedArray)
            }
            console.log(options)
        })
        .catch((error) => {
            // Handle errors here
            console.error(error);
          });
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
                  // Resolve the Promise with an array of objects containing place details
                  const placeDetailsArray = results.map(place => ({
                    name: place.name,
                    budget: place.price_level || 'Unknown',
                    starRating: place.rating || 'Unknown',
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                  }));
      
                  resolve(placeDetailsArray);
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
                {options.map(option => (
                    <Marker position={{lat: option.latitude, lng: option.longitude}} onClick={() => {
                        setSelectedCenter(option)
                    }}>
                    {selectedCenter && (

                        <InfoWindow
                        onCloseClick={() => {
                           setSelectedCenter(null);
                        }}
                        position={{
                           lat: option.latitude,
                           lng: option.longitude
                        }}>
                            <button onClick={() => {
                                console.log(option.name)
                            }}>{option.name} : 
                            {option.starRating}
                                </button>
                        </InfoWindow>
                    )}
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    )
}

export default Maps;