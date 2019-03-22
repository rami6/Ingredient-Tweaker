import React, { Component } from 'react';
import './App.css';
import IngredientForm from './components/IngredientForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <IngredientForm />
        </header>
      </div>
    );
  }
}

export default App;
