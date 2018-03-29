import React, { Component } from 'react';
import './app.css'
import axios from 'axios';
import { Table, Menu, Icon, Label } from 'semantic-ui-react';


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


class Spread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }


    componentDidMount() {
        axios.get('http://ec2-34-217-63-15.us-west-2.compute.amazonaws.com:8000/btc-lovers').then((response) => {
            this.setState({data: response.data.slice(0,61), requestFailed: false});
        }).catch((err) => {
            alert("Error with the API");
            console.log(err)
        })
    }

    render() {

        if (this.state.requestFailed) {
            return (<p>Failure, abort mission...</p>);
        } else {
            const {data} = this.state;
            return (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell negative>TimeStamp</Table.HeaderCell>
                            <Table.HeaderCell positive>Kraken</Table.HeaderCell>
                            <Table.HeaderCell positive>Bittrex</Table.HeaderCell>
                            <Table.HeaderCell positive>Poloniex</Table.HeaderCell>
                             <Table.HeaderCell positive>Maximum Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map(
                            (elem) => {
                                let tabledata =
                                elem.rates.map(
                                    (elems) => {
                                        if (elems.market === 'Kraken'){
                                            var date = elem.rates_date
                                            var kraken_price = elems.price
                                            var maximum_price = kraken_price}
                                        else if (elems.market === 'Bittrex'){
                                            var Bittrex_price = elems.price
                                            if (Bittrex_price > maximum_price){
                                                var maximum_price = Bittrex_price
                                            }}
                                        else if (elems.market === 'Poloniex'){
                                            var Poloniex_price = elems.price
                                                if (Poloniex_price > maximum_price){
                                                var maximum_price = Poloniex_price
                                            }}
                                            return(
                                                <Table.Row>
                                                    <Table.Cell>{date}</Table.Cell>
                                                    <Table.Cell>{kraken_price}</Table.Cell>
                                                    <Table.Cell>{Bittrex_price}</Table.Cell>
                                                    <Table.Cell>{Poloniex_price}</Table.Cell>
                                                     <Table.Cell>{maximum_price}</Table.Cell>
                                                </Table.Row>);

                                    });
                             return (tabledata)
                            })}

                    </Table.Body>
                </Table>);

        }

    }
}
export default Spread;
