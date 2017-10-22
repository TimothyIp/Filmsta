import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export default class UserPage extends React.Component {
  constructor() {
    super();
    
    this.state = {
      viewedUser: "",
      errorLog: []
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


  render () {
    

    return (
      <div>
        <h3>Profile of {this.state.viewedUser.firstName}</h3>
        <p>Their info will be here</p>
        <button>Add Movie</button>
        {
          (this.state.errorLog.length) 
            ? this.state.errorLog[0].response.data.error
            : null 
        }
      </div>
    )
  }
}