import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { getFormattedClassSchedule, isUnscheduled } from 'util/time';
import SidebarHeader from '../SidebarHeader';

const useStyles = makeStyles({
  sectionsRoot: {
    padding: 16,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginTop: 5,
  },
});

export default function AssociatedClassesSelection({
  currentCourseName,
  currentSectionNumber,
  associatedClasses,
  back,
  addSectionWithAssociatedClass,
  associatedClassHover,
  associatedClassHoverOff,
}) {
  const classes = useStyles();
  return (
    <div className={classes.sectionsRoot}>
      <SidebarHeader title={`${currentCourseName}-${currentSectionNumber}`} back={back} />

      <List>
        {associatedClasses.map((associatedClass) => {
          const associatedClassIsUnscheduled = isUnscheduled(associatedClass.schedule);
          return (
            <ListItem
              key={JSON.stringify(associatedClass.schedule)}
              button
              onClick={() => addSectionWithAssociatedClass(associatedClass)}
              onMouseEnter={() => associatedClassHover(associatedClass)}
              onMouseLeave={associatedClassHoverOff}
              disabled={associatedClassIsUnscheduled}
            >
              <ListItemText>
                <Typography variant="h6">
                  {associatedClass.type}
                </Typography>

                <Typography color={associatedClassIsUnscheduled ? 'error' : undefined}>
                  {getFormattedClassSchedule(associatedClass.schedule)}
                </Typography>
                <Typography>{associatedClass.schedule.location}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

AssociatedClassesSelection.propTypes = {
  currentCourseName: PropTypes.string.isRequired,
  currentSectionNumber: PropTypes.string.isRequired,
  associatedClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  back: PropTypes.func.isRequired,
  addSectionWithAssociatedClass: PropTypes.func.isRequired,
  associatedClassHover: PropTypes.func.isRequired,
  associatedClassHoverOff: PropTypes.func.isRequired,
};
