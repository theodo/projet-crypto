import React, { Component } from 'react';
import './app.css'
import axios from 'axios';

import bitcoinImg from './assets/bitcoin.png'
import ethImg from './assets/eth.png'

import Footer from './components/Footer';

import PoloniexChart from './components/Bitcoin/PoloniexChart';
import BittrexChart from './components/Bitcoin/BittrexChart';
import CoinbaseChart from './components/Bitcoin/CoinbaseChart';
import Joinedchart from './components/Bitcoin/joinedChart';

import Coinbase from './components/Bitcoin/Coinbase';
import CoinMarketPlace from './components/Bitcoin/CoinMarketPlace';
import Poloniex from './components/Bitcoin/Poloniex';

import Bittrex10last from './components/Bitcoin/Bittrex10last';
// import CoinBase10last from './components/Bitcoin/Coinbase10last';
import Poloniex10last from './components/Bitcoin/Poloniex10last';

import PoloniexChartETH from './components/Ethereum/PoloniexChartETH';
import BittrexChartETH from './components/Ethereum/BittrexChartETH';
import CoinbaseChartETH from './components/Ethereum/CoinbaseChartETH';
// import JoinedchartETH from './components/Ethereum/joinedChartETH';

import CoinbaseETH from './components/Ethereum/CoinbaseETH';
import CoinMarketPlaceETH from './components/Ethereum/CoinMarketPlaceETH';
import PoloniexETH from './components/Ethereum/PoloniexETH';

import Bittrex10lastETH from './components/Ethereum/Bittrex10lastETH';
// import CoinBase10lastETH from './components/Ethereum/Coinbase10lastETH';
import Poloniex10lastETH from './components/Ethereum/Poloniex10lastETH';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Divider, Segment } from 'semantic-ui-react'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
            <Tabs>
              <Tab label="Bitcoin" >
                <div>
                  <p>
                    <ContentBitcoin />
                  </p>
                </div>
              </Tab>
              <Tab label="Ethereum" >
                <div>
                  <p>
                    <ContentETH />
                  </p>
                </div>
              </Tab>
              <Tab label="Ripple" >
                <div>
                  <h2 style={styles.headline}>Tab Three</h2>
                  <p>
                    This is another example tab.
                  </p>
                </div>
              </Tab>
            </Tabs>
          );
        </MuiThemeProvider>
        <Footer />
      </div>
    );
  }
}

class ContentBitcoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData1: {
                labels: [],
                datasets: [],
            },
        };
    }
  componentDidMount() {
      let chartData1=  {
                labels: [],
                datasets: [],
            };
        axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=1489536000&end=1519776000&period=86400')
      .then((response) => {

        const Datapoloniex = response.data;
        chartData1 = {
            labels: Datapoloniex.map(k => timeConverter(k.date)),
            datasets: [
             {
                  label: 'Poloniex USD/BTC',
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
          chartData1.datasets.push(
              {
                  label: 'Coinbase USD/BTC',
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
        this.setState({ chartData1 })
     )

      }

  render() {
    return (
      <div>

           <div>

            <br></br>
            <div>
              <img className="logo" src={bitcoinImg} alt="ETH Logo" />
            </div>

            <Segment>
            <div id="container">
              <div className="Exchange" className="box1">
                <a className="title">Coinbase </a>
                  <Divider section />
                Current price:
                <Coinbase />
                  <Divider section />
                Chart:
                <CoinbaseChart />
              </div>
              <div className="Exchange" className="box2">
                <a className="title">CoinMarketPlace </a>
                  <Divider section />
                Average Price on platforms:
                 <CoinMarketPlace />
                  <Divider section />
                Bittrex Chart:
                 <BittrexChart />
              </div>
              <div className="Exchange" className="box3">
                <a className="title">Poloniex </a>
                  <Divider section />
                Current price:
                <Poloniex />
                  <Divider section />
                Chart:
               <PoloniexChart/>
              </div>
            </div>

              <br></br>
              <br></br>
              <br></br>              
              <Divider section />

            <div id="container">
                <div className="Exchange" className="box1">
                  Last ten transactions: <br></br>
                  {/* <CoinBase10last/> */}
                </div>
                <div className="Exchange" className="box2">
                  Last ten transactions: <br></br>
                    <Bittrex10last/>
                </div>
                <div className="Exchange" className="box3">
                  Last ten transactions: <br></br>
                  <Poloniex10last/>
                </div>
            </div>
            </Segment>
              <div className="Exchange">
                Chart:
                <Joinedchart chartData1={this.state.chartData1}/>
              </div>

      </div>
          </div>
    );

  }
}

class ContentETH extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData1: {
                labels: [],
                datasets: [],
            },
        };
    }
  componentDidMount() {
      let chartData1=  {
                labels: [],
                datasets: [],
            };
        axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=1489536000&end=1519776000&period=86400')
      .then((response) => {

        const Datapoloniex = response.data;
        chartData1 = {
            labels: Datapoloniex.map(k => timeConverter(k.date)),
            datasets: [
             {
                  label: 'Poloniex USD/BTC',
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
          chartData1.datasets.push(
              {
                  label: 'Coinbase USD/BTC',
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
        this.setState({ chartData1 })
     )

      }

  render() {
    return (
      <div>

           <div>

            <br></br>
            <div>
              <img className="logo" src={ethImg} alt="ETH Logo" />
            </div>

            <Segment>
            <div id="container">
              <div className="Exchange" className="box1">
                <a className="title">Coinbase </a>
                  <Divider section />
                Current price:
                <CoinbaseETH />
                  <Divider section />
                Chart:
                <CoinbaseChartETH />
              </div>
              <div className="Exchange" className="box2">
                  <a className="title">CoinMarketPlace </a>
                  <Divider section />
                Average Price on platforms:
                 <CoinMarketPlaceETH />
                  <Divider section />
                Bittrex Chart:
                 <BittrexChartETH />
              </div>
              <div className="Exchange" className="box3">
                  <a className="title">Poloniex </a>
                  <Divider section />
                Current price:
                <PoloniexETH />
                  <Divider section />
                Chart:
               <PoloniexChartETH />
              </div>
            </div>

                <br></br>
                <br></br>
                <Divider section />

            <div className="Last Ten Transactions">
              <div className="Exchange" className="box1">
                Last ten transactions: <br></br>
                  {/* <CoinBase10last/> */}
              </div>
              <div className="Exchange" className="box1">
                  Last ten transactions: <br></br>
                    <Bittrex10lastETH />
              </div>
              <div className="Exchange" className="box1">
                  Last ten transactions: <br></br>
                  <Poloniex10lastETH />
              </div>
            </div>
            </Segment>

              <div className="Exchange">
                Chart:
                <Joinedchart chartData1={this.state.chartData1}/>

              </div>



      </div>
          </div>
    );

  }
}

export default App;
