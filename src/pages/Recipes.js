import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import App from '../App'


class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      mealType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    let target = e.target;
    let value = target.value;
    await this.setState({
      mealType: value
    });
  }

  handleSubmit(foodName, calories, e) {
    e.preventDefault();
    const url = "https://quantified-self1811.herokuapp.com/api/v1/foods";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let body = {"food": {"name": foodName, "calories": calories }}
    console.log(body)
    if (this.state.mealType !== '') {
      fetch(proxyurl + url,
        {
          headers: {
            'Origin': 'X-Requested-With',
            'cookie': 'cookie2',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(body)
      })
      .then(result => {
        console.log(result)
      })
      .catch(error=> {
        console.log(error)
      })
    } else {
      alert("Please Choose Your Meal Type")
    }
  }
  render() {
    var recipes = this.props.recipes
    return (
      <div className="FormCenter">
        <div>
          <ul>
          {
            Object.keys(recipes).map(key => {
              return (
              <>
                <div class="recipe">
                  <center>
                    <h2>{recipes[key].label}</h2>
                    <img  src={recipes[key].image} alt={recipes[key].label}/>
                    <h4> Cook Time: {recipes[key].cook_time}</h4>
                    <h4> Calories: {Math.round(recipes[key].calories)}</h4>
                    <h4> Ingredients :{recipes[key].ingredients}</h4></center>

                    <form onSubmit={this.handleSubmit.bind(this, recipes[key].label, recipes[key].calories)} className="FormFields">
                      <label className="FormField__CheckboxLabel">
                        <input className="FormField__Checkbox" type="checkbox" name="mealType" value="Breakfast" onChange={this.handleChange} />Breakfast
                        <input className="FormField__Checkbox" type="checkbox" name="mealType" value="Lunch" onChange={this.handleChange} />Lunch
                        <input className="FormField__Checkbox" type="checkbox" name="mealType" value="Dinner" onChange={this.handleChange} />Dinner
                        <input className="FormField__Checkbox" type="checkbox" name="mealType" value="Snack" onChange={this.handleChange} />Snack
                      </label>
                      <center><button>Cook It!</button></center>
                    </form>

                </div>
              </>
              )
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
export default Recipes;
