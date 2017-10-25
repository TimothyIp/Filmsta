import React from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const SearchPage = (props) => {
  return (
    <div>
      <h3>Searching for {props.searchedShows}</h3>
      <SearchBar 
      handleSearchChange={props.handleSearchChange}
      handleSearchSubmit={props.handleSearchSubmit}
      />
      {
        (props.movieResults.length)
          ? <ul>
              {props.movieResults.map((movie, index) => {
                return (
                  <li key={`movieId-${index}`}>
                    <MovieCard 
                    movie={movie}
                    handleMovieInfoDisplay={props.handleMovieInfoDisplay}
                    activeMovieInfo={props.activeMovieInfo}
                    addToUsersMovies={props.addToUsersMovies}
                    />
                  </li>
                )
              })}
            </ul>
          : null
      }
      {
        (props.errorLog.length)
          ? <p>Could not find movie.</p>
          : null
      }
    </div>
  )
}

export default SearchPage;