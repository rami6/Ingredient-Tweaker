import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 5,
      selectedOption: 0,
      multiplier: 1
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.updateMultiplier = this.updateMultiplier.bind(this);
  }

  updateSelect(option) {
    this.setState({
      selectedOption: option
    });
  }

  updateMultiplier(number) {
    this.setState({
      multiplier: number
    });
  }

  render() {
    const { rowCount, selectedOption, multiplier } = this.state;
    const rowIndices = Array.from(Array(rowCount).keys());
    const formRows = rowIndices.map(i => (
      <IngredientFormRow
        key={i}
        optionNum={i}
        selectedOption={selectedOption}
        multiplier={multiplier}
        updateSelect={this.updateSelect}
        updateMultiplier={this.updateMultiplier}
      />
    ));
    return (
      <table>
        <tbody>{formRows}</tbody>
      </table>
    );
  }
}

export default IngredientForm;
