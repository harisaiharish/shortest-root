
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './Components/Home.js';
import {React, Component} from 'react';
import Login from './Components/Login.js';
import User from './Components/Users/User.js';
import CreateEvent from './Components/Users/CreateEvent.js'



export class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/users/:user' element={<User />}/>
            <Route exact path='/users/:user/create-event' element={<CreateEvent />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
