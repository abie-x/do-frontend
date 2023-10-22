import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function App() {

  const [city, setCity] = useState([])

  useEffect(() => {
    const cityFetchFunction = async () => {
      const {data} = await axios.get('https://king-prawn-app-pyqbx.ondigitalocean.app/app')
      console.log(data)
      setCity(data)
    }

    cityFetchFunction()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Me and I'm from {city.length > 0 && city[city.length - 1].country}
        </p>
        <GoogleOAuthProvider clientId="647491082373-rv0gp6u4imerdouf1ohs7vch7c9091k7.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              if(decoded) {
                const {data} = await axios.post('https://king-prawn-app-pyqbx.ondigitalocean.app/app/api/cities', {name: decoded.given_name, country: 'Russia', rank: 8})
                console.log(data)
              }
            }}
            onError={() => {
              console.log('Login Failed');  
            }}
          />
        </GoogleOAuthProvider>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
