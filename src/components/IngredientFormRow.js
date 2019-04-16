import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitInput from './UnitInput';
import './IngredientFormRow.css';

class IngredientFormRow extends Component {
  static handleAmountFocus(event) {
    event.target.select();
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientAmount: null,
      ingredientUnit: '',
      adjustedBaseAmount: null
    };

    this.setAdjustedUnit = this.setAdjustedUnit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleOriginalAmountChange = this.handleOriginalAmountChange.bind(this);
    this.handleAdjustedBaseAmountChange = this.handleAdjustedBaseAmountChange.bind(this);
  }

  setAdjustedUnit(unit) {
    this.setState({
      ingredientUnit: unit
    });
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
    if (multiplier > 0) {
      this.setState(prevState => ({
        adjustedBaseAmount: parseFloat((prevState.ingredientAmount * multiplier).toFixed(1))
      }));
    } else {
      const { updateMultiplier } = this.props;
      updateMultiplier(1);
      this.setState(prevState => ({
        adjustedBaseAmount: prevState.ingredientAmount
      }));
    }
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
    const { ingredientName, ingredientAmount, ingredientUnit, adjustedBaseAmount } = this.state;
    const { optionNum, selectedOption, multiplier, showOriginalAmounts } = this.props;
    let originalAmountTd;
    let originalUnitTd;
    let arrowTd;
    let adjustedAmountField;
    let namePlaceHolder;
    let amountPlaceHolder;

    if (optionNum === 0) {
      namePlaceHolder = 'Ingredient name';
      amountPlaceHolder = '0';
    }

    if (showOriginalAmounts) {
      originalAmountTd = (
        <td>
          <input
            className="amount-input"
            name="ingredientAmount"
            type="number"
            placeholder={amountPlaceHolder}
            value={ingredientAmount}
            onChange={this.handleOriginalAmountChange}
            onFocus={IngredientFormRow.handleAmountFocus}
          />
        </td>
      );
      originalUnitTd = (
        <td>
          <UnitInput
            optionNum={optionNum}
            ingredientUnit={ingredientUnit}
            setAdjustedUnit={this.setAdjustedUnit}
          />
        </td>
      );
      arrowTd = (
        <td>
          <div>→</div>
        </td>
      );
    }

    if (selectedOption === optionNum) {
      adjustedAmountField = (
        <input
          className="amount-input"
          name="adjustedBaseAmount"
          type="number"
          value={adjustedBaseAmount}
          placeholder={amountPlaceHolder}
          onChange={this.handleAdjustedBaseAmountChange}
          onFocus={IngredientFormRow.handleAmountFocus}
        />
      );
    } else if (ingredientAmount * multiplier === 0) {
      adjustedAmountField = <div className="adjusted-amount" />;
    } else {
      adjustedAmountField = (
        <div className="adjusted-amount">
          {parseFloat((ingredientAmount * multiplier).toFixed(1))}
        </div>
      );
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
            className="name-input"
            name="ingredientName"
            type="text"
            value={ingredientName}
            onChange={this.handleInputChange}
            placeholder={namePlaceHolder}
          />
        </td>
        {originalAmountTd}
        {originalUnitTd}
        {arrowTd}
        <td>{adjustedAmountField}</td>
        <td>
          <div className="adjusted-unit">{ingredientUnit}</div>
        </td>
      </tr>
    );
  }
}

IngredientFormRow.propTypes = {
  optionNum: PropTypes.number.isRequired,
  selectedOption: PropTypes.number.isRequired,
  multiplier: PropTypes.number.isRequired,
  showOriginalAmounts: PropTypes.bool.isRequired,
  updateSelect: PropTypes.func.isRequired,
  updateMultiplier: PropTypes.func.isRequired
};

export default IngredientFormRow;
