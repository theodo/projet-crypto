import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'
import { Table, Menu, Icon, Label } from 'semantic-ui-react';

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'




class Kraken10lastETH extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }

    componentDidMount() {
        axios.get('https://api.kraken.com/0/public/OHLC?pair=ETHUSD&interval=60&since=1513338300').then((response) => {
            console.log(response.data.result.XETHZUSD.slice(0,3))
            this.setState({ data: response.data.result.XETHZUSD, requestFailed: false });
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
                        <Table.Cell >{elem[0]}</Table.Cell>
                        <Table.Cell active>{String(elem[1]).substring(0,12)}</Table.Cell>
                          <Table.Cell >{'Non specified'}</Table.Cell>
                          <Table.Cell active>{'Non specified'}</Table.Cell>
                      </Table.Row>);
                    }
                  )}
              </Table.Body>
            </Table>
            );
        }
    }

}
export default Kraken10lastETH
