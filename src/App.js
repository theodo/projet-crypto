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
import Poloniex10last from './components/Poloniex10last'
import BittrexChart from './components/BittrexChart';

 function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hr = a.getHours();
  var m = "0" + a.getMinutes();
  var s = "0" + a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' '+hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
  return time;
}


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

        a=a.toString()
        b=b.toString()


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

          <div className="App-Currency">
            Currency : Bitcoin <br></br>
              <img className="bitlogo" src={bitcoinImg} alt="ETH Logo" />
          </div>

            <div id="container">
              <div className="Exchange" className="box1">
                <a className="title" href="www.coinbase.com">Coinbase </a> <br></br>
                Current price:
                <Coinbase />
                Chart:
                <CoinbaseChart />
              </div>
                <div className="Exchange" className="box2">
                <a className="title" href="www.coinmarketplace.com">CoinMarketPlace </a> <br></br>
                Current price:
                <CoinMarketPlace />
                Chart:
                <BittrexChart />
              </div>
                <div className="Exchange" className="box3">
                <a className="title" href="www.poloniex.com">Poloniex </a> <br></br>
                Current price:
                <Poloniex />
                Chart:
               <PoloniexChart/>
              </div>
              </div>


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