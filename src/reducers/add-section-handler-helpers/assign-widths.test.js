import { fromJS } from 'immutable';
import assignWidths, { assignWidthsForSingleGroup } from './assign-widths';

describe('Assign widths', () => {
  const sections = fromJS([{
    column: 0,
    group: 0,
  }, {
    column: 0,
    group: 0,
  }, {
    column: 1,
    group: 0,
  }]);

  it('assignWidthsForSingleGroup', () => {
    expect(
      assignWidthsForSingleGroup(sections),
    ).toEqual(
      sections.map(section => section.set('columnWidth', 0.5)),
    );
  });

  it('assignWidths', () => {
    expect(assignWidths(sections)).toEqual(assignWidthsForSingleGroup(sections));
  });
});
