import PropTypes from 'prop-types';

export const schoolPropType = {
  id: PropTypes.string.isRequired,
  termId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const subjectPropType = {
  id: PropTypes.string.isRequired,
  termId: PropTypes.string.isRequired,
  schoolId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const coursePropType = {
  id: PropTypes.string.isRequired,
  termId: PropTypes.string.isRequired,
  schoolId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const descriptionPropType = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const schedulePropType = {
  dow: PropTypes.arrayOf(PropTypes.string).isRequired,
  start: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
  }).isRequired,
  end: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
  }).isRequired,
  location: PropTypes.string.isRequired,
};

export const associatedClassPropType = {
  schedule: PropTypes.shape(schedulePropType).isRequired,
  type: PropTypes.string.isRequired,
};

export const sectionPropType = {
  id: PropTypes.string.isRequired,
  termId: PropTypes.string.isRequired,
  schoolId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sectionNumber: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.shape(descriptionPropType)).isRequired,
  instructors: PropTypes.arrayOf(PropTypes.string).isRequired,
  schedules: PropTypes.arrayOf(PropTypes.shape(schedulePropType)).isRequired,
  associatedClasses: PropTypes.arrayOf(PropTypes.shape(associatedClassPropType)),
};
