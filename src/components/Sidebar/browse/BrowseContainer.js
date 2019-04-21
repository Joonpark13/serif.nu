import { connect } from 'react-redux';
import { currentBrowseLevelSelector } from 'selectors';
import Browse from './Browse';

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentBrowseLevel: currentBrowseLevelSelector(state),
  };
}

export default connect(mapStateToProps)(Browse);
