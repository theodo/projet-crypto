import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './app.css'

import bitcoinImg from './assets/bitcoin.png'
import ethImg from './assets/eth.png'
import litecoinImg from './assets/litecoin.png'

import PoloniexChart from './Bitcoin/PoloniexChart';
import KrakenChart from './Bitcoin/KrakenChart';
import CoinbaseChart from './Bitcoin/CoinbaseChart';
import Joinedchart from './Bitcoin/JoinedChart';

import Coinbase from './Bitcoin/Coinbase';
import Kraken from './Bitcoin/Kraken';
import Poloniex from './Bitcoin/Poloniex';

import Kraken10last from './Bitcoin/Kraken10last';
import CoinBase10last from './Bitcoin/CoinBase10last';
import Poloniex10last from './Bitcoin/Poloniex10last';

import PoloniexChartETH from './Ethereum/PoloniexChartEth';
import KrakenChartETH from './Ethereum/KrakenChartEth';
import CoinbaseChartETH from './Ethereum/CoinbaseChartEth';
import JoinedchartETH from './Ethereum/JoinedchartETH';

import CoinbaseETH from './Ethereum/CoinbaseEth';
import KrakenETH from './Ethereum/KrakenETH';
import PoloniexETH from './Ethereum/PoloniexEth';

import Kraken10lastETH from './Ethereum/Kraken10lastETH';
import CoinBase10lastETH from './Ethereum/CoinBase10lastETH';
import Poloniex10lastETH from './Ethereum/Poloniex10lastEth';

import PoloniexChartLTC from './Litecoin/PoloniexChartLTC';
import KrakenChartLTC from './Litecoin/KrakenChartLTC';
import CoinbaseChartLTC from './Litecoin/CoinbaseChartLTC';
// import Joinedchart from './components/Litecoin/JoinedchartLTC';

import CoinbaseLTC from './Litecoin/CoinbaseLTC';
import KrakenLTC from './Litecoin/KrakenLTC';
import PoloniexLTC from './Litecoin/PoloniexLTC';

import Kraken10lastLTC from './Litecoin/Kraken10lastLTC';
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
  state = {
      renderETH: false,
      renderLTC:false
  }

  renderETH() {
    this.setState({ renderETH: true })
  }
    renderLTC() {
    this.setState({ renderLTC: true })
  }

  render() {
    const { renderETH } = this.state
       const { renderLTC } = this.state
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
              <Tab label="Ethereum" onActive={() => this.renderETH()}>
                <div>
                  <p>
                    {renderETH &&
                      <ContentETH />
                    }
                  </p>
                </div>
              </Tab>
              <Tab label="Litecoin" onActive={() => this.renderLTC()}>
                <div>
                  <p>
                          {renderLTC &&
                      <ContentLTC />
                    }
                  </p>
                </div>
              </Tab>
            </Tabs>
        </MuiThemeProvider>
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

        var a=Math.trunc(Date.now()/1000)
        var b=a-90300

        a=a.toString();
        b=b.toString();

        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -1);
        start=start.toISOString()

        axios.all([
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start='+b+'&end='+a+'&period=300'),
            axios.get('https://api.gdax.com/products/BTC-USD/candles?start='+start+'&end='+now+'&granularity=300'),
            axios.get('https://api.kraken.com/0/public/OHLC?pair=XBTUSD&since='+b+'&interval=5')
        ])
        .then(axios.spread((poloniexResponse, gdaxResponse,krakenResponse) => {
            const Datapoloniex = poloniexResponse.data;
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
            const Datakraken = krakenResponse.data.result;

          chartData1.datasets.push(
              {
                label: 'Kraken USD/BTC',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'red',
                  pointBackgroundColor: 'red',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datakraken.XXBTZUSD.map(d => d[1]),

              }
          )

            const Datacoinbase = gdaxResponse.data.reverse();

            // chartData1.labels.push({label:Datacoinbase.map(transac => timeConverter(transac[0]))})

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
        this.setState({ chartData1 });
        }));

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
                <a className="title">Kraken </a>
                  <Divider section />
                Current Price :
                 <Kraken />
                  <Divider section />
                 Chart:
                 <KrakenChart />
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
                  Last 30min summary: <br></br>
                  { <CoinBase10last/> }
                </div>
                <div className="Exchange" className="box2">
                  Last 30min summary: <br></br>
                    <Kraken10last/>
                </div>
                <div className="Exchange" className="box3">
                  Last 30min summary: <br></br>
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
        var b=a-90300

        a=a.toString();
        b=b.toString();

        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -1);
        start=start.toISOString()

        axios.all([
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_LTC&start='+b+'&end='+a+'&period=300'),
            axios.get('https://api.gdax.com/products/LTC-USD/candles?start='+start+'&end='+now+'&granularity=300'),
            axios.get('https://api.kraken.com/0/public/OHLC?pair=LTCUSD&since='+b+'&interval=5')
        ])
        .then(axios.spread((poloniexResponse, gdaxResponse,krakenResponse) => {
            const Datapoloniex = poloniexResponse.data;
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
            const Datakraken = krakenResponse.data.result;

          chartData1.datasets.push(
              {
                label: 'Kraken USD/LTC',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'red',
                  pointBackgroundColor: 'red',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datakraken.XLTCZUSD.map(d => d[1]),

              }
          )

            const Datacoinbase = gdaxResponse.data.reverse();

            // chartData1.labels.push({label:Datacoinbase.map(transac => timeConverter(transac[0]))})

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
        this.setState({ chartData1 });
        }));

      }

  render() {
    return (
      <div>

           <div>

            <br></br>
            <div>
              <img className="logo" src={litecoinImg} alt="ETH Logo" />
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
                <a className="title">Kraken </a>
                  <Divider section />
                Current Price :
                 <KrakenLTC />
                  <Divider section />
                 Chart:
                 <KrakenChartLTC />
              </div>
              <div className="Exchange" className="box3">
                <a className="title">Poloniex </a>
                  <Divider section />
                Current price:
                <PoloniexLTC />
                  <Divider section />
                Chart:
               <PoloniexChartLTC/>
              </div>
            </div>

              <br></br>
              <br></br>
              <br></br>
              <Divider section />

            <div id="container">
                <div className="Exchange" className="box1">
                  Last 30min summary: <br></br>
                  { <Coinbase10lastLTC/> }
                </div>
                <div className="Exchange" className="box2">
                  Last 30min summary: <br></br>
                    <Kraken10lastLTC/>
                </div>
                <div className="Exchange" className="box3">
                  Last 30min summary: <br></br>
                  <Poloniex10lastLTC/>
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

        var a=Math.trunc(Date.now()/1000)
        var b=a-90300

        a=a.toString();
        b=b.toString();

        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -1);
        start=start.toISOString()

        axios.all([
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start='+b+'&end='+a+'&period=300'),
            axios.get('https://api.gdax.com/products/ETH-USD/candles?start='+start+'&end='+now+'&granularity=300'),
            axios.get('https://api.kraken.com/0/public/OHLC?pair=ETHUSD&since='+b+'&interval=5')

        ])
        .then(axios.spread((poloniexResponse, gdaxResponse,krakenResponse) => {
            const Datapoloniex = poloniexResponse.data;
            chartData1 = {
                labels: Datapoloniex.map(k => timeConverter(k.date)),
                datasets: [
                    {
                        label: 'Poloniex USD/ETH',
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

            const Datakraken = krakenResponse.data.result;

          chartData1.datasets.push(
              {
                label: 'Kraken USD/ETH',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'red',
                  pointBackgroundColor: 'red',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: Datakraken.XETHZUSD.map(d => d[1]),

              }
          )
            const Datacoinbase = gdaxResponse.data.reverse();

            // chartData1.labels.push({label:Datacoinbase.map(transac => timeConverter(transac[0]))})

          chartData1.datasets.push(
              {
                  label: 'Coinbase USD/ETH',
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
        this.setState({ chartData1 });
        }));

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
                  { <CoinbaseChartETH /> }
              </div>
              <div className="Exchange" className="box2">
                  <a className="title">Kraken </a>
                  <Divider section />
                Current Price:
                 <KrakenETH />
                  <Divider section />
                Chart:
                  { <KrakenChartETH /> }
              </div>
              <div className="Exchange" className="box3">
                  <a className="title">Poloniex </a>
                  <Divider section />
                Current price:
                <PoloniexETH />
                  <Divider section />
                Chart:
                  { <PoloniexChartETH /> }
              </div>
            </div>

                <br></br>
                <br></br>
                <Divider section />

            <div className="Last Ten Transactions">
              <div className="Exchange" className="box1">
                  Last 30min summary: <br></br>
                  {<CoinBase10lastETH/> }
              </div>
              <div className="Exchange" className="box1">
                  Last 30min summary: <br></br>
                    <Kraken10lastETH />
              </div>
              <div className="Exchange" className="box1">
                  Last 30min summary: <br></br>
                  <Poloniex10lastETH />
              </div>
            </div>
            </Segment>

              <div className="Exchange">
                Chart:
                <JoinedchartETH chartData1={this.state.chartData1}/>

              </div>



      </div>
          </div>
    );

  }
}

export default Content ;
