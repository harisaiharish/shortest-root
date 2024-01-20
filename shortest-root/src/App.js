import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './google.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleOAuthProvider clientId='http://524566069960-psogbhe0f8hohv6rm4b2slvv4gdp2qno.apps.googleusercontent.com/'>
          <Google />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default App;
