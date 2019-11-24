import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

const useStyles = makeStyles({
  pageContainer,
  pageBody,
});

export default function FeatureRequestPage() {
  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Request a Feature" />

      <div className={classes.pageBody}>
        {(
          <iframe
            title="Bug report google form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScaXXO7ySVcBk1g0FGdMQqLii0eFaNkh6sOzrTB9KmDe5XmTA/viewform?embedded=true"
            width="100%"
            height="1100"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading...
          </iframe>
        )}
      </div>
    </div>
  );
}
