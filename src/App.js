import PropTypes from 'prop-types'
import React from 'react'
import Homepage from './components/Homepage';
import Content from './components/Content';
import Content_Example from './components/Exemple';
import Footer from './components/Footer';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import {
  Menu,
  Container,
  Responsive,
  Segment,
  Visibility,
  Button,
  Grid,
  List,
} from 'semantic-ui-react'

const App = () => (
 <div>
  <BrowserRouter>
    <div>
        <Segment inverted style={{ minHeight: 50, padding: '1em 0em' }} vertical pointing>
          <Menu
              inverted={true}
              pointing={true}
              secondary={true}
              size='large'
          >
             <Container>
                   <Menu.Item>
                      <Link to="/home">Home</Link>
                   </Menu.Item>
                   <Menu.Item>
                      <Link to="/data">Data Visualisation</Link>
                   </Menu.Item>
                   <Menu.Item>
                      <Link to="/example"> Spread Result</Link>
                   </Menu.Item>
                   <Menu.Item position='right'>
                      <Button as='a' inverted>Reach out!</Button>
                   </Menu.Item>
             </Container>
          </Menu>
         </Segment>
            <Route exact path='/home' component={Homepage}/>
            <Route exact path='/data' component={Content}/>
            <Route exact path='/example' component={Content_Example}/>
    </div>
  </BrowserRouter>
  <Footer />
</div>
)

export default App ;