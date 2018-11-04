import { connect } from 'react-redux';
import toJS from 'util/to-js';
import CalendarView from './CalendarView';

export function sectionsSelector(state) {
  return state.getIn(['schedule', 'sections']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  sections: sectionsSelector(state),
});

export default connect(mapStateToProps)(toJS(CalendarView));
