import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 5,
      selectedOption: 0
    };

    this.updateSelect = this.updateSelect.bind(this);
  }

  updateSelect(option) {
    this.setState({
      selectedOption: option
    });
  }

  render() {
    const { rowCount, selectedOption } = this.state;
    const rowIndices = Array.from(Array(rowCount).keys());
    const formRows = rowIndices.map(i => (
      <IngredientFormRow
        key={i}
        optionNum={i}
        selectedOption={selectedOption}
        updateSelect={this.updateSelect}
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
