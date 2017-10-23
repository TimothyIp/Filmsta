import React from 'react';

const AddMovieButton = (props) => {
  const { searchPageView } = props
  return (
    <button onClick={searchPageView}>Add Movies</button>
  )
}

export default AddMovieButton;