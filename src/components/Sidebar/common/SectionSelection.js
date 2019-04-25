import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SectionResult from './SectionResult';
import SidebarHeader from '../SidebarHeader';

export const styles = {
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
};

function SectionSelection({
  currentCourseName,
  sections,
  scheduledSections,
  addSection,
  back,
  classes,
}) {
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

SectionSelection.defaultProps = {
  scheduledSections: [],
};

export { SectionSelection as UnstyledSectionSelection };
export default withStyles(styles)(SectionSelection);
