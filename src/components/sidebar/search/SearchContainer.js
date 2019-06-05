import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { searchViewSelector } from 'selectors';
import Search from './Search';


/* istanbul ignore next */
const mapStateToProps = state => ({
  view: searchViewSelector(state),
});

const SearchContainer = connect(mapStateToProps)(toJS(Search));

export default SearchContainer;
