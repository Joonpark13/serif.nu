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

function HourCell({
  sections,
  associatedClasses,
  sectionPreview,
  associatedClassPreview,
  allSections,
  allSectionPreviews,
  classes,
}) {
  return (
    <div className={classes.calendarCell}>
      {sections.map(section => (
        <CalendarSection key={section.id} section={section} />
      ))}
      {associatedClasses.map(associatedClass => (
        <AssociatedClass
          key={JSON.stringify(associatedClass.event)}
          associatedClass={associatedClass}
          section={allSections.find(section => section.id === associatedClass.sectionId)}
        />
      ))}
      {sectionPreview && <CalendarSection section={sectionPreview} />}
      {associatedClassPreview && (
        <AssociatedClass
          associatedClass={associatedClassPreview}
          section={allSectionPreviews[0]}
        />
      )}
    </div>
  );
}

HourCell.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  associatedClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sectionPreview: PropTypes.objectOf(PropTypes.any),
  associatedClassPreview: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  allSections: PropTypes.arrayOf(PropTypes.object).isRequired,
  allSectionPreviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

HourCell.defaultProps = {
  sectionPreview: null,
  associatedClassPreview: null,
};

export { HourCell as UnstyledHourCell };

export default withStyles(styles)(HourCell);
