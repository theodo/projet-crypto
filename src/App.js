import React, { Component } from 'react';
import './app.css'
import Title from './components/Title';
import CoinMarketPlace from './components/CoinMarketPlace'
import ethImg from './assets/eth.png'
import Polo from './components/Poloniex'
import JC_infobox from './JC_infobox';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    );
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <h1> $ETH </h1>
          <img className="ethlogo" src={ethImg} alt="ETH Logo" />
      </div>
    );
  }
}

class Content extends Component {
  render() {
    const list = ['J\'aime', 'les', 'Cryptos']
    return (
      <div>
        <div className="App">
          {
            list.map((string) => (<Title title={string}/>))
          }

          <CoinMarketPlace> </CoinMarketPlace>


          {/*/<Polo>list.maps(string, key)</Polo>*/}


        </div>

      </div>
        <JC_infobox />
</div>
    );
  }
}

export default App;
