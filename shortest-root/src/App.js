
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home.js';
import {React, Component} from 'react';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={() => (
              <Home />
            )} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
