import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
  icon: {
    color: 'white',
  },
});

export default function GoogleCalendarButton() {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Export to Google Calendar">
        <IconButton aria-label="GoogleCalendar">
          <EventIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
