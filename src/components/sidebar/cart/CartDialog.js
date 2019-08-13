import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeAllClasses } from 'actions';

export default function CartDialog() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleRemoveAll = () => {
    dispatch(removeAllClasses());
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Are you sure you want to remove all classes?</DialogTitle>
      <DialogActions>
        <Button onClick={handleRemoveAll}>
            Remove
        </Button>
        <Button onClick={handleClose}>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
