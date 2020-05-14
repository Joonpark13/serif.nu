import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';

export const useStyles = makeStyles({
  dialog: {
    top: '12.5%',
    left: '12.5%',
    width: '500px',
    padding: '10px',
  },
});

export default function AnnouncementDialog() {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(!window.localStorage.getItem('announcementSeen'));

  const closeDialog = () => {
    window.localStorage.setItem('announcementSeen', true);
    setShowDialog(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={closeDialog}
    >
      <div className={classes.dialog}>
        <DialogTitle variant="h5">
          Future plans for Serif.nu
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            It has been quite the ride for Serif over the past few years. What initially started as
            a small personal project by Joon has become an integral part of the class registration
            experience, having now helped Northwestern students for almost
            five years.
          </DialogContentText>
          <DialogContentText>
            Unfortunately, the&nbsp;
            <a href="/about" target="_blank" rel="noopener noreferrer">dev team</a>
            &nbsp;will be dissolving as Kevin graduates this upcoming June.
            This means that active development and maintenance of Serif.nu will cease unless a
            capable and dedicated developer takes over ownership of the project. Maintenance entails
            paying for the domain, hosting and deploying the source code for Serif, and updating the
            classes every quarter.
          </DialogContentText>
          <DialogContentText>
            You can contact Kevin at kevinlee2020@u.northwestern.edu if you are interested in
            doing so. Serif.nu is open-source, the code is available to see on&nbsp;
            <a href="https://github.com/Joonpark13/serif.nu" target="_blank" rel="noopener noreferrer">GitHub.</a>
          </DialogContentText>
          <DialogContentText>
            Thanks for using Serif.nu!
          </DialogContentText>
          <DialogContentText>
            Kevin, Joon, and the Serif.nu dev team
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
