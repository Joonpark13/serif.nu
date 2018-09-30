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
    const handleSearchInputMock = jest.fn();
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSearchBox
      classes={classes}
      handleSearchInput={handleSearchInputMock}
      clearSearchResults={() => {}}
    />);

    const testSearchInput = 'EECS';
    const eventObject = makeEventObject(testSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);
    expect(handleSearchInputMock).toHaveBeenCalledWith(testSearchInput);
    expect(wrapper).toMatchSnapshot();
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
