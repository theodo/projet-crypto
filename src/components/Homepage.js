import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import { Link,
//         BrowserRouter as Router,
// } from 'react-router-dom' ;
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

import courbe from './assets/courbe.png'



/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Blackship'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Arbitration opportunities.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Visualize
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
             {/*   <Container>
                    <div>
                        <Menu.Item as='a'>Home</Menu.Item>
                        <Menu.Item as='a'> Data Visualisation</Menu.Item>
                        <Menu.Item as='a'> Example Result</Menu.Item>
                        <Menu.Item as='a'>Careers</Menu.Item>
                        <Menu.Item as='a'>Home{' '}</Menu.Item>
                        <Menu.Item as='a'> Data Visualisation{' '}</Menu.Item>
                        <Menu.Item as='a'> Example Result </Menu.Item>
                        <Menu.Item as='a'>Careers</Menu.Item>
                    </div>
                        <Menu.Item position='right'>
                            <Button as='a' inverted={!fixed}>Reach out!</Button>
                          <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                        </Menu.Item>
                </Container>     */}
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>Data Visualisation</Menu.Item>
            <Menu.Item as='a'>Example Result </Menu.Item>
//            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Reach out!</Menu.Item>
//            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>Reach out!</Button>
//                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Homepage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>We Track Arbitration Opportunity</Header>
            <p style={{ fontSize: '1.33em' }}>
                    Several Bitcoin exchanges exist around the world and the bid/ask prices they propose can be briefly
                    different from an exchange to another. The purpose of Blackship is to automatically profit from these
                    temporary price differences while being market-neutral.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>Concrete Example</Header>
            <p style={{ fontSize: '1.33em' }}>
                    At the first vertical line, the spread between the exchanges is high so a bot could buy Bitstamp and
                    short sells Bitfinex. Then, when the spread closes (second vertical line), the bot exits the market
                    by selling Bitstamp and buying Bitfinex back.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image
              bordered
              rounded
              size='large'
              src={courbe}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>More examples</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>Advantage: Sell VS Short Sell</Header>
        <p style={{ fontSize: '1.33em' }}>
          Unlike classic Bitcoin arbitrage systems, we don't recommend selling but actually short selling Bitcoin on the
          short exchange. This feature offers two important advantages:
        </p>
        <p style={{ fontSize: '1.33em' }}>
          <List bulleted>
            <List.Item>
          The strategy is always market-neutral: the Bitcoin market's moves (up or down) don't impact the strategy returns.
          This removes a huge risk from the strategy. The Bitcoin market could suddenly lose half its value that this won't
          make any difference in the strategy returns.
            </List.Item>
            <List.Item>
            The strategy doesn't need to transfer funds (USD or BTC) between Bitcoin exchanges. The buy/sell and sell/buy
          trading activities are done in parallel on two different exchanges, independently. Advantage: no need to deal
          with transfer latency issues.
            </List.Item>
          </List>
        </p>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Study</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>Our proof of concept</Header>
        <p style={{ fontSize: '1.33em' }}>
          We tracked data from xxx, xxx, xxx for xxx days and reported the opportunities we found.
        </p>
        <Button as='a' size='large'>See Results</Button>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default Homepage ;