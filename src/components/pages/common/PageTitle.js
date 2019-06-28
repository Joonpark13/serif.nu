import React from 'react';
import { northwesternPurple10 } from 'util/colors';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

export const styles = {
  page: {
    margin: 20,
    padding: 5,
    borderBottom: `2px solid ${northwesternPurple10}`,
  },
};


function PageTitle({ classes, title }) {
  return (
    <div className={classes.page}>
      <Typography variant="h3" color="primary">
        {title}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export { PageTitle as UnstyledPageTitle };
export default withStyles(styles)(PageTitle);
