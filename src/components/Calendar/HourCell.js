import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { columnBorderStyle, cellMinHeight } from './calendar-constants';
import Section from './Section';

export const styles = {
  calendarCell: {
    flexGrow: 1,
    borderBottom: columnBorderStyle,
    minHeight: cellMinHeight,
    position: 'relative',
  },
};

function HourCell({ sections, classes }) {
  return (
    <div className={classes.calendarCell}>
      {sections.map(section => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}

HourCell.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { HourCell as UnstyledHourCell };

export default withStyles(styles)(HourCell);
