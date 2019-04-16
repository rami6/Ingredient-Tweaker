import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import UnitFieldTheme from './UnitFieldTheme.css';

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

class UnitField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
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
        theme={UnitFieldTheme}
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

UnitField.propTypes = {
  optionNum: PropTypes.number.isRequired
};

export default UnitField;
