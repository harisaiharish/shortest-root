import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../App.css';

const User = () => {

    const {state} = useLocation()
    const navigate = useNavigate()

    return (
        <div style={{ backgroundColor: "#000b35" }}>
          <button
            className='button bg-secondary all-center'
            style={{ padding: "5px 5px", maxWidth: "500px" }}
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
              <li>{element.eventName}</li>
            ))}
          </ul>
          <br />
          <h1 className='all-center'>Join now!</h1>
          <ul className="all-center">
            {state.User.comingEvents.map((element) => (
              <li>{element.eventName}</li>
            ))}
          </ul>
        </div>
      );      
}

export default User

