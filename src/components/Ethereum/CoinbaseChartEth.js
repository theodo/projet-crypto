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





class CoinbaseChartETH extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }
 oneDayGraph() {
        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -1);
        start=start.toISOString()
      this.callcoinbase(start, now, 300);
  }
   sevenDayGraph() {
        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -7);
        start=start.toISOString()
      this.callcoinbase(start, now, 3600);
  }
   onemonthsGraph() {
        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -30);
        start=start.toISOString()
      this.callcoinbase(start, now, 21600);
  }
   threemonthsGraph() {
        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -90);
        start=start.toISOString()
      this.callcoinbase(start, now, 86400);
  }
   oneYearGraph() {
        var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -182);
        start=start.toISOString()
      this.callcoinbase(start, now, 86400);
  }

    callcoinbase(startDate, endDate, period) {
axios.get(`https://api.gdax.com/products/ETH-USD/candles?start=${startDate}&end=${endDate}&granularity=${period}`).then((response) => {
        const Data = response.data.reverse();
        const chartData = {
          labels: Data.map(transac => timeConverter(transac[0])),
          datasets: [
            {
              label: 'Price ETH/USD',
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
              data: Data.map(transac => transac[3]),
            }
          ]
        }

        this.setState({ chartData });
      });
  }
 componentDidMount(){
      var now = new Date();

        now=now.toISOString()

        var start= new Date();
        start.setDate(start.getDate() -182);
        start=start.toISOString()
      this.callcoinbase(start, now, 86400);
}

  render() {
    return (
      <div className="chart">
          <button onClick={() => this.oneDayGraph()}>1D</button>
          <button onClick={() => this.sevenDayGraph()}>7D</button>

          <button onClick={() => this.onemonthsGraph()}>1M</button>
          <button onClick={() => this.threemonthsGraph()}>3M</button>
          <button onClick={() => this.oneYearGraph()}>6M</button>
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

export default CoinbaseChartETH;
