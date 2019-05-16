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
    this.randomRecipes = this.randomRecipes.bind(this);
    this.calorieRecipes = this.calorieRecipes.bind(this);
    this.timeRecipes = this.timeRecipes.bind(this);
    this.ingredientsRecipes = this.ingredientsRecipes.bind(this);
  }

  randomRecipes(text) {
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

  calorieRecipes(calories) {
    if (this.refs.calorieCount.value !== "") {
      const url = `https://edamam-service.herokuapp.com/api/v1/recipes/calories?calories=${this.refs.calorieCount.value}`;
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

  timeRecipes(text) {
    if (this.refs.cookTimeCount.value !== "") {
      const url = `https://edamam-service.herokuapp.com/api/v1/recipes?q=${this.refs.cookTimeCount.value}`;
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

  ingredientsRecipes(text) {
    if (this.refs.ingredientCount.value !== "") {
      const url = `https://edamam-service.herokuapp.com/api/v1/recipes?q=${this.refs.ingredientCount.value}`;
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
      <center><div className="FormCenter">
        <div className='WelcomeBanner'>
          <center><h1> Welcome {this.state.email} </h1></center>
        </div>
      {
        this.state.hasSearched
        ? <Recipes recipes={this.state.recipes}/>
        : <><input className='input--field' ref= 'textBox' type = 'text'/>
        <button className='input--button' onClick= { (e)=> {this.randomRecipes("")} }>Get Recipes By Food Input</button>
<br/><br/>
        <input className='input--field' ref= 'calorieCount' type = 'text'/>
        <button className='input--button' onClick= { (e)=> {this.calorieRecipes("")} }>Get Recipes By Calorie Count Input</button>
<br/><br/>
        <input className='input--field' ref= 'cookTimeCount' type = 'text'/>
        <button className='input--button' onClick= { (e)=> {this.timeRecipes("")} }>Get Recipes By Cook Time Input</button>
<br/><br/>
        <input className='input--field' ref= 'ingredientCount' type = 'text'/>
        <button className='input--button' onClick= { (e)=> {this.ingredientsRecipes("")} }>Get Recipes By Ingredients Count Input</button></>
      }
      </div></center>
    );
  }
}
export default Users;
