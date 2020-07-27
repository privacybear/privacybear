import React, { Component } from 'react'
import { Home } from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route><h1 style={{color: '#fff'}}>404</h1></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
