import React from 'react';
import { shallow } from 'enzyme';
import LegalPage from './LegalPage';

describe('LegalPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<LegalPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
