import { fromJS } from 'immutable';
import { sectionsSelector } from './BrowseSectionSelectionContainer';

describe('sectionsSelector', () => {
  it('should select selected section number from browse state', () => {
    const sections = fromJS([]);
    const testState = fromJS({
      browse: {
        sections,
      },
    });

    expect(sectionsSelector(testState)).toEqual(sections);
  });
});
