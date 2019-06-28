import React, { Fragment } from 'react';
import { searchViewSelector } from 'selectors';
import useSelector from 'util/use-selector';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import SearchSectionSelectionContainer from './SearchSectionSelectionContainer';
import SearchAssociatedClassesSelectionContainer from './SearchAssociatedClassesSelectionContainer';

export default function Search() {
  const view = useSelector(searchViewSelector);

  return (
    <div>
      {view === 'search' && (
        <Fragment>
          <SearchBox />
          <SearchResults />
        </Fragment>
      )}
      {view === 'sectionSelection' && <SearchSectionSelectionContainer />}
      {view === 'associatedClassesSelection' && <SearchAssociatedClassesSelectionContainer />}
    </div>
  );
}
