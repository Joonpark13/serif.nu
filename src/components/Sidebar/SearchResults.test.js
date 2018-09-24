import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SearchResults />);

    expect(wrapper).toMatchSnapshot();
  });
});
