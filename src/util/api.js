/* eslint-disable import/prefer-default-export */
export function searchURL(query) {
  return `${process.env.API_URL}/search?term_id=4720&search_query=${query}`;
}
