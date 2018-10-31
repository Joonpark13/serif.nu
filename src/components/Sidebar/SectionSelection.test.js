import { wrapperCreator } from 'util/testing';
import SectionSelection from './SectionSelection';

describe('SectionSelection', () => {
  const defaultProps = {
    currentCourseName: 'EECS 101-0',
    sections: [{
      id: '1',
      section: 20,
    }, {
      id: '2',
      section: 21,
    }],
    back: () => {},
  };
  const getComponent = wrapperCreator(SectionSelection, defaultProps);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });
});
