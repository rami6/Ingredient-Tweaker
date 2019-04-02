import React, { Component } from 'react';
import './App.css';
import IngredientForm from './components/IngredientForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Ingredient Tweaker</h2>
        <IngredientForm />
      </div>
    );
  }
}

export default App;
