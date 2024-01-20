import React from 'react'
import { useLocation } from 'react-router-dom'

const User = () => {

    const {state} = useLocation()

  return (
    <div>
        <button onClick={() => {
            console.log(state.User)
        }}>click</button>
    </div>
  )
}

export default User
