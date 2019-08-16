import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '@material-ui/core';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import Schools from './Schools';

describe('Schools', () => {
  const testSchools = [{
    id: 'MUSIC',
    name: 'Bienen School of Music',
    term: '4720',
  }, {
    id: 'MEAS',
    name: 'McCormick School of Engineering and Applied Science',
    term: '4720',
  }];

  beforeEach(() => {
    mockUseSelector(testSchools, false);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Schools />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    mockUseSelector(testSchools, true);
    const wrapper = shallow(<Schools />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showSubjects gets called correctly', () => {
    const mockDispatch = mockUseDispatch();
    const wrapper = shallow(<Schools />);

    wrapper.find(ListItem).first().simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith(fetchSubjectsRequest(testSchools[0].id));
    expect(mockDispatch).toHaveBeenCalledWith(selectSchoolInBrowse(testSchools[0].id));
    expect(mockDispatch).toHaveBeenCalledWith(changeBrowseLevel('subject'));
  });
});
