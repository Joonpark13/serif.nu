import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

export const useStyles = makeStyles({
  pageContainer,
  pageBody,
});

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="404 Page Not Found" />

      <div className={classes.pageBody}>
        <Typography variant="h5">
          The requested URL was not found on this server.
        </Typography>
      </div>
    </div>
  );
}
