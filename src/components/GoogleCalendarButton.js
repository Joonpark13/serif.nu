import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { sectionsSelector } from 'selectors';
import useSelector from 'util/use-selector';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
  icon: {
    color: 'white',
  },
});

export default function GoogleCalendarButton() {
  const sections = useSelector(sectionsSelector);
  const classes = useStyles();
  const timeZone = '-06:00';
  const dateOfTheFirstClass = {
    Tu: '2020-03-31T',
    We: '2020-04-01T',
    Th: '2020-04-02T',
    Fr: '2020-04-03T',
    Mo: '2020-04-06T',
  };
  const events = [];
  const handleClick = () => {
    sections.forEach(
      (section) => {
        // '2015-05-28T09:00:00-07:00'
        const dow = section.event.dow;
        const date = dateOfTheFirstClass[dow];
        const startTime = `${date + section.event.start.hour}:${section.event.start.minute}:00${timeZone}`;
        const endTime = `${date + section.event.end.hour}:${section.event.end.minute}:00${timeZone}`;
        const event = {
          summary: `${section.subjectId}${section.courseId}`,
          description: section.name,
          location: section.event.location,
          start: {
            dateTime: startTime,
            timeZone: 'America/Chicago',
          },
          end: {
            dateTime: endTime,
            timeZone: 'America/Chicago',
          },
          recurrence: [
            'RRULE:FREQ=WEEKLY;COUNT=10',
          ],
        };
        events.push(event);
      },
    );
    console.log(events);
  };

  return (
    <div>
      <Tooltip title="Export to Google Calendar">
        <IconButton aria-label="GoogleCalendar">
          <EventIcon onClick={handleClick} className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
