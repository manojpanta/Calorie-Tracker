import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
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
      console.log(JSON.stringify(this.state));
      const url = "https://quantified-self1811.herokuapp.com/api/v1/users";
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      if (this.state.password === this.state.password_confirmation) {
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
      .then(result=> {
        if (result.success) {
          this.setState({redirect: true})
          this.props.loggedIn()
        }else {
          alert(result.error)
        }
      })
      .then(result => console.log(result))

      }else {
        alert("Passwords Do Not Match")
      }
    }

    render() {
      return(
        <div className="FormCenter">
          {
            this.state.redirect
            ? <Redirect to={{pathname: '/users', state: {email: 'test@test.com'}}}/>
            :
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="passwordConfirmation">Password Confirmation</label>
                <input type="password" id="password-confirmation" className="FormField__Input" placeholder="Confirm your password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">Im already member</Link>
              </div>
            </form>
          }
          </div>
        );
    }
}

export default SignUpForm;
