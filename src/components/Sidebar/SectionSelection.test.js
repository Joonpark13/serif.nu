import { mockStyles, wrapperCreator } from 'util/testing';
import { UnstyledSectionSelection, styles } from './SectionSelection';

describe('SectionSelection', () => {
  const classes = mockStyles(styles);

  const defaultProps = {
    currentCourseName: 'EECS 101-0',
    sections: [{
      id: '1',
      section: 20,
      class_mtg_info: [{
        meet_t: 'MoWeFri 11:00AM - 11:50AM',
        meet_l: 'Technological Institute AUD',
      }],
      instructor: ['Jason Hartline'],
    }, {
      id: '2',
      section: 21,
      class_mtg_info: [{
        meet_t: 'TuTh 11:00AM - 11:50AM',
        meet_l: 'Technological Institute AUD',
      }],
      instructor: ['Ian Horswill', 'Vincent St-Amour'],
    }],
    back: () => {},
    classes,
  };
  const getComponent = wrapperCreator(UnstyledSectionSelection, defaultProps);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });
});
