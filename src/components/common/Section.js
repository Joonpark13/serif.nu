import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Section({ classes, leftHeaderContent, rightHeaderContent, sectionName }) {
  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="caption" className={classes.text}>
            {leftHeaderContent}
          </Typography>

          <Typography variant="caption" className={classes.text}>
            {rightHeaderContent}
          </Typography>
        </div>

        <Typography variant="subtitle2" className={`${classes.text} ${classes.name}`} noWrap>
          {sectionName}
        </Typography>
      </div>
    </Paper>
  );
}

Section.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
    container: PropTypes.string,
    header: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  leftHeaderContent: PropTypes.string,
  rightHeaderContent: PropTypes.string,
  sectionName: PropTypes.string,
};

Section.defaultProps = {
  leftHeaderContent: '',
  rightHeaderContent: '',
  sectionName: '',
};

export default Section;
