import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { sectionsSelector } from 'selectors';
import { meetsDuringDow, meetsDuringHour } from './calendar-helpers';
import HourCell from './HourCell';

export function sectionsForHourSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sections']);
  return allSections.filter(
    (section) => {
      const eventObj = section.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

export function associatedClassesForHourSelector(state, hour, dow) {
  const allAssociatedClasses = state.getIn(['schedule', 'associatedClasses']);
  return allAssociatedClasses.filter(
    (associatedClass) => {
      const eventObj = associatedClass.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

/* istanbul ignore next */
function mapStateToProps(state, ownProps) {
  const { hour, dow } = ownProps;
  return {
    sections: sectionsForHourSelector(state, hour, dow),
    associatedClasses: associatedClassesForHourSelector(state, hour, dow),
    allSections: sectionsSelector(state),
  };
}

export default connect(mapStateToProps)(toJS(HourCell));
