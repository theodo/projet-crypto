import React, { Component } from 'react';
import './app.css'
import Title from './components/Title';
import CoinMarketPlace from './components/CoinMarketPlace'
import ethImg from './assets/eth.png'
import Polo from './components/Poloniex'

class App extends Component {
  render() {
    const list = ['J\'aime', 'les', 'Cryptos']
    return (
      <div>
        <div className="App">
          <img className="ethlogo" src={ethImg} alt="ETH Logo" />
          {
            list.map((string) => (<Title title={string}/>))
          }

          <CoinMarketPlace> </CoinMarketPlace>


          {/*/<Polo>list.maps(string, key)</Polo>*/}


        </div>
      </div>
    );
  }
}

export default App;
