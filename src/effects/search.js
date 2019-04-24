import elasticlunr from 'elasticlunr';
import { db } from 'util/firebase';
import { CURRENT_TERM } from 'util/constants';

const MAX_SEARCH_RESULTS = 30;
const currentTermDoc = db.collection('terms').doc(CURRENT_TERM);

export function fetchSearchIndex() {
  return currentTermDoc.get().then(
    doc => elasticlunr.Index.load(JSON.parse(doc.data().searchIndex)),
  );
}

export function fetchSearchResults(searchIndex, searchInput) {
  const indexResults = searchIndex.search(searchInput).slice(0, MAX_SEARCH_RESULTS);
  const searchResultsPromises = indexResults.map(
    indexResult => currentTermDoc.collection('courses').doc(indexResult.ref).get().then(
      doc => Object.assign({}, doc.data(), { score: indexResult.score }),
    ),
  );
  return Promise.all(searchResultsPromises).then(searchResults => searchResults);
}
