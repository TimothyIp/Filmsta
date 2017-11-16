import React from 'react';
import ReviewButton from './ReviewButton';

const posterPath = 'https://image.tmdb.org/t/p/w300';
const backdropPath = 'https://image.tmdb.org/t/p/w1280';

const UserCollection = (props) => {

    return (
      <div>
        <img onClick={()=> {
          props.handleDisplay(props.movie.movieTitle)
        }} src={`${posterPath}${props.movie.poster_path}`} alt={`Movie Poster of ${props.movie.movieTitle}`}/>
        <h2>{props.movie.movieTitle}</h2>
        {
          (props.movie.movieTitle === props.activeDisplay)
            ? <div>
                <button onClick={props.handleDisplayClose}>Close</button>
                <img src={`${backdropPath}${props.movie.backdrop_path}`} alt={`Backdrop of Movie ${props.movie.movieTitle}`}/>
                <h2>{props.movie.movieTitle}</h2>
                <p>Release Date: {props.movie.release_date}</p>
                <p>{props.movie.overview}</p>
                <ReviewButton
                  {...props}
                />
                <button onClick={() => {props.removeFromUserCollection(props.movie.movieTitle)}}>Remove from Collection</button>
              </div>
            : null
        }
        {
         (props.movie.review)
          ? <div>
              <p>{props.movie.review.content}</p>
              <p>User's Rating: {props.movie.review.rating}</p>
            </div>
          : null
        }
      </div>
    )
}

export default UserCollection;