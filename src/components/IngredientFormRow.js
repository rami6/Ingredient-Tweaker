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
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  handleInputChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  }

  toggleSelected() {
    console.log(this.props.optionNum);
  }

  render() {
    const { ingredientName, ingredientAmount } = this.state;
    const { optionNum } = this.props;

    return (
      <tr>
        <td>
          <input
            name="baseIngredient"
            type="radio"
            value={optionNum}
            onChange={this.toggleSelected}
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
        <td>{ingredientAmount}</td>
      </tr>
    );
  }
}

IngredientFormRow.propTypes = {
  optionNum: PropTypes.number.isRequired
};

export default IngredientFormRow;
