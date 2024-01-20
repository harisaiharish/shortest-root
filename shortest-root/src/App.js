
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home.js';
import {React, Component} from 'react';
import Login from './Pages/Login.js';

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
        <div>
          <Switch>
            <Route exact path='/' component={() => (
              <Home />
            )} />
            <Route exact path='/login' component={() => (
              <Login res={this.state.users}/>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
