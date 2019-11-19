import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

const useStyles = makeStyles({
  pageContainer,
  pageBody,
});

export default function BugReportPage() {
  const [userHasAcknowledgedMessage, setUserHasAcknowledgeMessage] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Report a Bug" />

      <div className={classes.pageBody}>
        {!userHasAcknowledgedMessage ? (
          <div>
            <Typography variant="h6" gutterBottom>
              I understand that any missing or inaccurate course data is NOT a bug and should not be
              reported.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setUserHasAcknowledgeMessage(true)}>
              Acknowledge
            </Button>
          </div>
        ) : (
          <iframe
            title="Bug Report Google Form"
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
