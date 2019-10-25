import { ListItem } from '@material-ui/core';
import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel, fetchSectionsForBrowseRequest, selectCourseInBrowse } from 'actions';
import { UnstyledCourses, styles } from './Courses';

describe('Courses', () => {
  const course = {
    id: '101-0',
    name: 'Intro to Serif',
    schoolId: 'WCAS',
    subjectId: 'EECS',
  };
  const courses = [course];

  const getComponent = wrapperCreator(UnstyledCourses, undefined, styles);

  beforeEach(() => {
    mockUseSelector(courses, false);
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    mockUseSelector(courses, true);
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showSections gets called correctly', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = getComponent();

    wrapper.find(ListItem).first().simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchSectionsForBrowseRequest(course.schoolId, course.subjectId, course.id),
    );
    expect(dispatchMock).toHaveBeenCalledWith(selectCourseInBrowse(course.id));
    expect(dispatchMock).toHaveBeenCalledWith(changeBrowseLevel('section'));
  });
});
