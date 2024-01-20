import React from 'react'
import PlacesAutocomplete from "react-places-autocomplete";

const CreateEvent = () => {

  const [address, setAddress] = React.useState("")

  const handleChange = (value) => {
    setAddress(value)
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
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default CreateEvent
