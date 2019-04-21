import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedEventTime, getDurationInHours } from 'util/time';
import Section from 'components/common/Section';
import ClassModalContainer from 'components/Calendar/ClassModalContainer';

export const MAX_WIDTH_PERCENT = 97;

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ section }) => {
      const minute = section.event.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
    left: ({ section }) => `${MAX_WIDTH_PERCENT * section.columnWidth * section.column}%`,
    height: ({ section }) => {
      const durationInHours = getDurationInHours(section.event);
      const heightInPercent = Math.round(durationInHours * 100);
      return `${heightInPercent}%`;
    },
    width: ({ section }) => `${MAX_WIDTH_PERCENT * section.columnWidth}%`,
    backgroundColor: ({ section }) => section.color,
    overflow: 'hidden',
    cursor: 'pointer',
    zIndex: 1,
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

class CalendarSection extends Component {
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
    const leftHeaderContent = getFormattedEventTime(section.event);
    const rightHeaderContent = `${section.subjectId} ${section.courseId}`;
    return (
      <div>
        <Section
          onClickFn={this.toggleDialog}
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
      </div>
    );
  }
}

CalendarSection.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { CalendarSection as UnstyledCalendarSection };
export default withStyles(styles)(CalendarSection);
