
import React, { Component } from 'react';
import axios from 'axios'
import { Line } from 'react-chartjs-2';

class Chartvideo extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  componentDidMount() {

     axios('https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_BTC')
      .then((response) => {

        const Data = response.data;
        const chartData = {
          labels: Data.map(k => k.date),
          datasets: [
            {
              label: 'Price',
              data: Data.map(d => d.rate),
              backgroundColor: 'lightblue',
            }
          ]
        }

        this.setState({ chartData });
      });
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          // width={10}
          // height={20}
          options={{}}
        />
      </div>
    );
  }
}

export default Chartvideo;
