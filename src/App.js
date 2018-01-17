import React, { Component } from 'react';
import './app.css'
import bitcoinImg from './assets/bitcoin.png'

import Coinbase from './components/Coinbase';
import CoinbaseChart from './components/CoinbaseChart';
import CoinMarketPlace from './components/CoinMarketPlace'
import Poloniex from './components/Poloniex'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Cryptocompare v1.0</h1>
          </header>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>

          <div className="App-Currency">
            Currency : Bitcoin
          </div>
          <div>
              <img className="bitlogo" src={bitcoinImg} alt="ETH Logo" />
          </div>

              <div className="Exchange">
                <a className="title" href="www.coinbase.com">Coinbase </a> <br></br>
                Prix actuel:
                <Coinbase />
                Chart:
                <CoinbaseChart />
              </div>
              <div className="Exchange">
                <a className="title" href="www.coinmarketplace.com">CoinMarketPlace </a> <br></br>
                Prix actuel:
                <CoinMarketPlace />
                Chart:
              </div>
              <div className="Exchange">
                <a className="title" href="www.poloniex.com">Poloniex </a> <br></br>
                Prix actuel:
                <Poloniex />
                Chart:
              </div>

      </div>
    );
  }
}

export default App;
