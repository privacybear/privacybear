import React, { Component } from "react";
import { Home } from "./components/Home";
import { Login, Register, Logout } from "./components/Auth/auth";
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
            <Route exact path="/dashboard">
              Yes
            </Route>
            <Route exact path="/" component={Home} />
            <Route path="*">404 - Requested URL not found</Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
