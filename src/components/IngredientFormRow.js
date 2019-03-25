import React, { Component } from 'react';

class IngredientFormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: '',
      ingredientAmount: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    const { ingredientName } = this.state;
    const { ingredientAmount } = this.state;
    return (
      <tr>
        <td>
          <input type="radio" value="option1" />
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

export default IngredientFormRow;
