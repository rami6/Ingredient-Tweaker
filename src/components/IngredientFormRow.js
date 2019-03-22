import React, { Component } from 'react';

class IngredientFormRow extends Component {
  render() {
    return (
      <tr>
        <td><input type="radio" value="option1" /></td>
        <td><input type="text" /></td>
        <td><input type="number" /></td>
        <td>→</td>
        <td><input type="number" /></td>
      </tr>
    );
  }
}

export default IngredientFormRow;