import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngredientFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientAmount: 0,
      adjustedAmount: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  render() {
    const { ingredientName, ingredientAmount, adjustedAmount } = this.state;
    const { optionNum, selectedOption } = this.props;
    let adjustedField;

    if (selectedOption === optionNum) {
      adjustedField = (
        <input
          name="adjustedAmount"
          type="number"
          value={adjustedAmount}
          onChange={this.handleInputChange}
        />
      );
    } else {
      adjustedField = adjustedAmount;
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
  updateSelect: PropTypes.func.isRequired
};

export default IngredientFormRow;
