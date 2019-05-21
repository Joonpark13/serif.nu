import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { pageContainer } from './common/styles';
import PageTitle from './common/PageTitle';

export const styles = {
  pageContainer,
};

function FAQPage({ classes }) {
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Frequently Asked Questions" />
    </div>
  );
}

FAQPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { FAQPage as UnstyledFAQPage };
export default withStyles(styles)(FAQPage);
