import { fromJS } from 'immutable';
import {
  selectedSectionNumberSelector,
  selectedSectionAssociatedClassesSelector,
} from './BrowseAssociatedClassesSelectionContainer';

describe('selectedSectionNumberSelector', () => {
  it('should select selected section number from browse state', () => {
    const sectionNumber = '20';
    const testState = fromJS({
      browse: {
        selected: {
          section: {
            sectionNumber,
          },
        },
      },
    });

    expect(selectedSectionNumberSelector(testState)).toEqual(sectionNumber);
  });
});

describe('selectedSectionAssociatedClassesSelector', () => {
  it("should select selected section's associated classes from browse state", () => {
    const associatedClasses = fromJS([]);
    const testState = fromJS({
      browse: {
        selected: {
          section: {
            associatedClasses,
          },
        },
      },
    });

    expect(selectedSectionAssociatedClassesSelector(testState)).toEqual(associatedClasses);
  });
});
