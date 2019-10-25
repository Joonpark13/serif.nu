import { ListItem } from '@material-ui/core';
import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel, fetchCoursesRequest, selectSubjectInBrowse } from 'actions';
import { UnstyledSubjects, styles } from './Subjects';

describe('Subjects', () => {
  const subject = {
    id: 'EECS',
    schoolId: 'MEAS',
  };
  const getComponent = wrapperCreator(UnstyledSubjects, undefined, styles);

  beforeEach(() => {
    mockUseSelector([subject], false);
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    mockUseSelector([subject], true);
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showCourses gets called correctly', () => {
    const mockDispatch = mockUseDispatch();
    const wrapper = getComponent();

    wrapper.find(ListItem).first().simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith(fetchCoursesRequest(subject.schoolId, subject.id));
    expect(mockDispatch).toHaveBeenCalledWith(selectSubjectInBrowse(subject.id));
    expect(mockDispatch).toHaveBeenCalledWith(changeBrowseLevel('course'));
  });
});
