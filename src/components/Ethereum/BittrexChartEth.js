import React, { Component } from 'react';
import axios from 'axios'
import { Line } from 'react-chartjs-2';




class BittrexChartETH extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  componentDidMount() {

     axios.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=USDT-ETH')
      .then((response) => {

        const Data = response.data.result;
        console.log(Data)
          const chartData = {
          labels: Data.map(k => k.TimeStamp),
          datasets: [
            {
              label: 'Price',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,19,192,0.4)',
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
                  data: Data.map(d => d.Price),
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

export default BittrexChartETH;