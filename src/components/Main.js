import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Content from './Content'
// import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/data' component={Content}/>
      {/*  <Route exact path='/example' component={Example}/> */}
    </Switch>
  </main>
)

export default Main ;