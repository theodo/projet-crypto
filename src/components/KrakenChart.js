import React, { Component } from 'react';
import axios from 'axios'
import { Line } from 'react-chartjs-2';


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




class BittrexChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  componentDidMount() {

     axios.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=USDT-BTC')
      .then((response) => {

        const Data = response.data.result;
        console.log(Data)
        const chartData = {
          labels: Data.map(k => k.TimeStamp).reverse(),
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

export default BittrexChart;