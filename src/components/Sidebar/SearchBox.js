import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'debounce';

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
    this.handleChangeHelper = debounce(this.handleChangeHelper.bind(this), 300);
  }

  handleChange(value) {
    const { clearSearchResults } = this.props;

    this.setState({ searchText: value });

    if (value.length > 2) {
      this.handleChangeHelper(value);
    } else {
      clearSearchResults();
    }
  }

  // Added because debouncing the handleChange function
  // delays the text showing in the textbox (setState)
  handleChangeHelper(value) {
    const { handleSearchInput } = this.props;

    handleSearchInput(value);
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
