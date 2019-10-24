import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Divider } from '@material-ui/core';

const useStyles = makeStyles({
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
});

export default function SidebarHeader({ title, back }) {
  const classes = useStyles();
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
  title: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
};
