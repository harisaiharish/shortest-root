import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../App.css';

const User = () => {

    const {state} = useLocation()
    const navigate = useNavigate()

    return (
        <div className="mainContainer all-center">
          <br></br>
          <button
            className='button bg-secondary all-center'
            style={{ scrollPaddingTop: "10px", padding: "10px 10px", maxWidth: "500px" }}
            onClick={() => {
              navigate(`/users/${state.User.username}/events/create-event`, {state: {User: state.User}});
            }}
          >
            Create Event
          </button>
          <br />
          <h1 className='all-center'>Joined Events</h1>
          <ul className="all-center">
            {state.User.currentEvents.map((element) => (
              <button className='btn-block' onClick={() => {
                navigate(`/users/${state.User.username}/events/${element.eventName}`, {state: {User: state.User}});
              }}>{element.eventName}</button>
            ))}
          </ul>
          <br />
        </div>
      );      
}

export default User

