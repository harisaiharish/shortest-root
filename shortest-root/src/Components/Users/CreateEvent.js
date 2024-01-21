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
    navigate(`/users/${state.User.username}/events/${name}`, {
      state: {
        eventDetails: {
          userNames: [state.User.username],
          address: [address],
          name: name,
          number: number,
          type: type,
          eventMaster: state.User.username,
        },
        userDetails: {
          username: state.User.username
        }
      }
    });
  };
  


  return (
    <div style={{padding: '10rem'}}>
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleChange}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <h3 style={{color: 'black'}}><b><u>Enter your address: </u></b></h3>
              <input 
                {...getInputProps({
                  placeholder: "...",
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
        <div>
        </div>
        <div>
          <br/>
          <br />
          <h3 style={{color: 'black'}}><b><u>Enter type of event: </u></b></h3>
          <input type="text" id="fname" placeholder="ex. Restaurant" name="fname" value={type} onChange={ev => setType(ev.target.value)}/>
          <br/>
          <br />
          <h3 style={{color: 'black'}}><b><u>Number of people: </u></b></h3>
          <input type="number" value={number} onChange={ev => setNumber(ev.target.value)}/>
          <br />
          <br />
          <h3 style={{color: 'black'}}><b><u>Enter name of event</u></b></h3>
          <input type="text" id="fname" placeholder="ex. Adi's birthday" name="fname" value={name} onChange={ev => setName(ev.target.value)}/>
        </div>

        <button className='button bg-secondary' onClick={uploadData}>
          Create Event
        </button>
    </div>
  )
}

export default CreateEvent
