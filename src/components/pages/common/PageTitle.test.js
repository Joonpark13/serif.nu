import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './PageTitle';

describe('PageTitle', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<PageTitle {...defaultProps} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
