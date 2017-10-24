import React from 'react';
const posterPath = 'https://image.tmdb.org/t/p/w300';

export default class MovieCard extends React.Component {
  constructor() {
    super();

    this.handleMovieClick = this.handleMovieClick.bind(this);

    this.state = {
      movieTitle:"",
      releaseDate:"",
      backDropPath:"",
      overview:"",
      movieId:"",
      rating:"",
      showCardInfo: false
    }
  }

  handleMovieClick() {
    this.setState(prevState => ({
      showCardInfo: !prevState.showCardInfo
    }))
  }

  render() {
    return (
        <div >
          <img onClick={this.handleMovieClick} src={`${posterPath}${this.props.movie.poster_path}`} alt=""/>
          <p>
            {this.props.movie.title}
          </p>
          {
            (this.state.showCardInfo)
              ? <div>
                  <h2>
                    {this.props.movie.title}
                  </h2>
                  <p>Release Date: {this.props.movie.release_date}</p>
                  <p>{this.props.movie.overview}</p>
                </div>
              : null
          }
        </div>
    )
  }
}