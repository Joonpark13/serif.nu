import elasticlunr from 'elasticlunr';
import { db } from 'util/firebase';

const MAX_SEARCH_RESULTS = 30;

export function fetchSearchIndex(currentTerm) {
  const currentTermDoc = db.collection('terms').doc(currentTerm);
  return currentTermDoc.get().then(
    doc => elasticlunr.Index.load(JSON.parse(doc.data().searchIndex)),
  );
}

export function fetchSearchResults(currentTerm, searchIndex, searchInput) {
  const currentTermDoc = db.collection('terms').doc(currentTerm);
  const indexResults = searchIndex.search(searchInput).slice(0, MAX_SEARCH_RESULTS);
  const searchResultsPromises = indexResults.map(
    indexResult => currentTermDoc.collection('courses').doc(indexResult.ref).get().then(
      doc => Object.assign({}, doc.data(), { score: indexResult.score }),
    ),
  );
  return Promise.all(searchResultsPromises).then(searchResults => searchResults);
}
