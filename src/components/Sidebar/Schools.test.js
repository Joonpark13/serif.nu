import { wrapperCreator } from 'util/testing';
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
    isFetching: false,
  };

  const getComponent = wrapperCreator(UnstyledSchools, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper).toMatchSnapshot();
  });
});
