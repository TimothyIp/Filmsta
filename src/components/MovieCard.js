import React from 'react';
const posterPath = 'https://image.tmdb.org/t/p/w300';
const backdropPath = 'https://image.tmdb.org/t/p/w1280';

export default class MovieCard extends React.Component {
  constructor() {
    super();

    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.closeInfo = this.closeInfo.bind(this);

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
    // Sets new active movie display
    this.props.handleMovieInfoDisplay(this.props.movie.title);
    
    // Only show one active movie at a time
    if (this.props.movie.title === this.props.activeMovieInfo) {
      this.setState(prevState => ({
        showCardInfo: !prevState.showCardInfo
      }))
    }
  }

  closeInfo() {
    this.props.handleMovieInfoDisplay("");
    this.setState({
      showCardInfo: false
    })
  }

  render() {
    return (
        <div >
          <img onClick={this.handleMovieClick} src={`${posterPath}${this.props.movie.poster_path}`} alt={`Movie Poster of ${this.props.movie.title}`}/>
          <p>
            {this.props.movie.title}
          </p>
          {
            (this.props.movie.title === this.props.activeMovieInfo)
              ? <div>
                  <button onClick={this.closeInfo}>Close</button>
                  <img src={`${backdropPath}${this.props.movie.backdrop_path}`} alt=""/>
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