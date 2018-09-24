import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  function makeEventObject(value) {
    // This object gets passed to the onChange function of TextField
    return { target: { value } };
  }

  it('renders correctly', () => {
    const wrapper = shallow(<SearchBox handleSearchInput={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders text typed into the search box', () => {
    const handleSearchInputMock = jest.fn();
    const wrapper = shallow(<SearchBox handleSearchInput={handleSearchInputMock} />);

    const testSearchInput = 'EECS';
    const eventObject = makeEventObject(testSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);
    expect(handleSearchInputMock).toHaveBeenCalledWith(testSearchInput);
    expect(wrapper).toMatchSnapshot();
  });

  it('doesn\'t call api through handler if search string <= 2 chars long', () => {
    const handleSearchInputMock = jest.fn();
    const wrapper = shallow(<SearchBox handleSearchInput={handleSearchInputMock} />);

    const shortTestSearchInput = 'EE';
    const eventObject = makeEventObject(shortTestSearchInput);
    wrapper.find('TextField').simulate('change', eventObject);
    expect(wrapper).toMatchSnapshot();
  });
});
