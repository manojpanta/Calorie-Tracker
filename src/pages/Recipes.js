import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import App from '../App'


class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: ''
    }
  }


  render() {
    var recipesR = this.props.recipes
    return (
      <div className="FormCenter">
        <div>
          <ul>
          {
            Object.keys(recipesR).map(function (key) {
              return <><div class="recipe"><center><h2>{recipesR[key].label}</h2>
                <img  src={recipesR[key].image} alt={recipesR[key].label}/>
                <h4> Cook Time: {recipesR[key].cook_time}</h4>
                <h4> Calories: {Math.round(recipesR[key].calories)}</h4>
                <h4> Ingredients :{recipesR[key].ingredients}</h4></center>
              </div></>
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
export default Recipes;
