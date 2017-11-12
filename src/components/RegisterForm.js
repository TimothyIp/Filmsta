import React from 'react';
import axios from 'axios';
import FormAlert from './FormAlert';

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
          <input onChange={this.handleChange} name="username" label="Username" placeholder="Username" />
          <input onChange={this.handleChange} name="email" label="Email Address" placeholder="Email Address" />
          {
            (this.state.registrationError.length)
              ? <FormAlert 
                  header="Something went wrong"
                  content={`${this.state.registrationError[this.state.registrationError.length - 1].response.data.error}`}
                />
              : null
          }
          <input onChange={this.handleChange} name="firstName" label="First Name" placeholder="First Name" />
          <input onChange={this.handleChange} name="lastName" label="Last Name" placeholder="Last Name" />
          <input onChange={this.handleChange} name="password" type="password" label="Password" placeholder="Password" />
          <button>Submit</button>
      </form>
    )
  }
}

