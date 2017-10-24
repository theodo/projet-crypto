import React, { Component } from 'react';
import MyComponent from './Component';

class App extends Component {
  render() {
    const list = ['a', 'b', 'c']
    return (
      <div className="App">
        {list.map(function(l){ return (<MyComponent title={l} />)})}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

