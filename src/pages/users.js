import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import App from '../App'


class Users extends Component {
  constructor(props) {
    super();

    this.state = {
      email: props.location.email,
      password: props.location.password
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="FormCenter">
        <div className='WelcomeBanner'>
          <h1> Welcome {this.state.email} </h1>
          <h1> Password:{this.state.password} </h1>
        </div>
      </div>
    );
  }
}
export default Users;
