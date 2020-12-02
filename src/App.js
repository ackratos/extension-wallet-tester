import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BscConnector } from '@binance-chain/bsc-connector'

function App() {
  useEffect(() => {
    setTimeout(async () => {
      const bsc = new BscConnector({
        supportedChainIds: [56, 97]
      })      ;
      await bsc.activate();
      console.log(await bsc.getAccount());
      console.log(await bsc.getChainId());
    }, 5000);
  })

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
    </div>
  );
}

export default App;
