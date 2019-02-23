import { connect } from 'react-redux';
import toJS from 'util/to-js';
import HourCell from './HourCell';
import { meetsDuringDow, meetsDuringHour } from './calendar-helpers';

export function sectionsForHourSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sections']);
  return allSections.filter(
    (section) => {
      const eventObj = section.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

/* istanbul ignore next */
function mapStateToProps(state, ownProps) {
  const { hour, dow } = ownProps;
  return {
    sections: sectionsForHourSelector(state, hour, dow),
  };
}

export default connect(mapStateToProps)(toJS(HourCell));
