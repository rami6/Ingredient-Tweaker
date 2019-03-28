import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngredientFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientAmount: 0,
      adjustedBaseAmount: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleOriginalAmountChange = this.handleOriginalAmountChange.bind(this);
    this.handleAdjustedBaseAmountChange = this.handleAdjustedBaseAmountChange.bind(this);
  }

  handleInputChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSelect() {
    const { optionNum, updateSelect, multiplier } = this.props;
    updateSelect(optionNum);
    this.setState(prevState => ({
      adjustedBaseAmount: prevState.ingredientAmount * multiplier
    }));
  }

  handleOriginalAmountChange(event) {
    this.handleInputChange(event);
    const { optionNum, selectedOption } = this.props;
    const newOriginalAmount = event.target.value;
    if (selectedOption === optionNum) {
      const { updateMultiplier } = this.props;
      if (newOriginalAmount > 0) {
        const { adjustedBaseAmount } = this.state;
        const ratio = adjustedBaseAmount / newOriginalAmount;
        updateMultiplier(ratio);
      } else {
        this.setState({
          adjustedBaseAmount: 0
        });
        updateMultiplier(1);
      }
    }
  }

  handleAdjustedBaseAmountChange(event) {
    const { ingredientAmount } = this.state;
    this.handleInputChange(event);
    if (ingredientAmount > 0) {
      const { updateMultiplier } = this.props;
      const ratio = event.target.value / ingredientAmount;
      updateMultiplier(ratio);
    }
  }

  render() {
    const { ingredientName, ingredientAmount, adjustedBaseAmount } = this.state;
    const { optionNum, selectedOption, multiplier } = this.props;
    let adjustedField;

    if (selectedOption === optionNum) {
      adjustedField = (
        <input
          name="adjustedBaseAmount"
          type="number"
          value={adjustedBaseAmount}
          onChange={this.handleAdjustedBaseAmountChange}
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
            onChange={this.handleOriginalAmountChange}
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
