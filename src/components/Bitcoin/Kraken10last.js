import React, { Component } from 'react';
import axios from 'axios';
import './Exchange.css'
import { Table, Menu, Icon, Label } from 'semantic-ui-react';

//const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

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
    return time;
}


class Kraken10last extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestFailed: true,
            data: {}
        }
    }


    componentDidMount() {
        axios.get('https://api.kraken.com/0/public/OHLC?pair=XBTUSD&interval=5&since=1513338300').then((response) => {
            console.log(response.data.result.XXBTZUSD.slice(0,3))
            this.setState({ data: response.data.result.XXBTZUSD.reverse(), requestFailed: false });
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

                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.slice(0, 7).map(
                  (elem, key) =>
                    {
                        return(
                      <Table.Row key={key}>
                        <Table.Cell >{timeConverter(elem[0])}</Table.Cell>
                        <Table.Cell active>{Math.trunc(String(elem[1]).substring(0,12))}</Table.Cell>

                      </Table.Row>);
                    }
                  )}
              </Table.Body>
            </Table>
            );
        }
    }

}
export default Kraken10last
