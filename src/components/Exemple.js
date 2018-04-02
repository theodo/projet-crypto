import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './app.css'

import bitcoinImg from './assets/bitcoin.png'
import ethImg from './assets/eth.png'
import litecoinImg from './assets/litecoin.png'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import { Divider, Segment } from 'semantic-ui-react'

import Spread from './Chart_spread'
import SpreadETH from './Chart_spread_eth'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

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
// La classe Content contient les Tabs par monnaie ainsi que leur Content
class Content_Example extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
            <Tabs>
              <Tab label="Bitcoin" >
                <div>
                  <p>

                    <Spread />
                  </p>
                </div>
              </Tab>
              <Tab label="Ethereum" >
                <div>
                  <p>
                    <SpreadETH />
                  </p>
                </div>
              </Tab>
            </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}


export default Content_Example;
