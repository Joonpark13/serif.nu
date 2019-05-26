import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import Section from 'components/common/Section';
import ClassModalContainer from 'components/calendar/ClassModalContainer';

export const styles = {
  paper: {
    backgroundColor: ({ section }) => section.color,
    overflow: 'hidden',
    margin: '10px',
    cursor: 'pointer',
  },
  container: {
    margin: '3px',
  },
  text: {
    color: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

class CartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState(state => ({ showDialog: !state.showDialog }));
  }

  render() {
    const { classes, section } = this.props;
    const { showDialog } = this.state;

    let leftHeaderContent;
    if (section.schedules.length > 1) {
      leftHeaderContent = section.schedules
        .map(schedule => getFormattedClassSchedule(schedule))
        .reduce(
          (resultStr, formattedStr) => `${resultStr}, ${formattedStr}`,
        );
    } else {
      leftHeaderContent = getFormattedClassSchedule(section.schedules[0]);
    }
    const rightHeaderContent = `${section.subjectId} ${section.courseId}`;

    return (
      <React.Fragment>
        <Section
          onClick={this.toggleDialog}
          classes={classes}
          leftHeaderContent={leftHeaderContent}
          rightHeaderContent={rightHeaderContent}
          sectionName={section.name}
        />
        <ClassModalContainer
          section={section}
          showDialog={showDialog}
          toggleDialog={this.toggleDialog}
        />
      </React.Fragment>
    );
  }
}

CartSection.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { CartSection as UnstyledCartSection };
export default withStyles(styles)(CartSection);
