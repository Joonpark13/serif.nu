import { currentTerm } from 'util/data';
import getSearchResultDisplayString from 'util/get-search-result-display-string';

const MAX_SEARCH_RESULTS = 30;

/* eslint-disable import/prefer-default-export */
export function fetchSearchResults(searchInput) {
  const termId = currentTerm.id;
  return import(`data/${termId}/courses.json`)
    .then(
      data => data.default.filter(
        (course) => {
          const displayString = getSearchResultDisplayString(course);
          return displayString.toLowerCase().includes(searchInput.toLowerCase());
        },
      ).slice(0, MAX_SEARCH_RESULTS),
    );
}
/* eslint-enable import/prefer-default-export */
