import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { Button } from '@material-ui/core';
import { removeAllClasses } from 'actions';
import Cart from './Cart';

describe('Cart', () => {
  beforeEach(() => {
    mockUseSelector([]);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly with one section', () => {
    mockUseSelector([{ id: '12345' }]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly with multiple sections with the same id', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('closes removes all classes when clicked', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);
    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<Cart />);
    wrapper.find(Button).simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(removeAllClasses());
  });
});
