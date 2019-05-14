import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link, NavLink, Redirect} from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Users from './pages/users';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: ''
    }
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  setEmail(email){
    this.setState({
      email: email
    })
  }

  loggedIn(){
    this.setState({
      loggedIn: true
    })
  }

  loggedOut(){
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Form">
            <div className="PageSwitcher">
                {
                  this.state.loggedIn
                  ? <NavLink to="/sign-in" onClick={this.loggedOut} activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Log Out</NavLink>

                  : <><NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink> <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink></>
                }
              </div>

              <Switch>
              <Route
                path='/sign-up'
                render={(props) => <SignUpForm{...props} loggedIn={this.loggedIn} />}
              />
              <Route
                path='/sign-in'
                render={(props) => <SignInForm {...props} setEmail={this.setEmail} loggedIn={this.loggedIn} />}
              />

              <Route
                path='/users'
                render={(props) => <Users {...props}/>}
              />
              </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
