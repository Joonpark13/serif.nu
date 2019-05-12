import { wrapperCreator } from 'util/testing';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { UnstyledSchools, styles } from './Schools';

describe('Schools', () => {
  const testSchools = [{
    id: 'MUSIC',
    name: 'Bienen School of Music',
    term: '4720',
  }, {
    id: 'MEAS',
    name: 'McCormick School of Engineering and Applied Science',
    term: '4720',
  }];
  const defaultProps = {
    schools: testSchools,
    classes: {},
    isFetching: false,
    showSubjects: () => {},
  };

  const getComponent = wrapperCreator(UnstyledSchools, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showSubjects gets called correctly', () => {
    const showSubjectsMock = jest.fn();
    const wrapper = shallow(
      <UnstyledSchools {...defaultProps} showSubjects={showSubjectsMock} />,
    );

    wrapper.find(ListItem).first().simulate('click');

    expect(showSubjectsMock)
      .toHaveBeenCalledWith(testSchools[0].id);
  });
});
