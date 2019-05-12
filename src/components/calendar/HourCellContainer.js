import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { sectionsSelector } from 'selectors';
import { meetsDuringDow, meetsDuringHour } from './calendar-helpers';
import HourCell from './HourCell';

function getMatchingClasses(classes, hour, dow) {
  return classes.filter(
    (sectionOrAssociatedClass) => {
      const eventObj = sectionOrAssociatedClass.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

function findMatchingClass(classes, hour, dow) {
  return classes.find(
    (sectionOrAssociatedClass) => {
      const eventObj = sectionOrAssociatedClass.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

export function sectionsForHourSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sections']);
  return getMatchingClasses(allSections, hour, dow);
}

export function associatedClassesForHourSelector(state, hour, dow) {
  const allAssociatedClasses = state.getIn(['schedule', 'associatedClasses']);
  return getMatchingClasses(allAssociatedClasses, hour, dow);
}

export function sectionPreviewSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sectionPreview']);
  return findMatchingClass(allSections, hour, dow);
}

export function associatedClassPreviewSelector(state, hour, dow) {
  const allAssociatedClasses = state.getIn(['schedule', 'associatedClassPreview']);
  return findMatchingClass(allAssociatedClasses, hour, dow);
}

export function allSectionPreviewsSelector(state) {
  return state.getIn(['schedule', 'sectionPreview']);
}

/* istanbul ignore next */
function mapStateToProps(state, ownProps) {
  const { hour, dow } = ownProps;
  return {
    sections: sectionsForHourSelector(state, hour, dow),
    associatedClasses: associatedClassesForHourSelector(state, hour, dow),
    sectionPreview: sectionPreviewSelector(state, hour, dow),
    associatedClassPreview: associatedClassPreviewSelector(state, hour, dow),
    allSections: sectionsSelector(state),
    allSectionPreviews: allSectionPreviewsSelector(state),
  };
}

export default connect(mapStateToProps)(toJS(HourCell));
