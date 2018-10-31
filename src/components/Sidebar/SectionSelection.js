import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function SectionSelection({ currentCourseName, sections, back }) {
  return (
    <div>
      <Typography variant="headline">{currentCourseName}</Typography>
      <Button onClick={back}>Back</Button>
      {sections.map(section => <div key={section.id}>{`Section ${section.section}`}</div>)}
    </div>
  );
}

SectionSelection.propTypes = {
  currentCourseName: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  back: PropTypes.func.isRequired,
};

export default SectionSelection;
