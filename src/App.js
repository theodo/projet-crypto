import React, { Component } from 'react';
import Title from './Title';

class App extends Component {
  render() {
    const list = ['a', 'b', 'c']
    return (
      <div>
        <div className="App">
          {list.map(function(l){ return (<Title title={l} />)})}
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
