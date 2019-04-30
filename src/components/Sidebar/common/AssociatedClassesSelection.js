import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { getFormattedClassSchedule } from 'util/time';
import SidebarHeader from '../SidebarHeader';

export const styles = {
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
};

function AssociatedClassesSelection({
  currentCourseName,
  currentSectionNumber,
  associatedClasses,
  back,
  addSectionWithAssociatedClass,
  associatedClassHover,
  associatedClassHoverOff,
  classes,
}) {
  return (
    <div className={classes.sectionsRoot}>
      <SidebarHeader title={`${currentCourseName}-${currentSectionNumber}`} back={back} />

      <List>
        {associatedClasses.map(associatedClass => (
          <ListItem
            key={JSON.stringify(associatedClass.schedule)}
            button
            onClick={() => addSectionWithAssociatedClass(associatedClass)}
            onMouseEnter={() => associatedClassHover(associatedClass)}
            onMouseLeave={associatedClassHoverOff}
          >
            <ListItemText>
              <Typography variant="h6">
                {associatedClass.type}
              </Typography>

              <Typography>
                {getFormattedClassSchedule(associatedClass.schedule)}
              </Typography>
              <Typography>{associatedClass.schedule.location}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

AssociatedClassesSelection.propTypes = {
  currentCourseName: PropTypes.string.isRequired,
  currentSectionNumber: PropTypes.string.isRequired,
  associatedClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  back: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  addSectionWithAssociatedClass: PropTypes.func.isRequired,
  associatedClassHover: PropTypes.func.isRequired,
  associatedClassHoverOff: PropTypes.func.isRequired,
};

export { AssociatedClassesSelection as UnstyledAssociatedClassesSelection };
export default withStyles(styles)(AssociatedClassesSelection);
