import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  sectionsSelector,
  sectionsForHourSelector,
  associatedClassesForHourSelector,
  sectionPreviewSelector,
  associatedClassPreviewSelector,
  allSectionPreviewsSelector,
} from 'selectors';
import useSelector from 'util/use-selector';
import { columnBorderStyle, cellMinHeight } from './calendar-constants';
import CalendarSection from './CalendarSection';
import AssociatedClass from './AssociatedClass';

const useStyles = makeStyles({
  calendarCell: {
    flexGrow: 1,
    borderBottom: columnBorderStyle,
    minHeight: cellMinHeight,
    position: 'relative',
  },
});

export default function HourCell({ hour, dow }) {
  const classes = useStyles();

  const sections = useSelector(state => sectionsForHourSelector(state, hour, dow));
  const associatedClasses = useSelector(
    state => associatedClassesForHourSelector(state, hour, dow),
  );
  const sectionPreview = useSelector(state => sectionPreviewSelector(state, hour, dow));
  const associatedClassPreview = useSelector(
    state => associatedClassPreviewSelector(state, hour, dow),
  );
  const allSections = useSelector(sectionsSelector);
  const allSectionPreviews = useSelector(allSectionPreviewsSelector);

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
      {sectionPreview && <CalendarSection section={sectionPreview} isPreview />}
      {associatedClassPreview && (
        <AssociatedClass
          isPreview
          associatedClass={associatedClassPreview}
          section={allSectionPreviews[0]}
        />
      )}
    </div>
  );
}

HourCell.propTypes = {
  hour: PropTypes.number.isRequired,
  dow: PropTypes.string.isRequired,
};
