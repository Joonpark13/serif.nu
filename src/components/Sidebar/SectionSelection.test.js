import ListItem from '@material-ui/core/ListItem';
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
    addSection: () => {},
    classes,
  };
  const getComponent = wrapperCreator(UnstyledSectionSelection, defaultProps);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('calls addSection when section is clicked', () => {
    const addSectionMock = jest.fn();
    const wrapper = getComponent({ addSection: addSectionMock });

    wrapper.find(ListItem).first().simulate('click');

    expect(addSectionMock).toHaveBeenCalledWith(defaultProps.sections[0]);
  });
});
