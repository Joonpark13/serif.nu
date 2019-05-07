import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSearchBox, styles } from './SearchBox';

describe('SearchBox', () => {
  function makeEventObject(value) {
    // This object gets passed to the onChange function of TextField
    return { target: { value } };
  }
  const testSearchInput = 'EECS';

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={() => {}}
      clearSearchResults={() => {}}
      updateSearchInput={() => {}}
      currentSearchInput={testSearchInput}
    />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders text typed into the search box', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={() => {}}
      clearSearchResults={() => {}}
      updateSearchInput={() => {}}
      currentSearchInput={testSearchInput}
    />);

    const eventObject = makeEventObject(testSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('doesn\'t call api unless it has been 300ms since last keystroke', (completed) => {
    const handleSearchInputMock = jest.fn();

    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={handleSearchInputMock}
      clearSearchResults={() => {}}
      updateSearchInput={() => {}}
      currentSearchInput={testSearchInput}
    />);

    expect(handleSearchInputMock).not.toBeCalled();

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
      updateSearchInput={() => {}}
      currentSearchInput={testSearchInput}
    />);

    const shortTestSearchInput = 'EE';
    const eventObject = makeEventObject(shortTestSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
