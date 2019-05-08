import { fromJS } from 'immutable';
import prepClassesForCalendar from './prep-classes-for-calendar';
import * as assignConflictInfo from './assign-conflict-info';
import * as assignColor from './assign-color';

jest.mock('./assign-conflict-info');
jest.mock('./assign-color');

describe('prepClassesForCalendar', () => {
  beforeEach(() => {
    assignConflictInfo.default = jest.fn();
    assignConflictInfo.default.mockImplementation(mockSections => mockSections);

    assignColor.default = jest.fn();
    assignColor.default.mockImplementation((mockColor, mockSections) => mockSections);
  });

  it('correctly preps sections', () => {
    const sections = fromJS([{ id: '12345' }]);
    const color = 'some color';

    expect(prepClassesForCalendar(sections, color)).toEqual({ sections });
    expect(assignConflictInfo.default).toHaveBeenCalled();
    expect(assignColor.default).toHaveBeenCalled();
  });

  it('correctly preps sections and associated classes', () => {
    const sections = fromJS([{ id: '12345' }]);
    const associatedClasses = fromJS([{ sectionId: '12345' }]);
    const color = 'some color';

    expect(prepClassesForCalendar(sections, color, associatedClasses)).toEqual(
      { sections, associatedClasses },
    );
    expect(assignConflictInfo.default).toHaveBeenCalled();
    expect(assignColor.default).toHaveBeenCalledTimes(2);
  });
});
