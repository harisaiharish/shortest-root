import React, {useState, useEffect} from 'react'
import PlacesAutocomplete from "react-places-autocomplete";
import { useNavigate, useLocation } from 'react-router-dom';

const CreateEvent = () => {

  const [address, setAddress] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState(false)
  const [transport, setTransport] = React.useState("")
  const [type, setType] = React.useState("")
  const [number, setNumber] = React.useState(0)
  const [name, setName] = React.useState("")

  const {state} = useLocation()

  const handleChange = (value) => {
    setAddress(value)
    if (value === "") {
      setSelectedLocation(false)
    } else {
      setSelectedLocation(true)
    }
  }

  const confirmLocation = () => {
    console.log('confirm')
  }

  const changeMode = () => {
    setSelectedLocation(document.getElementById("mode").value)
  }

  const navigate = useNavigate()

  const uploadData = () => {
    // upload all data onto firebase
    navigate(`/users/${state.User.username}/events/${name}`, {state: {
      address: address,
      name: name,
      number: number,
      type: type,
      transport: transport
    }})
  }


  return (
    <div>
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleChange}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input 
                {...getInputProps({
                  placeholder: "Enter address...",
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active ?
                  { backgroundColor: "#a83232", cursor: "pointer" } :
                  {backgroundColor: "ffffff", cursor: "pointer"}

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {selectedLocation && (
          <button className='button bg-secondary' onClick={confirmLocation}>
            Confirm Location
          </button>
        )}
        <div>
          <br/>
          <br />
          <div id="floating-panel">
            <h3 style={{color: 'white'}}>Mode of Travel: </h3>
            <select id="mode" onChange={changeMode}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="TRANSIT">Bus</option>
            </select>
          </div>
        </div>
        <div>
          <br/>
          <br />
          <input type="text" id="fname" placeholder="Enter Type of Event" name="fname" value={type} onChange={ev => setType(ev.target.value)}/>
          <br/>
          <br />
          <h3 style={{color: 'white'}}>Number of people: </h3>
          <input type="number" value={number} onChange={ev => setNumber(ev.target.value)}/>
          <br />
          <br />
          <input type="text" id="fname" placeholder="Enter Name of Event" name="fname" value={name} onChange={ev => setName(ev.target.value)}/>
        </div>

        <button className='button bg-secondary' onClick={uploadData}>
          Create Event
        </button>
    </div>
  )
}

export default CreateEvent
