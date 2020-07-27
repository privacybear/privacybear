import React, { Component } from 'react'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export class Layout extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
        {this.props.children}
      </div>
      </Router>
    )
  }
}

export default Layout
