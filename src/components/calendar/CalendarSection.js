import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedEventTime, getDurationInHours } from 'util/time';
import Section from 'components/common/Section';
import ClassModal from './ClassModal';

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
    cursor: ({ isPreview }) => isPreview ? 'default' : 'pointer',
    zIndex: ({ isPreview }) => isPreview ? 2 : 1,
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
    this.handleClick = this.handleClick.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  handleClick() {
    const { isPreview } = this.props;
    if (!isPreview) {
      this.toggleDialog();
    }
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
          onClick={this.handleClick}
          classes={classes}
          leftHeaderContent={leftHeaderContent}
          rightHeaderContent={rightHeaderContent}
          sectionName={section.name}
        />
        <ClassModal
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
  isPreview: PropTypes.bool,
};

CalendarSection.defaultProps = {
  isPreview: false,
};

export { CalendarSection as UnstyledCalendarSection };
export default withStyles(styles)(CalendarSection);
