import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = ({res}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [UserError, setUserError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [user, setUser] = useState({
        username: "aditya",
        currentEvents: [{
            eventName: "Eating food",
            numPeople: 3,
        }, {
            eventName: "Watching movie",
            numPeople: 10
        }],
        comingEvents: [{
            eventName: "Date with girlfriend",
            numPeople: 2,
        }, {
            eventName: "Band practice",
            numPeople: 5
        }],
    })


    const buttonClick = () => {
        navigate(`/users/${user.username}`, {state: {User: user}})
    }


  return (
    <div>
        <div className='container'>
            <h1>Login</h1>
        </div>
        <div className='container'>
            <input 
            value = {username}
            placeholder = "Enter Username"
            onChange={ev => setUsername(ev.target.value)}
            className='form-text'
            />
            <label>{UserError}</label>
        </div>
        <div className='container'>
            <input 
            value = {password}
            placeholder = "Enter Password"
            onChange={ev => setPassword(ev.target.value)}
            className='form-text'
            />
            <label>{passwordError}</label>
        </div>
        <button onClick={buttonClick}>CLICK</button>
    </div>
  )
}

export default Login
