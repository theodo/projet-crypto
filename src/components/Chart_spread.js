import React, { Component } from 'react';

import './app.css'

import axios from 'axios';


import { Table, Menu, Icon, Label } from 'semantic-ui-react';




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
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map(
                            (elem, key) => {
                                elem.rates.map(
                                    (elems) => {

                                        if (elems.market === 'Kraken'){
                                            console.log(elem.rates_date, elems.price)
                                            return(
                                                <Table.Row>
                                                    <Table.Cell>{elem.rates_date}</Table.Cell>
                                                    <Table.Cell>{elems.price}</Table.Cell>
                                                </Table.Row>);
                                       }
                                    });
                            })}

                    </Table.Body>
                </Table>);

        }

    }
}
export default Spread;
