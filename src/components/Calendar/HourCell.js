import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { columnBorderStyle, cellMinHeight } from './calendar-constants';
import CalendarSection from './CalendarSection';
import AssociatedClass from './AssociatedClass';

export const styles = {
  calendarCell: {
    flexGrow: 1,
    borderBottom: columnBorderStyle,
    minHeight: cellMinHeight,
    position: 'relative',
  },
};

function HourCell({ sections, associatedClasses, allSections, classes }) {
  return (
    <div className={classes.calendarCell}>
      {sections.map(section => (
        <CalendarSection key={section.id} section={section} />
      ))}
      {associatedClasses.map(associatedClass => (
        <AssociatedClass
          key={JSON.stringify(associatedClass.event)}
          associatedClass={associatedClass}
          section={
            allSections.find(
              section => section.id === associatedClass.sectionId,
            )
          }
        />
      ))}
    </div>
  );
}

HourCell.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  associatedClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  allSections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { HourCell as UnstyledHourCell };

export default withStyles(styles)(HourCell);
