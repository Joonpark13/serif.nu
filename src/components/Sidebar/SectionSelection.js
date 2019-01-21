import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  sectionTitle: {
    fontWeight: 'bold',
  },
};

function SectionSelection({
  currentCourseName,
  sections,
  back,
  classes,
  addSection,
}) {
  return (
    <div className={classes.sectionsRoot}>
      <Typography variant="h5" className={classes.title}>
        {currentCourseName}
        <Button onClick={back}>Back</Button>
      </Typography>
      <Divider className={classes.divider} />
      <List>
        {sections.map(section => (
          <ListItem
            key={section.id}
            button
            onClick={() => addSection(section)}
          >
            <ListItemText>
              <Typography variant="h6" className={classes.sectionTitle}>{`Section ${section.section}`}</Typography>
              <Typography>{`${section.class_mtg_info[0].meet_t}`}</Typography>
              <Typography>{`${section.class_mtg_info[0].meet_l}`}</Typography>
              <Typography>
                {section.instructor.map((teacher, idx) => (
                  `${teacher}${idx !== section.instructor.length - 1 ? ', ' : ''}`))
                }
              </Typography>
            </ListItemText>
          </ListItem>
        ))
        }
      </List>
    </div>
  );
}

SectionSelection.propTypes = {
  currentCourseName: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  back: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  addSection: PropTypes.func.isRequired,
};

export { SectionSelection as UnstyledSectionSelection };
export default withStyles(styles)(SectionSelection);
