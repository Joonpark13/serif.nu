import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { pageContainer } from './common/styles';
import PageTitle from './common/PageTitle';

export const styles = {
  pageContainer,
};

function ContactPage({ classes }) {
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Contact Us" />
    </div>
  );
}

ContactPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { ContactPage as UnstyledContactPage };
export default withStyles(styles)(ContactPage);
