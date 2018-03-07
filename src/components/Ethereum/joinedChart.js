import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';

class Joinedchart extends Component {

constructor(props){
   super(props);
   console.log(props.chartData1, 'chartData')
   this.state = {
     chartData1:{},
   }
 }
/*
 componentDidMount() {

    axios('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=1486512000&end=1516752000&period=86400')
     .then((response) => {

       const Data = response.data;
       const chartData = {
           labels: Data.map(k => k.date),
           datasets: [
            {
                 label: 'My First dataset',
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
                 data: Data.map(d => d.open)},
     {   label: "second set",
         data: [11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300,11300]
     }
 ]

           /*labels: ['Jan', 'Feb', 'Mar', 'Ap','Mai']
           datasets:[
                   {
                       label: 'Price',
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

                       //data: Data.map(d => d.rate),
                       data:[1,1,1,1,1],
                       backgroundColor: 'lightblue',

                   },
                                           label: "second set",

                       data: [2, 2, 2, 2],
                       backgroundColor: 'lightblue',

                   }
               //]
           }

       //this.setState({ chartData });
     });
 }
*/
render() {
   return (
     <div className="chart">
       <Line
         data={this.props.chartData1}
         // width={10}
          //height={20}
         options={{}}
       />
     </div>
   );
}
}

export default Joinedchart;