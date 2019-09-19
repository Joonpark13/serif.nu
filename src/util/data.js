import termsData from 'data/terms.json';

/* eslint-disable import/prefer-default-export */
/* istanbul ignore next */
export const currentTerm = termsData.reduce((highestTerm, term) => {
  if (term.id > highestTerm.id) {
    return term;
  }
  return highestTerm;
});
/* eslint-enable import/prefer-default-export */
