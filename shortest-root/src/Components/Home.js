
import React from "react"
import { Link } from "react-router-dom"

const Home = (props) => {
    const { loggedIn, email } = props
    
    const onButtonClick = () => {
        // You'll update this function later
    }

    return <div className="mainContainer all-center">
        <div className={"titleContainer"}>
            <h1 className="x-large" style={{paddingTop: '10%'}}>Welcome!</h1>
        </div>
        <h3>
            This is the home page.
        </h3>
        <div className={"buttonContainer"}>
            <a href="/login">
                <button className="btn" style={{margin: "10 rem"}} >Login</button>
            </a>
        </div>
        <div className={"buttonContainer"}>
            <a href="/login">
                <button className="btn" >Sign Up!</button>
            </a>
        </div>
    </div>
}

export default Home;