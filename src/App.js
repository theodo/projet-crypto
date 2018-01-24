import React, { Component } from 'react';
import './app.css'
import axios from 'axios';
import bitcoinImg from './assets/bitcoin.png'
import PoloniexChart from './components/PoloniexChart'
import Coinbase from './components/Coinbase';
import CoinbaseChart from './components/CoinbaseChart';
import CoinMarketPlace from './components/CoinMarketPlace'
import Poloniex from './components/Poloniex'
import Joinedchart from './components/joinedChart'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Cryptocompare v1.0</h1>
          </header>
        </div>
      </div>
    );
  }
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            },
        };
    }
  componentDidMount() {
      let chartData=  {
                labels: [],
                datasets: [],
            };
        axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=1486512000&end=1516752000&period=86400')
      .then((response) => {

        const Datapoloniex = response.data;
        chartData = {
            labels: Datapoloniex.map(k => k.date),
            datasets: [
             {
                  label: 'My First dataset',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datapoloniex.map(d => d.open),

        }]
      }
      })
     axios('https://api.gdax.com/products/BTC-USD/candles?granularity=86400')
      .then((response) => {

          const Datacoinbase = response.data.reverse();
          chartData.datasets.push(
              {
                  label: 'Price BTC/USD',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'blue',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datacoinbase.map(transac => transac[3]),
              }
          )
      }).then( () =>
        this.setState({ chartData })
     )

      }

  render() {
    return (
      <div>

          <div className="App-Currency">
            Currency : Bitcoin
          </div>
          <div>
              <img className="bitlogo" src={bitcoinImg} alt="ETH Logo" />
          </div>

              <div className="Exchange">
                <a className="title" href="www.coinbase.com">Coinbase </a> <br></br>
                Prix actuel:
                <Coinbase />
                Chart:
                <CoinbaseChart />
              </div>
              <div className="Exchange">
                <a className="title" href="www.coinmarketplace.com">CoinMarketPlace </a> <br></br>
                Prix actuel:
                <CoinMarketPlace />
                Chart:
              </div>
              <div className="Exchange">
                <a className="title" href="www.poloniex.com">Poloniex </a> <br></br>
                Prix actuel:
                <Poloniex />
                Chart:
               <PoloniexChart/>

      
              </div>

      </div>
    );
  }
}

export default App;
