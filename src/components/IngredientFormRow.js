import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngredientFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientAmount: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdjust = this.handleAdjust.bind(this);
  }

  handleInputChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSelect() {
    const { optionNum, updateSelect } = this.props;
    updateSelect(optionNum);
  }

  handleAdjust(event) {
    const { ingredientAmount } = this.state;
    if (ingredientAmount > 0) {
      const adjustedAmount = event.target.value;
      const ratio = adjustedAmount / ingredientAmount;
      const { updateMultiplier } = this.props;
      updateMultiplier(ratio);
    }
  }

  render() {
    const { ingredientName, ingredientAmount } = this.state;
    const { optionNum, selectedOption, multiplier } = this.props;
    let adjustedField;

    if (selectedOption === optionNum) {
      adjustedField = (
        <input
          name="adjustedAmount"
          type="number"
          value={ingredientAmount * multiplier}
          onChange={this.handleAdjust}
        />
      );
    } else {
      adjustedField = ingredientAmount * multiplier;
    }

    return (
      <tr>
        <td>
          <input
            type="radio"
            value={optionNum}
            onChange={this.handleSelect}
            checked={selectedOption === optionNum}
          />
        </td>
        <td>
          <input
            name="ingredientName"
            type="text"
            value={ingredientName}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            name="ingredientAmount"
            type="number"
            value={ingredientAmount}
            onChange={this.handleInputChange}
          />
        </td>
        <td>→</td>
        <td>{adjustedField}</td>
      </tr>
    );
  }
}

IngredientFormRow.propTypes = {
  optionNum: PropTypes.number.isRequired,
  selectedOption: PropTypes.number.isRequired,
  multiplier: PropTypes.number.isRequired,
  updateSelect: PropTypes.func.isRequired,
  updateMultiplier: PropTypes.func.isRequired
};

export default IngredientFormRow;
