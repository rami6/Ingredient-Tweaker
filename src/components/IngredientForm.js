import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';
import './IngredientForm.css';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 10,
      selectedOption: 0,
      multiplier: 1
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.updateMultiplier = this.updateMultiplier.bind(this);
    this.addFormRow = this.addFormRow.bind(this);
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

  addFormRow() {
    this.setState(prevState => ({
      rowCount: prevState.rowCount + 1
    }));
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
      <div>
        <table>
          <tbody>{formRows}</tbody>
        </table>
        <button className="add-row-button" type="button" onClick={this.addFormRow}>
          +
        </button>
      </div>
    );
  }
}

export default IngredientForm;
