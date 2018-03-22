import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class KrakenETH extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }

    }

    componentDidMount() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/').then((response) => {
            console.log(response.data)
            this.setState({ data: response.data, requestFailed: false });
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
                    {this.state.data.map(function(dynamicData, key){
                        if(dynamicData.name === "Ethereum"){
                            return (
                                <div id="left" className='box' key={key}>
                                    <div className="heading">${dynamicData.price_usd}</div>
                                </div>
                            )
                        }})}
                </div>
            );
        }
    }
}

export default KrakenETH;
