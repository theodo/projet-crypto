import React, { Component } from 'react';
import './app.css'
import axios from 'axios';
import { Table, Menu, Icon, Label } from 'semantic-ui-react';
import ExampleETH from './LoadingETH';
import ethImg from './assets/eth.png';


const MAX_SPREAD = 1.05;
const DATE_CONST = 1521827808.875168 ;


// let DATA_STATIC = JSON.parse('[{"rates_date": 1522161465.8813398, "rates": [{"market": "BitFinex", "price": "458.75000000", "volume": 329731.81901234}, {"market": "Bittrex", "price": "461.04375000", "volume": 11941.87853938}, {"market": "C-Cex", "price": "525.96006998", "volume": 0.15339141}, {"market": "Cex.io", "price": "468.76000000", "volume": 4540.501489}, {"market": "Exmo", "price": "486.99000000", "volume": 6475.8980916}, {"market": "Hitbtc", "price": "469.96000000", "volume": 10359.802}, {"market": "Kraken", "price": "460.41000000", "volume": 112877.3774565}, {"market": "Livecoin", "price": "476.00000000", "volume": 397.44638944}, {"market": "Poloniex", "price": "460.00395234", "volume": 13601.77469888}, {"market": "wexnz", "price": "468.87202000", "volume": 6767.38219}]}, {"rates_date": 1522161469.49707, "rates": [{"market": "BitFinex", "price": "458.75000000", "volume": 329731.81901234}, {"market": "Bittrex", "price": "461.04375000", "volume": 11941.87853938}, {"market": "C-Cex", "price": "525.96006998", "volume": 0.15339141}, {"market": "Cex.io", "price": "468.76000000", "volume": 4540.501489}, {"market": "Exmo", "price": "486.99000000", "volume": 6475.8980916}, {"market": "Hitbtc", "price": "469.96000000", "volume": 10359.802}, {"market": "Kraken", "price": "460.41000000", "volume": 112877.3774565}, {"market": "Livecoin", "price": "476.00000000", "volume": 397.44638944}, {"market": "Poloniex", "price": "460.00395234", "volume": 13601.77469888}, {"market": "wexnz", "price": "468.87202000", "volume": 6767.38219}]}, {"rates_date": 1522161491.740586, "rates": [{"market": "BitFinex", "price": "458.75000000", "volume": 329731.81901234}, {"market": "Bittrex", "price": "461.04375000", "volume": 11941.87853938}, {"market": "C-Cex", "price": "525.96006998", "volume": 0.15339141}, {"market": "Cex.io", "price": "468.04000000", "volume": 4543.93318}, {"market": "Exmo", "price": "486.99000000", "volume": 6474.08311914}, {"market": "Hitbtc", "price": "469.40000000", "volume": 10363.847}, {"market": "Kraken", "price": "460.29000000", "volume": 112913.4977093}, {"market": "Livecoin", "price": "476.00000000", "volume": 397.44638944}, {"market": "Poloniex", "price": "460.00533866", "volume": 13602.68805295}, {"market": "wexnz", "price": "468.43000000", "volume": 6762.49462}]}, {"rates_date": 1522161783.9715517, "rates": [{"market": "BitFinex", "price": "459.67000000", "volume": 329439.80332733}, {"market": "Bittrex", "price": "461.04375000", "volume": 11939.9333004}, {"market": "C-Cex", "price": "525.96006998", "volume": 0.15339141}, {"market": "Cex.io", "price": "468.76000000", "volume": 4501.72753}, {"market": "Exmo", "price": "486.62400000", "volume": 6479.10696285}, {"market": "Hitbtc", "price": "469.67000000", "volume": 10379.958}, {"market": "Kraken", "price": "461.29000000", "volume": 112425.22410582}, {"market": "Livecoin", "price": "476.00000000", "volume": 396.5936912}, {"market": "Poloniex", "price": "462.86384145", "volume": 13582.36374577}, {"market": "wexnz", "price": "468.05435000", "volume": 6752.08562}]}]')


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
    return time;}

function APICall(elems){

    var Kraken_price;
    var Poloniex_price;
    var Bittrex_price;
    var maximum_price;
    var minimum_price;
    let data = [];

    elems.map( (element) => {
        if (element.market === 'Kraken') {
            Kraken_price = elems.price;
            maximum_price = Kraken_price;
            minimum_price = Kraken_price
        }
        else if (element.market === 'Bittrex') {
            Bittrex_price = element.price;
            if (Bittrex_price > maximum_price) {
                maximum_price = Bittrex_price;
            }
            else if (Bittrex_price < minimum_price) {
                minimum_price = Bittrex_price;
            }
        }
        else if (element.market === 'Poloniex') {
            Poloniex_price = element.price;
            if (Poloniex_price > maximum_price) {
                maximum_price = Poloniex_price;
            }
            else if (Poloniex_price < minimum_price) {
                minimum_price = Poloniex_price;
            }
        }

        data.push([Kraken_price, Bittrex_price, Poloniex_price, maximum_price, minimum_price])
    });

    return data
    }



class Spread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false, //à changer
            data: {},
            isDataLoaded: false
    }
    }


        componentDidMount() {


            axios.get('http://ec2-34-217-63-15.us-west-2.compute.amazonaws.com/eth-lovers').then((response) => {
                this.setState({data: response.data, requestFailed: false}, () => {
                    this.setState({isDataLoaded: true});
                });

            }).catch((err) => {
                alert("Error with the API");
                console.log(err)
            })
        }

        render()
        {

            if (!this.state.isDataLoaded) {
                return (<ExampleETH/>)
            }
            if (this.state.requestFailed) {
                return (<p>Failure, abort mission...</p>);
            } else {
                const data = this.state.data;
                return (
                    <div>

                               <br></br>
                            <div>
                              <img className="logo" src={ethImg} alt="ETH Logo" />
                                <br></br>
                                <center>
                                <a className="title">Ethereum Arbitrages from Today </a>
                                    </center>
                            </div>

                        <Table >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell negative>TimeStamp</Table.HeaderCell>
                                    <Table.HeaderCell negative>BitFinex Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Bitstamp Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Kraken Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Poloniex</Table.HeaderCell>
                                    <Table.HeaderCell class="positive">Max Spread</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {data.filter((elem) => {
                                     const spread = (Math.max(elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][8].price, elem[Object.getOwnPropertyNames(elem)[1]][1].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price) - Math.min(elem[Object.getOwnPropertyNames(elem)[1]][5].price, elem[Object.getOwnPropertyNames(elem)[1]][7].price, elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price))/Math.max(elem[Object.getOwnPropertyNames(elem)[1]][9].price, elem[Object.getOwnPropertyNames(elem)[1]][8].price, elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price)*100
                                elem.spread = spread
                                    return spread > MAX_SPREAD
                                }).map((elem) => {  if (String(timeConverter(elem[Object.getOwnPropertyNames(elem)[0]])).slice(0,11) === '30 Mar 2018') {
                                    return (
                                        <Table.Row>
                                            <Table.Cell>{timeConverter(String(elem[Object.getOwnPropertyNames(elem)[0]]))}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][0].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][1].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][6].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][8].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell positive>{String(elem.spread).slice(0, 5) + '%'}</Table.Cell>
                                        </Table.Row>)
                                }

                                })

                                }


                            </Table.Body>
                        </Table>
                         <br></br>
                            <div>
                              <img className="logo" src={ethImg} alt="ETH Logo" />
                                <br></br>
                                <center>
                                <a className="title">Ethereum Arbitrages from Past few days</a>
                                    </center>
                            </div>

                        <Table >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell negative>TimeStamp</Table.HeaderCell>
                                    <Table.HeaderCell negative>BitFinex Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Bitstamp Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Kraken Price</Table.HeaderCell>
                                    <Table.HeaderCell negative>Poloniex</Table.HeaderCell>
                                    <Table.HeaderCell class="positive">Max Spread</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {data.filter((elem) => {
                                     const spread = (Math.max(elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][8].price, elem[Object.getOwnPropertyNames(elem)[1]][1].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price) - Math.min(elem[Object.getOwnPropertyNames(elem)[1]][5].price, elem[Object.getOwnPropertyNames(elem)[1]][7].price, elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price))/Math.max(elem[Object.getOwnPropertyNames(elem)[1]][9].price, elem[Object.getOwnPropertyNames(elem)[1]][8].price, elem[Object.getOwnPropertyNames(elem)[1]][6].price, elem[Object.getOwnPropertyNames(elem)[1]][0].price)*100
                                elem.spread = spread
                                    return spread > MAX_SPREAD
                                }).map((elem) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell>{timeConverter(String(elem[Object.getOwnPropertyNames(elem)[0]]))}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][0].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][1].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][6].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell>{'$' + String(elem[Object.getOwnPropertyNames(elem)[1]][8].price).slice(0, 5)}</Table.Cell>
                                            <Table.Cell positive>{String(elem.spread).slice(0,5)+'%'}</Table.Cell>
                                        </Table.Row>)

                                })

                                }


                            </Table.Body>
                        </Table>



                    </div>)

            }

        }
    }
export default Spread;
