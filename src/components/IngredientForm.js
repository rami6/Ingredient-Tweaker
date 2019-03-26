import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 5
    };
  }

  render() {
    const { rowCount } = this.state;
    const rowIndices = Array.from(Array(rowCount).keys());
    const formRows = rowIndices.map(i => <IngredientFormRow key={i} />);
    return (
      <table>
        <tbody>{formRows}</tbody>
      </table>
    );
  }
}

export default IngredientForm;
