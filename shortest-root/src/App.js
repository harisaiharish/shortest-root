
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './Components/Home.js';
import {React, Component} from 'react';
import Login from './Components/Login.js';
import User from './Components/Users/User.js';
import CreateEvent from './Components/Users/CreateEvent.js'
import Event from './Components/Users/Events/Event.js';
import Map from './Pages/Maps.js'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/users/:user' element={<User />}/>
            <Route exact path='/users/:user/events/create-event' element={<CreateEvent />}/>
            <Route exact path='/users/:user/events/:eventName' element={<Event />}/>
            <Route exact path="/users/:user/events/:eventName/final-view" element={<Map />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;