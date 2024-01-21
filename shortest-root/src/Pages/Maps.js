import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const google = window.google
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

    const [lat, setLat] = useState(32.89)
    const [lng, setLng] = useState(-122.67)
    const [showAvg, setShow] = useState(false)
    const [avgLat, setAvgLat] = useState(0)
    const [avgLng, setAvgLng] = useState(0)
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [directionsRes, setDirectionsRes] = useState(false)
    const [directionArr, setDirectionsArr] = useState([])


    const arr = [
        {
            lat: 12.9177,
            lng: 77.6580

        },
        {
            lat: 12.9235,
            lng: 77.6851
        },
        {
            lat: 12.9052,
            lng: 77.6865
        },
        {
            lat:12.953,
            lng: 77.6824
        }
    ]

    const names = [
        'adi', 'vivin', 'aarya', 'hari'
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

    const displayRoute =  (props) => {
        arr.forEach(async (element, i) => {
            await calculateRoute(props, element)
        })  
        setOptions([])
    }

    const calculateRoute = async (props, element) => {
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
        origin: element,
        destination: {lat: props.lat, lng: props.lng},
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.TRANSIT,
        })
        console.log(results.routes[0].legs[0].duration.value);
        setDirectionsRes(true)
        directionArr.push(results)
    }

    function getPlaceID(apiKey, lat, lng) {
        return new Promise((resolve, reject) => {
          const geocoder = new window.google.maps.Geocoder();
          const location = new window.google.maps.LatLng(lat, lng);
      
          geocoder.geocode({ location: location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                resolve(results[0].place_id);

              }
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
                } 
              });
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
            <div className='all-center'>


            <button onClick={avgLocation} style={{width: "200px", height: "27px", justifyContent: "center",
  alignItems: "center", textAlign: "center"}}>Find Locations!</button>
            </div>
            <GoogleMap center={{lat: 12.9656, lng: 77.6062}} id='map' mapContainerStyle={mapContainerStyle} zoom={12}>
                {arr.map(element => (
                    <Marker position={{lat: element.lat, lng: element.lng}}/>
                ))}
                {showAvg && (
                    <Marker 
                        position={{lat: avgLat, lng: avgLng}}
                        
                        icon ={customMarkerIcon}
                    />
                )}
                {directionsRes && (
                    <div>
                        {directionArr.map(element => (
                            <DirectionsRenderer directions={element}/>
                        ))}
                    </div>
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
                                displayRoute({lat: option.latitude, lng: option.longitude})
                            }}>{option.name} : 
                            {option.starRating}
                                </button>
                        </InfoWindow>
                    )}
                    </Marker>
                ))}
            </GoogleMap>
            
            {directionsRes && (
                <div className='container bg-secondary grid-2 floatingBox'>
                    <ul>
                        {names.map(name => (
                            <li>{name}</li>
                        ))}
                    </ul>
                    <ul>
                        {directionArr.map(element => (
                            <li>{element.routes[0].legs[0].duration.text}</li>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Maps;