import React from 'react';
import { shallow } from 'enzyme';
import { Typography, Button } from '@material-ui/core';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel } from 'actions';
import BrowseHeader from './BrowseHeader';

describe('BrowseHeader', () => {
  beforeEach(() => {
    mockUseSelector('school', '', '');
  });

  it('renders correctly', () => {
    const wrapper = shallow(<BrowseHeader />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly for subject browse level', () => {
    const selectedSchoolId = '1234';
    mockUseSelector('subject', selectedSchoolId, '');

    const wrapper = shallow(<BrowseHeader />);

    expect(wrapper.find(Typography).prop('children')).toBe(selectedSchoolId);
  });

  it('renders correctly for course browse level', () => {
    const selectedSubjectId = 'MEAS';
    mockUseSelector('course', '', selectedSubjectId);
    const wrapper = shallow(<BrowseHeader />);

    expect(wrapper.find(Typography).prop('children')).toBe(selectedSubjectId);
  });

  it('goes back a level to schools from subjects', () => {
    mockUseSelector('subject', 'WCAS', '');
    const dispatchMock = mockUseDispatch();

    const wrapper = shallow(<BrowseHeader />);

    wrapper.find(Button).simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(changeBrowseLevel('school'));
  });

  it('goes back a level to subjects from courses', () => {
    mockUseSelector('course', 'EECS', '');
    const dispatchMock = mockUseDispatch();

    const wrapper = shallow(<BrowseHeader />);

    wrapper.find(Button).simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(changeBrowseLevel('subject'));
  });
});
