import { fromJS } from 'immutable';
import assignConflictInfo from './assign-conflict-info';
import * as labelConflictGroups from './label-conflict-groups';
import * as labelColumns from './label-columns';
import * as assignWidths from './assign-widths';

describe('Assign conflict info', () => {
  labelConflictGroups.default = jest.fn(sections => sections);
  labelColumns.default = jest.fn(sections => sections);
  assignWidths.default = jest.fn(sections => sections);

  it('calls the right helpers', () => {
    const sections = fromJS([{}]);
    assignConflictInfo(sections);

    expect(labelConflictGroups.default).toBeCalledWith(sections);
    expect(labelColumns.default).toBeCalledWith(sections);
    expect(assignWidths.default).toBeCalledWith(sections);
  });
});
