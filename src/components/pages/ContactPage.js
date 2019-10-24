import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import facebookLogo from 'images/facebook-logo.png';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

const useStyles = makeStyles({
  pageContainer,
  pageBody,
  contactMethod: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactLink: {
    marginRight: 10,
  },
  facebookLogo: {
    width: 36, // width of large icon (email)
  },
});

export default function ContactPage() {
  const classes = useStyles();
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Contact Us" />

      <div className={classes.pageBody}>
        <div className={classes.contactMethod}>
          <a href="mailto:serifnorthwestern@gmail.com" className={classes.contactLink}>
            <Icon color="primary" fontSize="large">email</Icon>
          </a>
          <Typography variant="h5">
            Email
          </Typography>
        </div>

        <div className={classes.contactMethod}>
          <a href="https://www.facebook.com/serifnorthwestern" className={classes.contactLink}>
            <img className={classes.facebookLogo} src={facebookLogo} alt="Facebook logo" />
          </a>
          <Typography variant="h5">
            Facebook
          </Typography>
        </div>
      </div>
    </div>
  );
}
