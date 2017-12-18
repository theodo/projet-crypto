import React, { Component } from 'react';
import axios from 'axios';
 
//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'
 
class CoinMarketPlace extends Component {
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
 
        if(this.state.requestFailed){
            return  <p>Failure, abort mission...</p>
        } else {
            return(
                <div>
                    {this.state.data.map(function(dynamicData, key){
                        if(dynamicData.name === "Bitcoin"){
                            return (
                                <div key={key}>
                                    <h1>Le prix actuel du Bitcoin sur CoinMarket Place est: </h1>
                                    <h2>${dynamicData.price_usd}</h2>
                                </div>
                            )
                        }})}
                </div>
            );
        }
    }
}
 
export default CoinMarketPlace
 
