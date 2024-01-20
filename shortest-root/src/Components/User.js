import React from 'react'

const User = ({user}) => {
  return (
    <div>
        <button onClick={() => {
            console.log(user)
        }}>click</button>
    </div>
  )
}

export default User
