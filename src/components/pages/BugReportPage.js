import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { pageContainer } from './common/styles';

export const styles = {
  pageContainer,
};

function BugReportPage({ classes }) {
  return <div className={classes.pageContainer} />;
}

BugReportPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { BugReportPage as UnstyledBugReportPage };
export default withStyles(styles)(BugReportPage);
