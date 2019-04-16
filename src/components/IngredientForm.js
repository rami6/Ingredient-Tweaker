import React, { Component } from 'react';
import IngredientFormRow from './IngredientFormRow';
import './IngredientForm.css';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 10,
      selectedOption: 0,
      multiplier: 1,
      showOriginalAmounts: true
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.updateMultiplier = this.updateMultiplier.bind(this);
    this.addFormRow = this.addFormRow.bind(this);
    this.toggleShowOriginalAmounts = this.toggleShowOriginalAmounts.bind(this);
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

  toggleShowOriginalAmounts() {
    this.setState(prevState => ({
      showOriginalAmounts: !prevState.showOriginalAmounts
    }));
  }

  render() {
    const { rowCount, selectedOption, multiplier, showOriginalAmounts } = this.state;

    const rowIndices = Array.from(Array(rowCount).keys());
    const formRows = rowIndices.map(i => (
      <IngredientFormRow
        key={i}
        optionNum={i}
        selectedOption={selectedOption}
        multiplier={multiplier}
        showOriginalAmounts={showOriginalAmounts}
        updateSelect={this.updateSelect}
        updateMultiplier={this.updateMultiplier}
      />
    ));

    let tableHeader;
    if (showOriginalAmounts) {
      tableHeader = (
        <tr>
          <th colSpan="2" />
          <th colSpan="3">
            <button type="button" onClick={this.toggleShowOriginalAmounts}>
              Hide original amounts
            </button>
          </th>
        </tr>
      );
    } else {
      tableHeader = (
        <tr>
          <th />
          <th>
            <button type="button" onClick={this.toggleShowOriginalAmounts}>
              Show original amounts
            </button>
          </th>
        </tr>
      );
    }

    return (
      <div>
        <table>
          <thead>{tableHeader}</thead>
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
