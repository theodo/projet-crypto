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

     axios('https://api.gdax.com/products/BTC-USD/candles/')
      .then((response) => {

        const Data = response.data;
        const chartData = {
          labels: Data.map(k => k[0]),
          datasets: [
            {
              label: 'Price BTC/USD',
              data: Data.map(d => d[3]),
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
          width={100}
          height={30}
          redraw={true}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

export default CoinbaseChart;
