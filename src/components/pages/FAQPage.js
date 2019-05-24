import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { pageContainer, pageBody } from './common/styles';
import PageTitle from './common/PageTitle';

export const styles = {
  pageContainer,
  pageBody,
  question: {
    marginBottom: 30,
  },
};

function FAQPage({ classes }) {
  return (
    <div className={classes.pageContainer}>
      <PageTitle title="Frequently Asked Questions" />

      <div className={classes.pageBody}>
        <div className={classes.question}>
          <Typography variant="h5" gutterBottom>
            Is the site still maintained? Can I expect updates?
          </Typography>
          <Typography variant="body1">
            Yes, and yes! Serif.nu is actively being updated to include new features to better serve
            the Northwestern student experience. You can expect course data to be updated regularly
            during registration season. If you&apos;re interested in the technical details of what
            we&apos;re working on, check out our
            {' '}
            <a href="https://github.com/Joonpark13/serif.nu">Github</a>
            .
          </Typography>
        </div>

        <div className={classes.question}>
          <Typography variant="h5" gutterBottom>
            I found a bug. What should I do?
          </Typography>
          <Typography variant="body1">
            Please be aware that Serif.nu cannot guarantee the correctness of the data that we
            display. We simply use the course data that is available to us - we have no control
            over whether every single class time matches up with what is on CAESAR. Submissions
            such as &quot;Why don&apos;t I see SESP courses on Serif.nu?&quot; or &quot;The bio
            lab times are different than what&apos;s on CAESAR&quot; will be ignored.
          </Typography>
          <Typography variant="body1">
            If you find bugs with the functionality of the site itself, please report it using
            {' '}
            <Link to="/bugs">this form</Link>
            .
          </Typography>
        </div>

        <div className={classes.question}>
          <Typography variant="h5" gutterBottom>
            Is there a mobile version?
          </Typography>
          <Typography variant="body1">
            Currently, Serif.nu is best viewed on a laptop or desktop screen. However, enhancements
            for mobile screens are in the works!
          </Typography>
        </div>

        <div className={classes.question}>
          <Typography variant="h5" gutterBottom>
            I&apos;m a developer. I&apos;d like to contribute.
          </Typography>
          <Typography variant="body1">
            Wonderful!
            {' '}
            <Link to="/contact">Send us a message</Link>
            {' '}
            and check out our
            {' '}
            <a href="https://github.com/Joonpark13/serif.nu">Github</a>
            .
          </Typography>
        </div>

        <div className={classes.question}>
          <Typography variant="h5" gutterBottom>
            I&apos;d like to adapt Serif.nu for scheduling courses at another university. How can I
            do that?
          </Typography>
          <Typography variant="body1">
            Please
            {' '}
            <Link to="/contact">reach out to us</Link>
            .
          </Typography>
        </div>
      </div>
    </div>
  );
}

FAQPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { FAQPage as UnstyledFAQPage };
export default withStyles(styles)(FAQPage);
