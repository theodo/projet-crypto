import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const MyBeautifulComponent = () => (
  <Tabs>
    <Tab label="Item One" >
      <div>
        <h2 style={styles.headline}>Tab One</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          < />
        </p>
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab label="Item Three" >
      <div>
        <h2 style={styles.headline}>Tab Three</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
);

export default MyBeautifulComponent;
