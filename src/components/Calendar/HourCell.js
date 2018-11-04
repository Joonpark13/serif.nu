import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { columnBorderStyle, cellMinHeight } from './calendar-constants';

export const styles = {
  calendarCell: {
    flexGrow: 1,
    borderBottom: columnBorderStyle,
    minHeight: cellMinHeight,
    position: 'relative',
  },
  card: {
    position: 'absolute',
  },
};

function HourCell({ sections, classes }) {
  return (
    <div className={classes.calendarCell}>
      {sections.map(section => (
        <Card key={section.id} className={classes.card}>
          <CardContent>
            {section.course}
          </CardContent>
        </Card>
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
