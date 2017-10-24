import React from 'react';
import axios from 'axios';
import AddMovieButton from './AddMovieButton';
import SearchPageContainer from './containers/SearchPageContainer';

const API_URL = 'http://localhost:3000/api/user';

export default class UserPage extends React.Component {
  constructor() {
    super();
    
    this.searchPageView = this.searchPageView.bind(this);

    this.state = {
      viewedUser: "",
      errorLog: [],
      searchPageOn: false
    }
  }

  componentDidMount() {
    axios.get(`${API_URL}/${this.props.params.username}`)
    .then(res => {
      this.setState({
        viewedUser: res.data.user
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

  searchPageView(e) {
    this.setState(prevState => ({
      searchPageOn: !prevState.searchPageOn
    }))
  }

  render () {
    return (
      <div>
        <h3>Profile of {this.state.viewedUser.firstName}</h3>
        <div>
          {
            this.state.searchPageOn && <SearchPageContainer />
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
      </div>
    )
  }
}