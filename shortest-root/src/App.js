import logo from './logo.svg';
import './App.css';
import EventComponent from './Components/EventComponent/EventComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <EventComponent />
      {/* NOT WORKING ADI HOW TO REACT */}
    </div>
  );
};


export default App;
