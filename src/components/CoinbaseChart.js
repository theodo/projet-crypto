import React, { Component } from 'react';
import axios from 'axios'
import { Line } from 'react-chartjs-2';

class CoinbaseChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  componentDidMount() {

     axios('https://api.gdax.com/products/BTC-USD/candles?granularity=86400')
      .then((response) => {

        const Data = response.data.reverse();
        const chartData = {
          labels: Data.map(transac => transac[0]),
          datasets: [
            {
              label: 'Price BTC/USD',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgb(255,255,224)',
              borderColor: 'rgb(255,255,224)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(255,255,224)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: Data.map(transac => transac[3]),
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
          width={80}
          height={60}
          redraw={true}
          options={{
            maintainAspectratio: false,
          }}
        />
      </div>
    );
  }
}

export default CoinbaseChart;
