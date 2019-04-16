import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import './UnitInput.css';

const units = ['g', 'ml', 'tbsp', 'tsp', 'cup'];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : units.filter(unit => unit.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => <div>{suggestion}</div>;

class UnitInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount() {
    const { ingredientUnit } = this.props;
    this.setState({
      value: ingredientUnit
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    const { setAdjustedUnit } = this.props;
    setAdjustedUnit(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { optionNum } = this.props;

    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };

    if (optionNum === 0) {
      inputProps.placeholder = 'Unit';
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        id={`unit-${optionNum}`}
      />
    );
  }
}

UnitInput.propTypes = {
  optionNum: PropTypes.number.isRequired,
  ingredientUnit: PropTypes.string.isRequired,
  setAdjustedUnit: PropTypes.func.isRequired
};

export default UnitInput;
