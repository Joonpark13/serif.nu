import { connect } from 'react-redux';
import Browse from './Browse';

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentBrowseLevel: state.getIn(['browse', 'currentBrowseLevel']),
});

export default connect(mapStateToProps)(Browse);
