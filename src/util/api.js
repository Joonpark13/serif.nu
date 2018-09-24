import prodMode from './env';

/* eslint-disable import/prefer-default-export */
const PROD_URL = 'https://sans-serif.herokuapp.com';
const DEV_URL = 'http://localhost:5000';
const api = prodMode ? /* istanbul ignore next */ PROD_URL : /* istanbul ignore next */ DEV_URL;

export { api as apiURL }; // For testing

export function searchURL(query) {
  return `${api}/search?term_id=4720&search_query=${query}`;
}
