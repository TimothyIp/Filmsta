import React from 'react';
import ReviewButton from './ReviewButton';

const posterPath = 'https://image.tmdb.org/t/p/w300';
const backdropPath = 'https://image.tmdb.org/t/p/w1280';

export default class UserCollection extends React.Component {

  render() {
    return (
      <div>
        <img onClick={()=> {
          this.props.handleDisplay(this.props.movie.movieTitle)
        }} src={`${posterPath}${this.props.movie.poster_path}`} alt={`Movie Poster of ${this.props.movie.movieTitle}`}/>
        <h2>{this.props.movie.movieTitle}</h2>
        {
          (this.props.movie.movieTitle === this.props.activeDisplay)
            ? <div>
                <button onClick={this.props.handleDisplayClose}>Close</button>
                <img src={`${backdropPath}${this.props.movie.backdrop_path}`} alt={`Backdrop of Movie ${this.props.movie.movieTitle}`}/>
                <h2>{this.props.movie.movieTitle}</h2>
                <p>Release Date: {this.props.movie.release_date}</p>
                <p>{this.props.movie.overview}</p>
                <ReviewButton />
                <button onClick={() => {this.props.removeFromUserCollection(this.props.movie.movieTitle)}}>Remove from Collection</button>
              </div>
            : null
        }
      </div>
    )
  }
}