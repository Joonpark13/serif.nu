import React, { useState, Fragment } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    marginLeft: 15,
    marginRight: 15,
    display: 'flex',
  },
  time: {
    marginRight: 15,
  },
});


export default function Custom() {
  const classes = useStyles();
  const [state, setState] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { monday, tuesday, wednesday, thursday, friday } = state;
  const error = [monday, tuesday, wednesday, thursday, friday].filter(v => v).length < 1;

  return (
    <Fragment>
      <div className={classes.container}>
        <FormControl required error={error} component="fieldset" fullWidth margin="normal">
          <TextField
            required
            id="standard-required"
            label="Class Title"
            margin="normal"
          />
          <TextField
            required
            id="standard-required"
            label="Description"
            margin="normal"
          />
          <FormGroup>
            <FormHelperText component="legend">Occurences</FormHelperText>
            <FormControlLabel
              control={<Checkbox checked={monday} onChange={handleChange('monday')} value="monday" />}
              label="Monday"
            />
            <FormControlLabel
              control={<Checkbox checked={tuesday} onChange={handleChange('tuesday')} value="tuesday" />}
              label="Tuesday"
            />
            <FormControlLabel
              control={
                <Checkbox checked={wednesday} onChange={handleChange('wednesday')} value="wednesday" />
                            }
              label="Wednesday"
            />
            <FormControlLabel
              control={<Checkbox checked={thursday} onChange={handleChange('thursday')} value="thursday" />}
              label="Thursday"
            />
            <FormControlLabel
              control={<Checkbox checked={friday} onChange={handleChange('friday')} value="friday" />}
              label="Friday"
            />
          </FormGroup>
          <FormHelperText>At least one</FormHelperText>
          <div>
            <TextField
              className={classes.time}
              id="time"
              label="Start Time"
              type="time"
              margin="normal"
              defaultValue="09:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              className={classes.time}
              id="time"
              label="End Time"
              type="time"
              margin="normal"
              defaultValue="09:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          <Button>Create</Button>
        </FormControl>
      </div>
    </Fragment>
  );
}
