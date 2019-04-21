import { wrapperCreator } from 'util/testing';
import { UnstyledSubjects, styles } from './Subjects';

describe('Subjects', () => {
  const defaultProps = {
    subjects: [{ id: 'EECS' }],
    isFetching: false,
  };
  const getComponent = wrapperCreator(UnstyledSubjects, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper).toMatchSnapshot();
  });
});
