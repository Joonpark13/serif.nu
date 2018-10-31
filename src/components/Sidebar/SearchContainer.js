import { connect } from 'react-redux';
import toJS from 'util/to-js';
import Search from './Search';

export function searchViewSelector(state) {
  return state.getIn(['search', 'view']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  view: searchViewSelector(state),
});

const SearchContainer = connect(mapStateToProps)(toJS(Search));

export default SearchContainer;
