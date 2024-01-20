
import React from "react"
import { Link } from "react-router-dom"

const Home = (props) => {
    const { loggedIn, email } = props
    
    const onButtonClick = () => {
        // You'll update this function later
    }

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        <div className={"buttonContainer"}>
            <a href="/login">
                <button className="button" >Login</button>
            </a>
        </div>


    </div>
}

export default Home;