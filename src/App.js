import Amplify from "aws-amplify";
import config from "./aws-exports";
// Import useState and useEffect hooks from React
import React, { useState, useEffect } from "react";
// Import the API category from AWS Amplify
import { API } from "aws-amplify";
import "./App.css";

Amplify.configure(config);

function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);
  // Define function to all API

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });
  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }
  // Update fetchCoins function to use limit and start properties
  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );
    updateCoins(data.coins);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);
  return (
    <div className="App">
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>
            {coin.name} {coin.symbol}
          </h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
      {
        //Add input fields to the UI for user input
      }
      <input
        onChange={(e) => updateInputValues("limit", e.target.value)}
        placeholder="limit"
      />
      <input
        placeholder="start"
        onChange={(e) => updateInputValues("start", e.target.value)}
      />
      {
        // Add button to the UI to give user the option to call the API
      }
      <button onClick={fetchCoins}>Fetch Coins</button>
    </div>
  );
}

export default App;
