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

function Subjects({ subjects, isFetching, classes }) {
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
        {subjects
          && subjects.map(subject => (
            <ListItem
              key={`${subject.id}`}
              button
            >
              <ListItemText primary={`${subject.id}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

Subjects.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Subjects as UnstyledSubjects };
export default withStyles(styles)(Subjects);
