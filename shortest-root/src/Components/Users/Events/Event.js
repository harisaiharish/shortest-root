import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Event = () => {

  const navigate = useNavigate()

  const {state} = useLocation()
  let peopleThere = state.eventDetails.userNames.length

  const [invite, setInvite] = useState("")
  
  const buttonClick = () => {
    if (peopleThere < state.eventDetails.number) {
      state.eventDetails.userNames.push(invite)
      console.log(state.eventDetails.userNames)
    } else {

      navigate(`/users/${state.userDetails.username}/events/${state.eventDetails.eventName}/final-view`, {state: {state: state}})
    }
    console.log(peopleThere)

  }

  console.log("In event.js")

    return (
      <div>
        {state.eventDetails.eventMaster === state.userDetails.username ? (
          <div className='all-center' style={{paddingTop: "2.5%"}}>
            <h1 className='x-large'>Welcome!</h1>
            <h1>{peopleThere} of {state.eventDetails.number} confirmed!</h1>
            <h1>Event Type: {state.eventDetails.type}</h1>
            <div className='container'>
              <br />
              <h3 style={{color: 'black'}}><b><u>Add Participant: </u></b></h3>
              <input 
              placeholder = "ex. Vivin"
              value={invite}
              onChange={(ev) => setInvite(ev.target.value)}
              className='form-text'
              />
              <button onClick={buttonClick}>Invite</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className='x-large'>Welcome!</h1>
          </div>
        )}
      </div>
  );
}

export default Event;
