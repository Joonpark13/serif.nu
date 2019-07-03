import React from 'react';
import { shallow } from 'enzyme';
import { makeStyles } from '@material-ui/styles';
import NotFoundPage from './NotFoundPage';

jest.mock('@material-ui/styles');
jest.mock(makeStyles);

describe('FAQPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <NotFoundPage />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
