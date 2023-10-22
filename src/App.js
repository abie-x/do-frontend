import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios';

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
          Welcome to Me and im from {city.length > 0 && city[city.length - 1].country}
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
    </div>
  );
}

export default App;
