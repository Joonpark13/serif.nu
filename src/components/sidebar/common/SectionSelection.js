import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List } from '@material-ui/core';
import SectionResult from './SectionResult';
import SidebarHeader from '../SidebarHeader';

const useStyles = makeStyles({
  sectionsRoot: {
    padding: 16,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginTop: 5,
  },
});

export default function SectionSelection({
  currentCourseName,
  sections,
  scheduledSections,
  addSection,
  back,
}) {
  const classes = useStyles();
  return (
    <div className={classes.sectionsRoot}>
      <SidebarHeader title={currentCourseName} back={back} />
      <List>
        {sections.map((section) => {
          const sectionAlreadyAdded = !!scheduledSections && scheduledSections.some(
            scheduledSection => scheduledSection.id === section.id,
          );
          return (
            <SectionResult
              key={section.id}
              section={section}
              disabled={sectionAlreadyAdded}
              addSection={addSection}
            />
          );
        })
        }
      </List>
    </div>
  );
}

SectionSelection.propTypes = {
  currentCourseName: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  scheduledSections: PropTypes.arrayOf(PropTypes.object),
  addSection: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

SectionSelection.defaultProps = {
  scheduledSections: [],
};
