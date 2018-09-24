import { apiURL, searchURL } from './api';

describe('searchURL', () => {
  it('should return search url', () => {
    const query = 'EECS';
    expect(searchURL(query)).toBe(`${apiURL}/search?term_id=4720&search_query=${query}`);
  });
});
