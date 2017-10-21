import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const API_URL = 'http://localhost:3000/api';
const cookies = new Cookies();



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
    e.preventDefault();
    const { firstName, lastName, username, email, password } = this.state;
    
    axios.post(`${API_URL}/auth/register`, {firstName, lastName, username, email, password})
    .then(res => {
      console.log(res)
      cookies.set('token', res.data.token, { path: "/" });
      cookies.set('user', res.data.user, { path: "/" });
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
      <Form onSubmit={this.handleSubmit} error>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="username" label="Username" placeholder="Username" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="email" label="Email Address" placeholder="Email Address" />
        </Form.Group>
        {this.state.registrationError.length ?
        <Message 
          error
          header="Already Taken"
          content={`${this.state.registrationError.length ? `${this.state.registrationError[0].response.data.error}` : null}`}
        /> : null}
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="firstName" label="First Name" placeholder="First Name" />
          <Form.Input onChange={this.handleChange} name="lastName" label="Last Name" placeholder="Last Name" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="password" type="password" label="Password" placeholder="Password" />
        </Form.Group>
        <Button fluid>Submit</Button>
      </Form>
    )
  }
}