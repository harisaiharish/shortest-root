
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './Components/Home.js';
import {React, Component} from 'react';
import Login from './Components/Login.js';
import User from './Components/User.js';

export class App extends Component {

  state = {
    users: [{
    username: "aditya",
    currentEvents: ["e1", "e2"]
  },{
    username: "vivin",
    currentEvents: []
  }]}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={
              <Login res={this.state.users}/>}/>
            <Route exact path='/users/:user' element={<User />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
