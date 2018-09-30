import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export const styles = {
  container: {
    margin: 15,
  },
};

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const { handleSearchInput, clearSearchResults } = this.props;

    this.setState({ searchText: value });

    if (value.length > 2) {
      handleSearchInput(value);
    } else {
      clearSearchResults();
    }
  }

  render() {
    const { classes } = this.props;
    const { searchText } = this.state;

    return (
      <div className={classes.container}>
        <TextField
          value={searchText}
          onChange={event => this.handleChange(event.target.value)}
          label="Search for classes"
          type="search"
          fullWidth
        />
      </div>
    );
  }
}

export { SearchBox as UnstyledSearchBox };

export default withStyles(styles)(SearchBox);

SearchBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
};
