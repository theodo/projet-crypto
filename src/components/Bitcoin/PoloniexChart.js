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

class PoloniexChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  oneDayGraph() {
        var endDate=Math.trunc(Date.now()/1000)
        var startDate=endDate-1*86400

        startDate=startDate.toString();
        endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 300);
  }

   oneYearGraph() {
        var endDate=Math.trunc(Date.now()/1000)
        var startDate=endDate-365*86400

        startDate=startDate.toString();
        endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 86400);
  }
   onemonthsGraph() {
        var endDate=Math.trunc(Date.now()/1000)
        var startDate=endDate-30*86400

        startDate=startDate.toString();
        endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 14400);
  }
    threemonthsGraph() {
        var endDate=Math.trunc(Date.now()/1000)
        var startDate=endDate-90*86400

        startDate=startDate.toString();
        endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 14400);
  }
  sevenDayGraph() {
        var endDate=Math.trunc(Date.now()/1000)
        var startDate=endDate-7*86400

        startDate=startDate.toString();
        endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 900);
  }

  callPoloniex(startDate, endDate, period) {
      axios(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=${startDate}&end=${endDate}&period=${period}`)
      .then((response) => {

        const Data = response.data;
        const chartData = {
          labels: Data.map(k => timeConverter(k.date)),
          datasets: [
            {
              label: 'Price BTC/USD',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,1)',
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
                  data: Data.map(d => d.open),
            }
          ]
        }

        this.setState({ chartData });
      });
  }

  componentDidMount() {
      var endDate=Math.trunc(Date.now()/1000)
      var startDate=endDate-86400*365

      startDate=startDate.toString();
      endDate=endDate.toString();
      this.callPoloniex(startDate, endDate, 86400);
  }

  render() {
    return (
      <div className="chart">
          <button onClick={() => this.oneDayGraph()}>1D</button>
          <button onClick={() => this.sevenDayGraph()}>7D</button>

          <button onClick={() => this.onemonthsGraph()}>1M</button>
          <button onClick={() => this.threemonthsGraph()}>3M</button>
          <button onClick={() => this.oneYearGraph()}>1Y</button>
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

export default PoloniexChart;
