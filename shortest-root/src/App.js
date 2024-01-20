
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Map from './Pages/Map.js';
import {React, Component} from 'react';

export class App extends Component {

  state = {
    users: [{
    username: "aditya"
  },{
    username: "vivin"
  }]}

  render() {
    return (
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Map />}></Route>
          </Routes>
      </BrowserRouter>
    );
  }
}

export default App;