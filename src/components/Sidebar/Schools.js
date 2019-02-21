import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = {
  loadingContainer: {
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
  },
};

function Schools({ schools, isFetching, classes }) {
  if (isFetching) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <List>
        {schools
          && schools.map(school => (
            <ListItem
              key={`${school.id}`}
              button
            >
              <ListItemText primary={`${school.name}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

Schools.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Schools as UnstyledSchools };
export default withStyles(styles)(Schools);
