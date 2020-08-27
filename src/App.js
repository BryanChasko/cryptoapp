import Amplify from 'aws-amplify'
import config from './aws-exports'
// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'
// Import the API category from AWS Amplify
import { API } from 'aws-amplify'
import './App.css';


Amplify.configure(config) 

function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])
  // Define function to all API

  async function fetchCoins() {
      const data = await API.get('rrawuploaderapi', '/coins')
      updateCoins(data.coins)
    }
    // Call fetchCoins function when component loads
    useEffect(() => {
      fetchCoins()
    }, [])
    return (
      <div className="App">
        {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
      ))
    }
      </div>
  );
}


export default App;
