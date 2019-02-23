import { fromJS } from 'immutable';
import labelColumns, { labelColumnsForSingleGroup } from './label-columns';

describe('Label columns', () => {
  const sections = fromJS([
    {
      id: '1',
      event: {
        start: {
          hour: 10,
          minute: 0,
        },
        end: {
          hour: 10,
          minute: 50,
        },
      },
      group: 0,
    },
    {
      id: '2',
      event: {
        start: {
          hour: 11,
          minute: 0,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      },
      group: 0,
    },
    {
      id: '3',
      event: {
        start: {
          hour: 10,
          minute: 0,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      },
      group: 0,
    },
    {
      id: '4',
      event: {
        start: {
          hour: 10,
          minute: 0,
        },
        end: {
          hour: 10,
          minute: 50,
        },
      },
      group: 0,
    },
  ]);

  it('labelColumnsForSingleGroup labels a single section correctly', () => {
    const singleSection = fromJS([{ id: '1' }]);
    expect(
      labelColumnsForSingleGroup(singleSection),
    ).toEqual(singleSection.setIn([0, 'column'], 0));
  });

  it('labelColumnsForSingleGroup labels conflicting sections with correct columns', () => {
    const result = labelColumnsForSingleGroup(sections);

    const section1 = result.find(section => section.get('id') === '1');
    const section2 = result.find(section => section.get('id') === '2');
    const section3 = result.find(section => section.get('id') === '3');
    const section4 = result.find(section => section.get('id') === '4');
    expect(section1.get('column') === section2.get('column')).toBe(true);
    expect(section3.get('column')).not.toBe(section1.get('column'));
    expect(section4.get('column')).not.toBe(section1.get('column'));
    expect(section4.get('column')).not.toBe(section3.get('column'));
  });

  it('labelColumns', () => {
    const result = labelColumns(sections);
    expect(result).toEqual(labelColumnsForSingleGroup(sections));
  });
});
