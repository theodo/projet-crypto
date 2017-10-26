import React, { Component } from 'react';
import './app.css'
import Title from './components/Title';
import ethImg from './assets/eth.png'

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
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div>Salut les gars</div>
      </div>
    );
  }
}

export default App;
