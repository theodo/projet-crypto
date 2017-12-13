import React, { Component } from 'react';
import moment from 'react-moment';
{/* import './infobox.css' */}

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
          const price = bitcoinData.data.amount;

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
              {/* methode pour afficher un signe dollar */}
              <div className="heading">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
            </div>
          : null}
        </div>
      );
    }
}

export default infobox;
