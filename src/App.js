import React from 'react'
import Homepage from './components/Homepage';
import Content from './components/Content';
import Content_Example from './components/Exemple';
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
} from 'semantic-ui-react'

 

const App = () => (
  <BrowserRouter>
    <div>
       
     <Responsive {...Responsive.onlyComputer}>
        <Segment inverted textAlign='center' style={{ minHeight: 50, padding: '1em 0em' }} vertical>
            <Menu
              size='large'
            >
              <Container>
                   <div>
                      <Menu.Item>
                          <Button as='a'>
                            <Link to="/home">Home</Link>
                          </Button>
                      </Menu.Item>
                      <Menu.Item>
                           <Button as='a'>
                            <Link to="/data">Data Visualisation</Link>
                           </Button>
                      </Menu.Item>
                      <Menu.Item>
                           <Button as='a'>
                               <Link to="/example"> Spread Result</Link>
                           </Button>
                      </Menu.Item>
                   </div>
                </Container>
           </Menu>
         </Segment>
     </Responsive>
            <Route exact path='/home' component={Homepage}/>
            <Route exact path='/data' component={Content}/>
            <Route exact path='/example' component={Content_Example}/>
    </div>
  </BrowserRouter>
)

export default App ;
