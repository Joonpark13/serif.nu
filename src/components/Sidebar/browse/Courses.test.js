import ListItem from '@material-ui/core/ListItem';
import { wrapperCreator } from 'util/testing';
import { UnstyledCourses, styles } from './Courses';

describe('Courses', () => {
  const course = {
    id: '101-0',
    name: 'Intro to Serif',
    schoolId: 'WCAS',
    subjectId: 'EECS',
  };
  const courses = [course];
  const defaultProps = {
    courses,
    isFetching: false,
    showSections: () => {},
  };

  const getComponent = wrapperCreator(UnstyledCourses, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('showSections gets called correctly', () => {
    const showSectionsMock = jest.fn();
    const wrapper = getComponent({ showSections: showSectionsMock });

    wrapper.find(ListItem).first().simulate('click');

    expect(showSectionsMock).toHaveBeenCalledWith(course.schoolId, course.subjectId, course.id);
  });
});
