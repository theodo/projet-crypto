import React, { Component } from 'react';
import './InfoBox.css'

class infobox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
    }
  }
  componentDidMount(){
    this.getData = () => {
      const url = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';

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
              <div className="heading">{this.state.currentPrice.toLocaleString("us-EN",{ style: "currency", currency: "USD" })}</div>
              <div className="subtext">Updated every 10 seconds</div>

            </div>
          : null}
            <div id="right" className='box'>
              <div className="heading">2</div>
              <div className="subtext">Shows the number 2</div>
            </div>
            <div id="right" className='box'>
              <div className="heading">3</div>
              <div className="subtext">Shows the number 3</div>
            </div>
        </div>
      );
    }
}

export default infobox;
