import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';

class IngredientForm extends Component {
  render() {
    return (
      <table>
        <tbody>
          <IngredientFormRow />
        </tbody>
      </table>
    );
  }
}

export default IngredientForm;
