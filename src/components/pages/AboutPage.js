import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import heroImage from 'images/hero-image.jpg';

const heroHeight = 600;

export const styles = {
  hero: {
    backgroundImage: `url(${heroImage})`,
    minHeight: heroHeight,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: heroHeight,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingTop: '280px',
  },
  heroSubtitle: {
    color: 'inherit',
    paddingTop: '20px',
  },
};

function AboutPage({ classes }) {
  return (
    <div>
      <div className={classes.hero} />
      <div className={classes.heroText}>
        <Typography variant="h3" color="inherit">Simple. Fast. Visual.</Typography>
        <Typography variant="h5" className={classes.heroSubtitle}>Course planning for Northwestern University.</Typography>
      </div>
    </div>
  );
}

AboutPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { AboutPage as UnstyledAboutPage };
export default withStyles(styles)(AboutPage);
