import React from 'react';
import axios from 'axios';
import AddMovieButton from './AddMovieButton';
import SearchPageContainer from './containers/SearchPageContainer';
import UserCollection from './UserCollection';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');
const API_URL = 'http://localhost:3000/api/user';


export default class UserPage extends React.Component {
  constructor() {
    super();
    
    this.searchPageView = this.searchPageView.bind(this);
    this.collectionSync = this.collectionSync.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleDisplayClose = this.handleDisplayClose.bind(this);
    this.removeFromUserCollection = this.removeFromUserCollection.bind(this);

    this.state = {
      viewedUser: "",
      errorLog: [],
      searchPageOn: false,
      usersCollection: [],
      activeDisplay: ""
    }
  }

  componentDidMount() {
    this.collectionSync();
  }

  searchPageView(e) {
    this.setState(prevState => ({
      searchPageOn: !prevState.searchPageOn
    }))
  }

  collectionSync() {
    console.log("SYNCING UP with database")
    axios.get(`${API_URL}/${this.props.params.username}`)
    .then(res => {
      this.setState({
        viewedUser: res.data.user,
        usersCollection: res.data.user.movies
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
        <h3>Profile of {this.state.viewedUser.firstName}</h3>
        <div>
          {
            this.state.searchPageOn && <SearchPageContainer 
                                          collectionSync={this.collectionSync}
                                       />
          }
        </div>
        <p>Their info will be here</p>
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
                      {...this.state}
                      />
                    </li>
                  )
                })}
              </ul>
            : null
        }
      </div>
    )
  }
}