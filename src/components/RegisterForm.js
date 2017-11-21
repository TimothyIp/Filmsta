import React from 'react';
import axios from 'axios';
import FormAlert from './FormAlert';
import PropTypes from 'prop-types';

const API_URL = 'http://localhost:3000/api';

export default class RegisterForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      registrationError: []
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = (e) => {
    const { cookies } = this.props;
    e.preventDefault();
    const { firstName, lastName, username, email, password } = this.state;
    
    axios.post(`${API_URL}/auth/register`, {firstName, lastName, username, email, password})
    .then(res => {
      console.log(res)
      cookies.set('token', res.data.token, { path: "/" });
      cookies.set('user', res.data.user, { path: "/" });
      this.setState({
        registrationError: []
      })
      window.location.href = `/user/${res.data.user.username}`;
    })
    .catch((error) => {
      console.log(error);
      const errorLog = Array.from(this.state.registrationError);

      errorLog.push(error);

      this.setState({
        registrationError: errorLog
      })

    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="username" label="Username" placeholder="Username" required />
          <input onChange={this.handleChange} name="email" label="Email Address" placeholder="Email Address" required />
          {
            (this.state.registrationError.length)
              ? <FormAlert 
                  header="Something went wrong"
                  content={`${this.state.registrationError[this.state.registrationError.length - 1].response.data.error}`}
                />
              : null
          }
            <input onChange={this.handleChange} className="form__name" name="firstName" label="First Name" placeholder="First Name" required />
            <input onChange={this.handleChange} className="form__name" name="lastName" label="Last Name" placeholder="Last Name" required />
          <input onChange={this.handleChange} name="password" type="password" label="Password" placeholder="Password" required />
          <button>Get Started</button>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  registrationError: PropTypes.array
}