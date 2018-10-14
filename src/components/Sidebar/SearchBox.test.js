import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSearchBox, styles } from './SearchBox';

describe('SearchBox', () => {
  function makeEventObject(value) {
    // This object gets passed to the onChange function of TextField
    return { target: { value } };
  }

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={() => {}}
      clearSearchResults={() => {}}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders text typed into the search box', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={() => {}}
      clearSearchResults={() => {}}
    />);

    const testSearchInput = 'EECS';
    const eventObject = makeEventObject(testSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);

    expect(wrapper).toMatchSnapshot();
  });

  it('doesn\'t call api unless it has been 300ms since last keystroke', (completed) => {
    const handleSearchInputMock = jest.fn();

    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={handleSearchInputMock}
      clearSearchResults={() => {}}
    />);

    expect(handleSearchInputMock).not.toBeCalled();

    const testSearchInput = 'EECS';
    const eventObject = makeEventObject(testSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);

    expect(handleSearchInputMock).not.toBeCalled();

    // Async test, would end after this statement but then the expect wouldn't
    // contribute to test results
    setTimeout(((jestCompleted) => {
      expect(handleSearchInputMock).toHaveBeenCalledWith(testSearchInput);
      jestCompleted();
    }).bind(null, completed), 300);
  });

  it('doesn\'t call api through handler if search string <= 2 chars long', () => {
    const handleSearchInputMock = jest.fn();
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={handleSearchInputMock}
      clearSearchResults={() => {}}
    />);

    const shortTestSearchInput = 'EE';
    const eventObject = makeEventObject(shortTestSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);
    expect(wrapper).toMatchSnapshot();
  });
});
