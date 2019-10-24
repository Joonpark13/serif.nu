import React from 'react';
import { northwesternPurple10 } from 'util/colors';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    margin: 20,
    padding: 5,
    borderBottom: `2px solid ${northwesternPurple10}`,
  },
});

export default function PageTitle({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Typography variant="h3" color="primary">
        {title}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
