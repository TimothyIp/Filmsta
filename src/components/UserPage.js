import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddMovieButton from './AddMovieButton';
import SearchPageContainer from './containers/SearchPageContainer';
import UserCollection from './UserCollection';
import UsersInfo from './UsersInfo';
import Loading from './Loading';

const API_URL = 'http://localhost:3000/api/user';


export default class UserPage extends React.Component {
  constructor() {
    super();
    
    this.state = {
      viewedUser: "",
      errorLog: [],
      searchPageOn: false,
      usersCollection: [],
      activeDisplay: "",
      usersReviewBackdrop: "",
      numberOfReviews: 0,
      loadStatus: false,
      loadShow: true
    }
  }

  componentDidMount() {
    this.collectionSync();
    setTimeout(function() { this.setState({ loadStatus: true })}.bind(this), 500)
    setTimeout(function() { this.setState({ loadShow: false })}.bind(this), 700)
  }

  searchPageView = (e) => {
    this.setState(prevState => ({
      searchPageOn: !prevState.searchPageOn
    }))
  }

  collectionSync = () => {
    console.log("SYNCING UP with database")
    axios.get(`${API_URL}/${this.props.params.username}`)
    .then(res => {
      this.setState({
        viewedUser: res.data.user,
        usersCollection: res.data.user.movies
      }, () => {
        this.profileBackdrop();
      })
    })
    .catch(error => {
      const errorMsg = Array.from(this.state.errorLog);
      errorMsg.push(error);
      this.setState({
        errorLog: errorMsg
      })
    })
  }

  profileBackdrop = () => {
    const usersMovies = Array.from(this.state.usersCollection);
    const moviesWithReviews = [];

    for (let i = 0; i < usersMovies.length; i++) {
      if (usersMovies[i].review) {
        moviesWithReviews.push(usersMovies[i])
      }
    }

    if (moviesWithReviews.length > 1) {
      const randomBackdrop = moviesWithReviews[Math.floor(Math.random() * moviesWithReviews.length)].backdrop_path;
      
      this.setState({
        usersReviewBackdrop: randomBackdrop,
        numberOfReviews: moviesWithReviews.length
      });
    }
  }

  handleDisplay = (movie) => {
    this.setState({
      activeDisplay: movie
    });
  }

  handleDisplayClose = () => {
    this.setState({
      activeDisplay: ""
    });
  }

  removeFromUserCollection = (movie) => {
    const { cookies } = this.props;
    const token = cookies.get('token');

    axios.post(`${API_URL}/removemovie`, {movie}, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      console.log(res)
      this.collectionSync();
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div>
        <UsersInfo 
          {...this.state}
          {...this.props}
          collectionSync={this.collectionSync}
        />
        {
          (this.state.loadShow)
           ? <Loading 
              loadStatus={this.state.loadStatus}
             />
           : null
        }
        <div className="userPage__container">
          {
            (this.state.searchPageOn)
             ? <SearchPageContainer 
                collectionSync={this.collectionSync}
                {...this.props}
                />
              : null
          }
          <div className="wrapper">
            {
              (this.props.username === this.props.params.username)
               ? <p className="movie__section--title">Your Movies</p>
               : <p className="movie__section--title">{this.props.params.username}'s Movies</p>
            }
            {
              (this.props.username === this.props.params.username)
                ? <AddMovieButton 
                    searchPageView={this.searchPageView}
                  />
                : null
            }
            {
              (this.state.errorLog.length) 
                ? this.state.errorLog[0].response.data.error
                : null 
            }
            {
              (this.state.usersCollection)
                ? <ul>
                    {this.state.usersCollection.map((movie, index) => {
                      return (
                        <li key={`usersMovieId-${index}`}>
                          <UserCollection
                          movie={movie}
                          handleDisplay={this.handleDisplay}
                          handleDisplayClose={this.handleDisplayClose}
                          removeFromUserCollection={this.removeFromUserCollection}
                          collectionSync={this.collectionSync}
                          {...this.state}
                          {...this.props}
                          />
                        </li>
                      )
                    })}
                  </ul>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}

UserPage.propTypes = {
  viewedUser: PropTypes.string,
  errorLog: PropTypes.array,
  searchPageOn: PropTypes.bool,
  usersCollection: PropTypes.array,
  activeDisplay: PropTypes.string,
  usersReviewBackdrop: PropTypes.string,
  numberOfReviews: PropTypes.number,
  loadStatus: PropTypes.bool,
  loadShow: PropTypes.bool
}