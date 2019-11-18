/* eslint-disable no-console */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { sectionsSelector } from 'selectors';
import useSelector from 'util/use-selector';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
  icon: {
    color: 'white',
  },
});

/* istanbul ignore next */
export default function GoogleCalendarButton() {
  const sections = useSelector(sectionsSelector);
  const classes = useStyles();
  // TODO make this dynamic based on the term
  const dateOfFirstClass = {
    Tu: '2020-03-31T',
    We: '2020-04-01T',
    Th: '2020-04-02T',
    Fr: '2020-04-03T',
    Mo: '2020-04-06T',
  };
  const { clientId, apiKey } = GCAL_CONFIG;
  const { enqueueSnackbar } = useSnackbar();
  const message = 'Classes successfully exported to Google Calendar';
  const exportSuccess = () => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };
  const events = sections.map((section) => {
    const dow = section.event.dow;
    const date = dateOfFirstClass[dow];
    const startTime = `${date + section.event.start.hour}:${section.event.start.minute}:00`;
    const endTime = `${date + section.event.end.hour}:${section.event.end.minute}:00`;
    const event = {
      summary: `${section.subjectId} ${section.courseId}`,
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
    return event;
  });

  const initAuth = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: clientId,
      })
        .then(() => {
          window.gapi.load('client', () => {
            window.gapi.client.setApiKey(apiKey);
            window.gapi.client.load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest')
              .then(() => { console.log('GAPI client loaded for API'); },
                (err) => { console.error('Error loading GAPI client for API', err); });
          });
          window.gapi.auth2.getAuthInstance()
            .signIn({ scope: 'https://www.googleapis.com/auth/calendar' })
            .then(() => {
              events.forEach(
                (event) => {
                  const newEvent = {
                    calendarId: 'primary',
                    resource: event,
                  };
                  const request = window.gapi.client.calendar.events.insert(newEvent,
                    (err, res) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      console.log('Event created: %s', res.htmlLink);
                    });
                  request.execute(resp => console.log(resp));
                },
              );
            },
            (err) => { console.error('Error signing in', err); })
            .then(() => {
              exportSuccess();
            });
        });
    });
  };

  const loadGapiAndAfterwardsInitAuth = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = initAuth;
    const meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content = '%REACT_APP_GOOGLE_ID_OF_WEB_CLIENT%';
    document.head.appendChild(meta);
    document.head.appendChild(script);
  };

  return (
    <div>
      <Tooltip title="Export to Google Calendar">
        <IconButton onClick={loadGapiAndAfterwardsInitAuth} aria-label="GoogleCalendar">
          <EventIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
