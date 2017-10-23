import React from 'react';
import SearchPage from '../SearchPage';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/search'

export default class SearchPageContainer extends React.Component {
  constructor() {
    super();

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    this.state = {
      searchedShows: ""
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

  getMovieResults = (show) => {
    axios.post(`${API_URL}/${show}`)
    .then(res => {
      console.log(res)
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
      />
    )
  }
}