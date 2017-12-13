import React, { Component } from 'react';
import './app.css'
import Title from './components/Title';
import ethImg from './assets/eth.png'
import JC_infobox from './components/JC_infobox';

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
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div>Salut les gars</div>
        <JC_infobox />
</div>
    );
  }
}

export default App;
