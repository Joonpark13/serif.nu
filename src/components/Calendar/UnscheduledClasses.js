import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const styles = {
  title: {
    padding: 15,
  },
};

function UnscheduledClasses({ classes }) {
  return (
    <div className={classes.title}>
      <Typography variant="h6">Unscheduled Classes</Typography>
    </div>
  );
}

UnscheduledClasses.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { UnscheduledClasses as UnstyledUnscheduledClasses };

export default withStyles(styles)(UnscheduledClasses);
