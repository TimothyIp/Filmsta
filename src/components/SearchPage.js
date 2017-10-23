import React from 'react';
import SearchBar from './SearchBar';

const SearchPage = (props) => {
  return (
    <div>
      <h3>This is the Search Page</h3>
      <SearchBar 
      handleSearchChange={props.handleSearchChange}
      handleSearchSubmit={props.handleSearchSubmit}
      />
    </div>
  )
}

export default SearchPage;