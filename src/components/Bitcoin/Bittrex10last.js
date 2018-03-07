import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'
import { Table, Menu, Icon, Label } from 'semantic-ui-react';

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'




class Bittrex10last extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }

    componentDidMount() {
        axios.get('https://bittrex.com/api/v1.1/public/getmarkethistory?market=USDT-BTC').then((response) => {
            console.log(response.data.result.slice(0,3))
            this.setState({ data: response.data.result, requestFailed: false });
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
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Order Type</Table.HeaderCell>
                     <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.slice(0, 8).map(
                  (elem, key) =>
                    {
                        return(
                      <Table.Row key={key}>
                        <Table.Cell >{elem.TimeStamp.substring(0,10) +  " " +  elem.TimeStamp.substring(11,19)}</Table.Cell>
                        <Table.Cell active>{String(elem.Price).substring(0,12)}</Table.Cell>
                          <Table.Cell >{elem.OrderType.toLowerCase()}</Table.Cell>
                          <Table.Cell active>{String(elem.Quantity).substring(0,6)}</Table.Cell>
                      </Table.Row>);
                    }
                  )}
              </Table.Body>
            </Table>
            );
        }
    }

}
export default Bittrex10last
