import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '@material-ui/core';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel, fetchCoursesRequest, selectSubjectInBrowse } from 'actions';
import Subjects from './Subjects';

describe('Subjects', () => {
  const subject = {
    id: 'EECS',
    schoolId: 'MEAS',
  };

  beforeEach(() => {
    mockUseSelector([subject], false);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Subjects />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    mockUseSelector([subject], true);
    const wrapper = shallow(<Subjects />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showCourses gets called correctly', () => {
    const mockDispatch = mockUseDispatch();
    const wrapper = shallow(<Subjects />);

    wrapper.find(ListItem).first().simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith(fetchCoursesRequest(subject.schoolId, subject.id));
    expect(mockDispatch).toHaveBeenCalledWith(selectSubjectInBrowse(subject.id));
    expect(mockDispatch).toHaveBeenCalledWith(changeBrowseLevel('course'));
  });
});
