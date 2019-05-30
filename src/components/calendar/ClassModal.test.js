import Button from '@material-ui/core/Button';
import { wrapperCreator } from 'util/testing';
import { UnstyledClassModal, styles } from './ClassModal';

describe('ClassModal', () => {
  const section = {
    id: '198732',
    sectionNumber: 20,
    topic: 'Section topic...',
    schedules: [{
      location: 'somewhere',
      dow: ['Mo'],
      start: {
        hour: 10,
        minute: 30,
      },
      end: {
        hour: 12,
        minute: 0,
      },
    }],
    instructors: ['A prof'],
    color: '#58B947',
    descriptions: [{ name: '', value: '' }],
  };
  const defaultProps = {
    section,
    showDialog: true,
    toggleDialog: () => {},
    removeSection: () => {},
  };

  const getWrapper = wrapperCreator(UnstyledClassModal, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('closes the modal when clicked', () => {
    const removeSectionMock = jest.fn();
    const wrapper = getWrapper({ removeSection: removeSectionMock });
    wrapper.find(Button).first().simulate('click');

    expect(removeSectionMock).toHaveBeenCalledWith(section.id, section.color);
  });
});
