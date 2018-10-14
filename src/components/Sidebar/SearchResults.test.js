import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSearchResults, styles } from './SearchResults';

describe('SearchResults', () => {
  const testResults = [{
    abbv: '629',
    name: 'Employment Law',
    school: 'LAW',
    score: 0.75,
    subject: 'BUSCOM',
    term: '4720',
    type: 'course',
  }, {
    abbv: '631',
    name: 'Entrepreneurship Law',
    school: 'LAW',
    score: 0.75,
    subject: 'BUSCOM',
    term: '4720',
    type: 'course',
  }];
  const classes = mockStyles(styles);

  it('renders correctly', () => {
    const wrapper = shallow(
      <UnstyledSearchResults searchResults={testResults} isFetching={false} classes={classes} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = shallow(
      <UnstyledSearchResults searchResults={testResults} isFetching classes={classes} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
