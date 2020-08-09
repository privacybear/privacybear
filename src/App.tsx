import React, { Component } from "react";
import { Home } from "./components/Home";
import { Login, Register, Logout } from "./components/Auth/auth";
import { Dashboard, History, Rules } from './components/Dashboard/dash';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { Settings } from "./components/Settings/settings";


export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/* <Route exact path="/settings" component={Settings} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/history" component={History} />
            <Route exact path="/dashboard/rules" component={Rules} />
            <Route exact path="/" component={Home} />
            <Route path="*">404 - Requested URL not found</Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
