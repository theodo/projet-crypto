import React, { Component } from 'react';
import './app.css'
import bitcoinImg from './assets/bitcoin.png'
import PoloniexChart from './components/PoloniexChart'
import Coinbase from './components/Coinbase';
import CoinbaseChart from './components/CoinbaseChart';
import CoinMarketPlace from './components/CoinMarketPlace'
import Poloniex from './components/Poloniex'
import Joinedchart from './components/joinedChart'

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
            Currency : Bitcoin <br></br>
              <img className="bitlogo" src={bitcoinImg} alt="ETH Logo" />
          </div>

            <div id="container">
              <div className="Exchange" className="box1">
                <a className="title" href="www.coinbase.com">Coinbase </a> <br></br>
                Current price:
                <Coinbase />
                Chart:
                <CoinbaseChart />
              </div>
              <div className="Exchange" className="box2">
                <a className="title" href="www.coinmarketplace.com">CoinMarketPlace </a> <br></br>
                Current price:
                <CoinMarketPlace />
                Chart:
              </div>
              <div className="Exchange" className="box3">
                <a className="title" href="www.poloniex.com">Poloniex </a> <br></br>
                Current price:
                <Poloniex />
                Chart:
               <PoloniexChart/>
              </div>
              <span className="stretch"></span>
            </div>
            <br></br>
            <div id="container">
              <div className="Exchange" className="box1">
                Ten last transactions:
              </div>
              <div className="Exchange" className="box2">
                Ten last transactions:
              </div>
              <div className="Exchange" className="box3">
                Ten last transactions:
              </div>
              <span className="stretch"></span>
            </div>

            <div>
              <Joinedchart />
            </div>

      </div>
    );
  }
}

export default App;
