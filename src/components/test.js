import React, { Component } from 'react';
import axios from 'axios';

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class Poloniex extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }



    componentDidMount() {
        axios.get('https://poloniex.com/public?command=returnTicker').then((response) => {
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
                                    <h1>Le prix actuel du Bitcoin sur poloniex est: </h1>
                                    <h2>${this.state.data["USDT_BTC"]["last"]}</h2>
                                </div>



            );
        }
    }

}
export default Poloniex
