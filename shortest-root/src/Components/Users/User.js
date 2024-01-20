import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../App.css';

const User = () => {

    const {state} = useLocation()
    const navigate = useNavigate()

  return (
    <div style={{
        backgroundColor: "#000b35"
    }}>
        <button className='button bg-secondary all-center' style={{padding: "5px 5px", maxWidth: "500px"}} onClick={() => {
            navigate(`/users/${state.User.username}/create-event`)
        }}>
            Create Event
        </button>
    </div>
  )
}

export default User

