import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'
import { Table, Menu, Icon, Label } from 'semantic-ui-react';

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'


class Poloniex10lastETH extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }

    componentDidMount() {
        axios.get('https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_ETH').then((response) => {
            console.log(response.data.slice(0, 3))
            this.setState({ data: response.data, requestFailed: false });
        }).catch((err) => {
            alert("Error with the API");
            console.log(err)
        })
    }

        render() {

        if(this.state.requestFailed){
            return (<p>Failure, abort mission...</p>);
        } else {
          const { data } = this.state;
          return(
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>TimeStamp</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Order Type</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.slice(0, 8).map(
                  (elem, key) => { if (elem.type = 'sell')
                    {
                        return(
                      <Table.Row key={key}>
                        <Table.Cell>{elem.date.substring(2,19)}</Table.Cell>
                        <Table.Cell active>{elem.rate.substring(0,12)}</Table.Cell>
                          <Table.Cell>{elem.type}</Table.Cell>
                          <Table.Cell active>{elem.amount.substring(0,6)}</Table.Cell>
                      </Table.Row>);
                    }
                  })}
              </Table.Body>
            </Table>
            );
        }
    }

}
export default Poloniex10lastETH
