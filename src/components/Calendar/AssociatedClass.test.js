import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledAssociatedClass, styles, MAX_WIDTH_PERCENT } from './AssociatedClass';

jest.mock('util/time');

describe('dynamic styles', () => {
  const dow = 'Mo';
  const event = {
    dow,
    start: {
      hour: 10,
      minute: 30,
    },
    end: {
      hour: 12,
      minute: 0,
    },
  };
  const hour = 10;
  const color = 'some color';
  const section = { event, color, column: 0, columnWidth: 1 };

  it('correctly calculates section card placement', () => {
    expect(styles.paper.top({ hour, dow, section })).toBe('50%');
  });

  it('correctly calculates section card height', () => {
    timeUtils.getDurationInHours.mockReturnValue(1);
    expect(styles.paper.height({ section })).toBe('100%');
  });

  it('correctly grabs the section background color', () => {
    expect(styles.paper.backgroundColor({ section })).toBe(color);
  });

  it('correctly calculates left offset', () => {
    expect(styles.paper.left({ section })).toBe('0%');
  });

  it('correctly calculates width', () => {
    expect(styles.paper.width({ section })).toBe(`${MAX_WIDTH_PERCENT}%`);
  });
});

describe('AssociatedClass', () => {
  const defaultProps = {
    associatedClass: { type: 'DIS', name: 'Some discussion' },
    section: { subjectId: 'EECS', courseId: '111-0' },
  };
  const getWrapper = wrapperCreator(UnstyledAssociatedClass, defaultProps, styles);

  it('renders correctly', () => {
    timeUtils.getFormattedEventTime.mockReturnValue('left hand header content');
    const wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
