import { fromJS } from 'immutable';
import splitBySchedules from './split-by-schedules';

describe('splitBySchedules', () => {
  it('splits sections with schedules into sections with events', () => {
    const section = fromJS({
      schedule: [{
        dow: ['Mo', 'Tu'],
        start: {
          hour: 10,
          minute: 0,
        },
        end: {
          hour: 10,
          minute: 50,
        },
      }, {
        dow: ['We'],
        start: {
          hour: 12,
          minute: 0,
        },
        end: {
          hour: 12,
          minute: 50,
        },
      }],
    });
    const result = splitBySchedules(section);
    expect(result.size).toBe(3);
    expect(
      result.map(splitSection => splitSection.getIn(['event', 'dow'])),
    ).toEqual(fromJS(['Mo', 'Tu', 'We']));
  });

  it('handles TBA data', () => {
    const section = fromJS({
      schedule: [{
        dow: 'TBA',
        start: {
          hour: 10,
          minute: 0,
        },
        end: {
          hour: 10,
          minute: 50,
        },
      }],
    });
    const result = splitBySchedules(section);
    expect(result.size).toBe(1);
    expect(
      result.map(splitSection => splitSection.getIn(['event', 'dow'])),
    ).toEqual(fromJS(['TBA']));
  });
});
