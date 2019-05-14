import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        redirect: false,
        loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = "https://quantified-self1811.herokuapp.com/api/v1/sessions";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    if (this.state.email !== '' && this.state.password !== "") {
      fetch(proxyurl + url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            this.setState({redirect: true})
            this.props.loggedIn()
          } else {
            alert('Invalid Credentials')
          }
        })
      } else {
        alert("Please Enter Credentials")
      }
    }

  render() {
    return (
      <div className="FormCenter">
      {
        this.state.redirect
        ? <Redirect to={{pathname: '/users', email: this.state.email, password: this.state.password}}/>
        :
        <form onSubmit={this.handleSubmit} className="FormFields">
        <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">
              <button  className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
          </div>
        </form>
      }
      </div>
    );
  }
}

export default SignInForm;
