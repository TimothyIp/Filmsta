import React from 'react';

const SearchBar = (props) => {
  return (
    <form onSubmit={props.handleSearchSubmit}>
      <input onChange={props.handleSearchChange} type="text" name="searchedShows" placeholder="Search for a movie" />
    </form>
  )
}

export default SearchBar;