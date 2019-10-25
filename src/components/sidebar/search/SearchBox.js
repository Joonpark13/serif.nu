import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { debounce } from 'debounce';
import { withStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { currentSearchInputSelector } from 'selectors';
import { fetchSearchResultsRequest, clearSearchResults, updateSearchInput } from 'actions';
import useSelector from 'util/use-selector';

export const styles = {
  container: {
    margin: 15,
  },
};

function SearchBox({ classes }) {
  const currentSearchInput = useSelector(currentSearchInputSelector);
  const dispatch = useDispatch();

  function handleChange(value) {
    dispatch(updateSearchInput(value));

    if (value.length > 2) {
      debounce(() => dispatch(fetchSearchResultsRequest(value)), 300)();
    } else {
      dispatch(clearSearchResults());
    }
  }

  return (
    <div className={classes.container}>
      <TextField
        value={currentSearchInput}
        onChange={event => handleChange(event.target.value)}
        label="Search for classes"
        type="search"
        fullWidth
      />
    </div>
  );
}

export { SearchBox as UnstyledSearchBox };

export default withStyles(styles)(SearchBox);

SearchBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
