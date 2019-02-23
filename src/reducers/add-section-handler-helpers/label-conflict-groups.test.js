import { fromJS } from 'immutable';
import labelConflictGroups from './label-conflict-groups';

describe('labelConflictGroups', () => {
  it('labels conflict groups correctly', () => {
    const sections = fromJS([
      {
        id: '1',
        event: {
          start: {
            hour: 10,
            minute: 0,
          },
          end: {
            hour: 12,
            minute: 50,
          },
        },
      },
      {
        id: '2',
        event: {
          start: {
            hour: 10,
            minute: 0,
          },
          end: {
            hour: 10,
            minute: 30,
          },
        },
      },
      {
        id: '3',
        event: {
          start: {
            hour: 12,
            minute: 0,
          },
          end: {
            hour: 12,
            minute: 50,
          },
        },
      },
      {
        id: '4',
        event: {
          start: {
            hour: 13,
            minute: 0,
          },
          end: {
            hour: 13,
            minute: 50,
          },
        },
      },
    ]);

    const result = labelConflictGroups(sections);

    const firstGroup = result.filter(section => ['1', '2', '3'].includes(section.get('id')));
    expect(
      firstGroup.every(section => section.get('group') === firstGroup.getIn([0, 'group'])),
    ).toBe(true);
    expect(result.find(section => section.get('id') === '4')).not.toBe(firstGroup.getIn([0, 'group']));
  });

  it('handles base case when sections conflict', () => {
    const sections = fromJS([
      {
        id: '1',
        event: {
          start: {
            hour: 10,
            minute: 0,
          },
          end: {
            hour: 12,
            minute: 50,
          },
        },
      },
      {
        id: '2',
        event: {
          start: {
            hour: 10,
            minute: 0,
          },
          end: {
            hour: 10,
            minute: 30,
          },
        },
      },
    ]);
    expect(
      labelConflictGroups(sections),
    ).toEqual(
      sections.map(section => section.set('group', 0)),
    );
  });
});
