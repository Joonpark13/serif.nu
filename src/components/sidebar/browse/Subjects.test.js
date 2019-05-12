import ListItem from '@material-ui/core/ListItem';
import { wrapperCreator } from 'util/testing';
import { UnstyledSubjects, styles } from './Subjects';

describe('Subjects', () => {
  const subject = {
    id: 'EECS',
    schoolId: 'MEAS',
  };
  const defaultProps = {
    subjects: [subject],
    isFetching: false,
    showCourses: () => {},
  };
  const getComponent = wrapperCreator(UnstyledSubjects, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showCourses gets called correctly', () => {
    const showCoursesMock = jest.fn();
    const wrapper = getComponent({ showCourses: showCoursesMock });

    wrapper.find(ListItem).first().simulate('click');

    expect(showCoursesMock).toHaveBeenCalledWith(subject.schoolId, subject.id);
  });
});
