import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedEventTime, getDurationInHours } from 'util/time';
import Section from 'components/common/Section';
import ClassModal from './ClassModal';

export const MAX_WIDTH_PERCENT = 97;

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ associatedClass }) => {
      const minute = associatedClass.event.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
    left: ({ associatedClass }) => `${MAX_WIDTH_PERCENT * associatedClass.columnWidth * associatedClass.column}%`,
    height: ({ associatedClass }) => {
      const durationInHours = getDurationInHours(associatedClass.event);
      const heightInPercent = Math.round(durationInHours * 100);
      return `${heightInPercent}%`;
    },
    width: ({ associatedClass }) => `${MAX_WIDTH_PERCENT * associatedClass.columnWidth}%`,
    backgroundColor: ({ associatedClass }) => associatedClass.color,
    cursor: 'pointer',
    overflow: 'hidden',
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

class AssociatedClass extends Component {
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
    const { classes, associatedClass, section } = this.props;
    const { showDialog } = this.state;

    const leftHeaderContent = getFormattedEventTime(associatedClass.event);
    const rightHeaderContent = `${section.subjectId} ${section.courseId}`;
    const associatedClassTitle = `${associatedClass.type} - ${section.name}`;

    return (
      <Fragment>
        <Section
          onClick={this.toggleDialog}
          classes={classes}
          leftHeaderContent={leftHeaderContent}
          rightHeaderContent={rightHeaderContent}
          sectionName={associatedClassTitle}
        />
        <ClassModal
          section={section}
          associatedClass={associatedClass}
          showDialog={showDialog}
          toggleDialog={this.toggleDialog}
        />
      </Fragment>
    );
  }
}

AssociatedClass.propTypes = {
  associatedClass: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { AssociatedClass as UnstyledAssociatedClass };
export default withStyles(styles)(AssociatedClass);
