import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const { handleSearchInput } = this.props;

    this.setState({ searchText: value });

    if (value.length > 2) {
      handleSearchInput(value);
    }
  }

  render() {
    const { searchText } = this.state;

    return (
      <TextField
        value={searchText}
        onChange={event => this.handleChange(event.target.value)}
        label="Search for classes"
        type="search"
      />
    );
  }
}

export default SearchBox;

SearchBox.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
};
