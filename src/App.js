import React, { Component } from 'react';
import './app.css'
import bitcoinImg from './assets/bitcoin.png'

import { Link, Route, Switch, Redirect } from 'react-router-dom'

import InfoBox from './components/InfoBox';
import Team from './components/Team';
import CoinMarketPlace from './components/CoinMarketPlace'
// import Polo from './components/Poloniex'

class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <Header />
        <Content />
      </div>
    );
  }
}

class NavMenu extends Component {
  render () {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Crypto platform v1.0</h1>
          </header>
          <div className="menu">
              <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/team">Show Team</Link> </li>
              </ul>
          </div>
        </div>
      );
    }
}

class Header extends Component {
  render () {
    return (
      <div>
          <img className="bitlogo" src={bitcoinImg} alt="ETH Logo" />
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <div className='App-intro'>
                  <h1>Bitcoin Price</h1>
        </div>
        <div>
          <InfoBox />
          <CoinMarketPlace />
        </div>
        <div className="App-intro">
          <Switch>
            <Route path="/team" component={Team} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
