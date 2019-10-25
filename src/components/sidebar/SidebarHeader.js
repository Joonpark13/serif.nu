import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, Button, Divider } from '@material-ui/core';

export const styles = {
  sectionsRoot: {
    padding: 16,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginTop: 5,
  },
};

function SidebarHeader({ classes, title, back }) {
  return (
    <Fragment>
      <Typography variant="h5" className={classes.title}>
        {title}
        <Button onClick={back}>Back</Button>
      </Typography>

      <Divider className={classes.divider} />
    </Fragment>
  );
}

SidebarHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
};

export { SidebarHeader as UnstyledSidebarHeader };
export default withStyles(styles)(SidebarHeader);
