import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import App from '../App'
import Recipes from './Recipes'


class Users extends Component {
  constructor(props) {
    super();
    this.state = {
      email: props.location.email,
      password: props.location.password,
      name: props.location.name,
      hasSearched: false,
      recipes: {}
    };
    this.randomRecipe = this.randomRecipe.bind(this);
  }

  randomRecipe(text) {
    if (this.refs.textBox.value !== "") {
      const url = `https://edamam-service.herokuapp.com/api/v1/recipes?q=${this.refs.textBox.value}`;
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(proxyurl + url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "GET"
        }
      )
      .then(response => response.json())
      .then(result => {
        if (result.recipe1) {
          this.setState({hasSearched: true, recipes: result})
        } else {
          alert('No Recipes Found. Please Search Different Food')
        }
      })
    } else {
      alert("Please Enter Food Search Term")
    }
  }

  render() {
    return (
      <div className="FormCenter">
      <div className='WelcomeBanner'>
        <h1> Welcome {this.state.email} </h1>
      </div>
      {
        this.state.hasSearched
        ? <Recipes recipes={this.state.recipes}/>
        : <><input ref= 'textBox' type = 'text'/>
        <button onClick= { (e)=> {this.randomRecipe("")} }>Get Recipes By Food Input</button></>
      }
      </div>
    );
  }
}
export default Users;
