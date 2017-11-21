import React from 'react';

const AddMovieButton = (props) => {
  const { searchPageView } = props
  return (
    <div className="addMovie__btn">
      <button onClick={searchPageView}>Add Movies</button>
    </div>
  )
}

export default AddMovieButton;