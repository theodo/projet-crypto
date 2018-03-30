import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class PoloniexETH extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }



    componentDidMount() {
        axios.get('https://poloniex.com/public?command=returnTicker').then((response) => {

            this.setState({ data: response.data, requestFailed: false });
        }).catch((err) => {
            alert("Error with the API");
            console.log(err)
        })
    }

    render() {

        if(this.state.requestFailed){
            return  <p>Failure, abort mission...</p>
        } else {
            return(
                <div id="data-container">
                    <div id="left" className='box'>
                      <div className="heading">${Math.trunc(this.state.data["USDT_ETH"]["last"])}</div>
                    </div>
                </div>
            );
        }
    }

}
export default PoloniexETH
