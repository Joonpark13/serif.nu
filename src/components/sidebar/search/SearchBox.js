import React from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'debounce';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { currentSearchInputSelector } from 'selectors';
import { fetchSearchResultsRequest, clearSearchResults, updateSearchInput } from 'actions';
import useSelector from 'util/use-selector';

const useStyles = makeStyles({
  container: {
    margin: 15,
  },
});

export default function SearchBox() {
  const classes = useStyles();
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
