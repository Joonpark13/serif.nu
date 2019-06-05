import { Button, Typography } from '@material-ui/core';
import { wrapperCreator } from 'util/testing';
import { UnstyledClassModal, styles } from './ClassModal';

describe('ClassModal', () => {
  const section = {
    id: '198732',
    name: 'Introduction to Something',
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

  it('renders correctly for associated class', () => {
    const associatedClass = {
      type: 'LAB',
      schedule: {
        dow: ['Mo'],
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 12,
          minute: 0,
        },
      },
    };
    const wrapper = getWrapper({ associatedClass });

    expect(wrapper.find(Typography).at(0).prop('children'))
      .toEqual([`${associatedClass.type} - `, section.name]);
    expect(wrapper.find('div').at(1).get(0)).toMatchSnapshot();
  });

  it('closes the modal when clicked', () => {
    const removeSectionMock = jest.fn();
    const wrapper = getWrapper({ removeSection: removeSectionMock });
    wrapper.find(Button).first().simulate('click');

    expect(removeSectionMock).toHaveBeenCalledWith(section.id, section.color);
  });
});
