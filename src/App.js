import React, { Component } from 'react';
import './App.css';
import IngredientForm from './components/IngredientForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Ingredient Tweaker</h2>
        <IngredientForm />
        <div className="description-container">
          <div>How to Use</div>
          <ol>
            <li>Fill original amounts of ingredients into the left side of arrows.</li>
            <li>Select the ingredient to be a base.</li>
            <li>
              To the right side of the arrow, input the amount you want to consume at this time.
            </li>
            <li>You can see adjusted amounts of all ingredients!</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
