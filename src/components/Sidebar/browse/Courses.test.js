import { wrapperCreator } from 'util/testing';
import { UnstyledCourses, styles } from './Courses';

describe('Courses', () => {
  const courses = [{ id: '101-0', name: 'Intro to Serif' }];
  const defaultProps = {
    courses,
    isFetching: false,
    showSubjects: () => {},
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
});
