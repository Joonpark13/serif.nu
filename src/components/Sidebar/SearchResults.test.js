import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  it('renders correctly', () => {
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
    const wrapper = shallow(<SearchResults searchResults={testResults} />);

    expect(wrapper).toMatchSnapshot();
  });
});
