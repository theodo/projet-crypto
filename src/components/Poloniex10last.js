import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class Poloniex10last extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }



    componentDidMount() {
        axios.get('https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_BTC').then((response) => {
            console.log(response.data)
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
                <div>
                      <div className="heading">${this.state.data[0]["type"]}</div>
                      <div className="heading">${this.state.data[0]["amount"]}</div>
                      <div className="heading">${this.state.data[0]["rate"]}</div>
                      <div className="heading">${this.state.data[0]["date"]}</div>


                        <br></br>
                       <div className="heading">${this.state.data[1]["type"]}</div>
                      <div className="heading">${this.state.data[1]["amount"]}</div>
                      <div className="heading">${this.state.data[1]["rate"]}</div>
                      <div className="heading">${this.state.data[1]["date"]}</div>
                </div>
            );
        }
    }

}
export default Poloniex10last
