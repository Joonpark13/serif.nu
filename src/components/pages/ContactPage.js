import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { northwesternPurple10 } from 'util/colors';
import { pageContainer } from './common/styles';

export const styles = {
  pageTitle: {
    margin: 20,
    padding: 5,
    borderBottom: `2px solid ${northwesternPurple10}`,
  },
  pageContainer,
};

function ContactPage({ classes }) {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.pageTitle}>
        <Typography variant="h3" color="primary">
          Contact Us
        </Typography>
      </div>
    </div>
  );
}

ContactPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { ContactPage as UnstyledContactPage };
export default withStyles(styles)(ContactPage);
