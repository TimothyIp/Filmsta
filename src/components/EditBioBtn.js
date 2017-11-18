import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default class EditBioBtn extends Component {
  constructor() {
    super();

    this.state = {
      bioInputShow: false,
      bioInput: ""
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      bioInputShow: !prevState.bioInputShow
    }))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const newBio = this.state.bioInput;
    const { cookies } = this.props;
    const token = cookies.get('token');

    axios.post(`${API_URL}/user/editbio`, { newBio }, {
      headers: { Authorization: token }
    })
    .then(res => {
      this.props.collectionSync();
      this.setState({
        bioInputShow: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        {
          (this.state.bioInputShow)
            ? <form onSubmit={this.handleSubmit}>
                <textarea maxlength="50" onChange={this.handleChange} name="bioInput" type="text" placeholder="Write something new about yourself"/>
                <button>Submit</button>
              </form>
            : null
        }
        <button onClick={this.handleClick}>Edit Bio</button>
      </div>
    )
  }
}

EditBioBtn.propTypes = {
  bioInputShow: PropTypes.bool,
  bioInput: PropTypes.string
}