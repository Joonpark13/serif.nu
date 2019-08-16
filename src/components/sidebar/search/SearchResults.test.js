import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '@material-ui/core';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  const testResults = [{
    id: '629',
    name: 'Employment Law',
    schoolId: 'LAW',
    subjectId: 'BUSCOM',
    termId: '4720',
  }, {
    id: '631',
    name: 'Entrepreneurship Law',
    schoolId: 'LAW',
    subjectId: 'BUSCOM',
    termId: '4720',
  }];
  const testSearchInput = 'EECS';

  beforeEach(() => {
    mockUseSelector(testResults, false, testSearchInput);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<SearchResults />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    mockUseSelector(testResults, true, testSearchInput);
    const wrapper = shallow(<SearchResults />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it("renders 'keep typing' correctly", () => {
    mockUseSelector(testResults, false, 'EE');
    const wrapper = shallow(<SearchResults />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it("renders 'no results' correctly", () => {
    mockUseSelector([], false, 'ABCD');
    const wrapper = shallow(<SearchResults />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('handleCourseClick gets called correctly', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<SearchResults />);

    wrapper.find(ListItem).first().simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchSectionsForSearchRequest(
        testResults[0].schoolId,
        testResults[0].subjectId,
        testResults[0].id,
      ),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      setCurrentCourseName(`${testResults[0].subjectId} ${testResults[0].id}`),
    );
  });
});
