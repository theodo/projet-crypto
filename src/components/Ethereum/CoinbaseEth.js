import React, { Component } from 'react';
import './Exchange.css'

class CoinbaseETH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
    }
  }
  componentDidMount(){
    this.getData = () => {
      const url = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          // const price = bitcoinData.data.amount;

          this.setState({
            currentPrice: bitcoinData.data.amount,
          })
        })
        .catch((e) => {
          console.log(e);
        });
      }
      this.getData();
      this.refresh = setInterval(() => this.getData(), 10000);
    }
    componentWillUnmount(){
      clearInterval(this.refresh);
    }
    render(){
      return (
        <div id="data-container">
          { this.state.currentPrice ?
            <div id="left" className='box'>
              {/* methode pour afficher un signe dollar, ne semble pas fonctionner */}
              <div className="heading">${this.state.currentPrice}</div>

            </div>
          : null}
        </div>
      );
    }
}

export default CoinbaseETH;
