import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class Kraken extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {},
            tampon: {}

        }


    }

    componentDidMount() {
        axios.get('https://api.kraken.com/0/public/OHLC?pair=XBTUSD').then((response) => {
            console.log(response.data.result.XXBTZUSD)
            this.setState({ data: response.data.result.XXBTZUSD, requestFailed: false, tampon: response.data.result.XXBTZUSD });
            console.log(this.state.tampon.length)

        }).catch((err) => {
            alert("Error with the API");
            console.log(err)
        })
    }

    render() {

        if (this.state.requestFailed) {
            return  <p>Failure, abort mission...</p>
        } else {
            return(
                <div id="data-container">
                                <div id="left" className='box'>
                                    <div className="heading">${this.state.data[719][1]}</div>
                                </div>

                </div>
            );
        }
    }
}

export default Kraken;
