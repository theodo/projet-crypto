import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './app.css'

import bitcoinImg from './assets/bitcoin.png'
import ethImg from './assets/eth.png'
import litecoinImg from './assets/litecoin.png'

import Footer from './Footer';

import PoloniexChart from './Bitcoin/PoloniexChart';
import BittrexChart from './Bitcoin/BittrexChart';
import CoinbaseChart from './Bitcoin/CoinbaseChart';
import JoinedChart from './Bitcoin/JoinedChart';

import Coinbase from './Bitcoin/Coinbase';
import CoinMarketPlace from './Bitcoin/CoinMarketPlace';
import Poloniex from './Bitcoin/Poloniex';

import Bittrex10last from './Bitcoin/Bittrex10last';
import Coinbase10last from './Bitcoin/Coinbase10last';
import Poloniex10last from './Bitcoin/Poloniex10last';

import PoloniexChartETH from './Ethereum/PoloniexChartETH';
import BittrexChartETH from './Ethereum/BittrexChartETH';
import CoinbaseChartETH from './Ethereum/CoinbaseChartETH';
// import Joinedchart from './components/Ethereum/JoinedchartETH';

import CoinbaseETH from './Ethereum/CoinbaseETH';
import CoinMarketPlaceETH from './Ethereum/CoinMarketPlaceETH';
import PoloniexETH from './Ethereum/PoloniexETH';

import Bittrex10lastETH from './Ethereum/Bittrex10lastETH';
import Coinbase10lastETH from './Ethereum/Coinbase10lastETH';
import Poloniex10lastETH from './Ethereum/Poloniex10lastETH';

import PoloniexChartLTC from './Litecoin/PoloniexChartLTC';
import BittrexChartLTC from './Litecoin/BittrexChartLTC';
import CoinbaseChartLTC from './Litecoin/CoinbaseChartLTC';
// import Joinedchart from './components/Litecoin/JoinedchartLTC';

import CoinbaseLTC from './Litecoin/CoinbaseLTC';
import CoinMarketPlaceLTC from './Litecoin/CoinMarketPlaceLTC';
import PoloniexLTC from './Litecoin/PoloniexLTC';

import Bittrex10lastLTC from './Litecoin/Bittrex10lastLTC';
import Coinbase10lastLTC from './Litecoin/Coinbase10lastLTC';
import Poloniex10lastLTC from './Litecoin/Poloniex10lastLTC';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
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
// La classe Content contient les Tabs par monnaie ainsi que leur Content
class Content extends Component {
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
              <Tab label="Litecoin" >
                <div>
                  <p>
                    <ContentLTC />
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

// Contenu relatif au Bitcoin
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
                   <Coinbase10last/>
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

            <br></br>
            </Segment>

            <div id="container">
                <div className="Exchange" className="box2">
                  Joined Chart:
                  <JoinedChart chartData1={this.state.chartData1}/>
                </div>
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

        var a=Math.trunc(Date.now()/1000)
        var b=a-1*86400

        a=a.toString();
        b=b.toString();


        axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start='+b+'&end='+a+'&period=300')
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

     axios.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=USDT-BTC')
      .then((response) => {

        const Datachart = response.data.result.map(k => k.TimeStamp).reverse();
        //chartData1.labels.push({label:response.data.result.map(k => k.TimeStamp).reverse()})
        chartData1.datasets.push(

            {
                  label: 'Price',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'red',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datachart.map(d => d.Price),
            }
          )

      }).then( () =>
        this.setState({ chartData1 })
     )
      var now = new Date();

      now=now.toISOString()

      var start= new Date();
       start.setDate(start.getDate() -1);
      start=start.toISOString()
      console.log(start)
      console.log(now)



     axios('https://api.gdax.com/products/BTC-USD/candles?start='+start+'&end='+now+'&granularity=300')
      .then((response) => {

          const Datacoinbase = response.data.reverse();

        //chartData1.labels.push({label:response.data.reverse()})

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
                Joined Chart:
                <JoinedChart chartData1={this.state.chartData1}/>

              </div>



      </div>
          </div>
    );

  }
}

class ContentLTC extends Component {
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

        var a=Math.trunc(Date.now()/1000)
        var b=a-1*86400

        a=a.toString();
        b=b.toString();


        axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_LTC&start='+b+'&end='+a+'&period=300')
      .then((response) => {

        const Datapoloniex = response.data;
        chartData1 = {
            labels: Datapoloniex.map(k => timeConverter(k.date)),
            datasets: [
             {
                  label: 'Poloniex USD/LTC',
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

     axios.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=USDT-LTC')
      .then((response) => {

        const Datachart = response.data.result.map(k => k.TimeStamp).reverse();
        //chartData1.labels.push({label:response.data.result.map(k => k.TimeStamp).reverse()})
        chartData1.datasets.push(

            {
                  label: 'Bittrex USDT/LTC',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'red',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datachart.map(d => d.Price),
            }
          )

      }).then( () =>
        this.setState({ chartData1 })
     )
      var now = new Date();

      now=now.toISOString()

      var start= new Date();
       start.setDate(start.getDate() -1);
      start=start.toISOString()
      console.log(start)
      console.log(now)



     axios('https://api.gdax.com/products/BTC-LTC/candles?start='+start+'&end='+now+'&granularity=300')
      .then((response) => {

          const Datacoinbase = response.data.reverse();

        //chartData1.labels.push({label:response.data.reverse()})

          chartData1.datasets.push(
              {
                  label: 'Coinbase USD/LTC',
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
              <img className="logo" src={litecoinImg} alt="LTC Logo" />
            </div>

            <Segment>
            <div id="container">
              <div className="Exchange" className="box1">
                <a className="title">Coinbase </a>
                  <Divider section />
                Current price:
                  <CoinbaseLTC />
                  <Divider section />
                Chart:
                   <CoinbaseChartLTC />
              </div>
              <div className="Exchange" className="box2">
                  <a className="title">CoinMarketPlace </a>
                  <Divider section />
                Average Price on platforms:
                 <CoinMarketPlaceLTC />
                  <Divider section />
                Bittrex Chart:
                  <BittrexChartLTC />
              </div>
              <div className="Exchange" className="box3">
                  <a className="title">Poloniex </a>
                  <Divider section />
                Current price:
                <PoloniexLTC />
                  <Divider section />
                Chart:
                  <PoloniexChartLTC />
              </div>
            </div>

                <br></br>
                <br></br>
                <Divider section />

            <div className="Last Ten Transactions">
              <div className="Exchange" className="box1">
                Last ten transactions: <br></br>
                  {/* <CoinBase10lastLTC/> */}
              </div>
              <div className="Exchange" className="box1">
                  Last ten transactions: <br></br>
                    <Bittrex10lastLTC />
              </div>
              <div className="Exchange" className="box1">
                  Last ten transactions: <br></br>
                  <Poloniex10lastLTC />
              </div>
            </div>
            </Segment>

              <div className="Exchange">
                Joined Chart:
                <JoinedChart chartData1={this.state.chartData1}/>

              </div>



      </div>
          </div>
    );

  }
}

export default Content ;