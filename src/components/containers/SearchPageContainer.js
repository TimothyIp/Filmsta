import React from 'react';
import SearchPage from '../SearchPage';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');
const API_URL = 'http://localhost:3000/api';

export default class SearchPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      searchedShows: "",
      movieResults: [],
      activeMovieInfo:"",
      errorLog: []
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSearchSubmit = (e) => {
    const searchedShows = this.state.searchedShows;
    e.preventDefault();
    this.getMovieResults(searchedShows);
  }

  handleMovieInfoDisplay = (movie) => {
    console.log(movie)
    this.setState({
      activeMovieInfo: movie
    })
  }

  // Filtering out movies with no posters
  checkPosterPath = (movies) => {
    let moviesArr = [];
    const moviesLength = movies.length
    for (let i = 0; i < moviesLength; i++) {
      if (movies[i].backdrop_path && movies[i].poster_path) {
        moviesArr.push(movies[i]);
      }
    }
    return moviesArr;
  }

  getMovieResults = (show) => {
    axios.post(`${API_URL}/search/${show}`, null, {
      headers: { Authorization: token }
    })
    .then(res => {
      const movieResults = res.data.response.moviesRequested.results;
      console.log(this.checkPosterPath(movieResults));
      this.setState({
        errorLog:[],
        movieResults: this.checkPosterPath(movieResults)
      })
    })
    .catch(error => {
      console.log("error",error)
      const errorMsg = Array.from(this.state.errorLog);
      errorMsg.push(error);
      this.setState({
        movieResults: "",
        errorLog: errorMsg
      })
    })
  }

  addToUsersMovies = (movie) => {
    axios.post(`${API_URL}/user/addmovie`, {movie}, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      this.props.collectionSync();
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <SearchPage
        handleSearchChange={this.handleSearchChange}
        handleSearchSubmit={this.handleSearchSubmit}
        handleMovieInfoDisplay={this.handleMovieInfoDisplay}
        addToUsersMovies={this.addToUsersMovies}
        {...this.state}
      />
    )
  }
}