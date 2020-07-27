import React, { Component } from 'react'
import { Home } from './components/Home';
import { Login, Register } from './components/Auth/auth';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const history = createBrowserHistory();

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route path="*">HAHAHA</Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
