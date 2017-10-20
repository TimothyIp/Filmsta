import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_URL = 'http://localhost:3000/api';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      loginOption: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  loginUser = () => {
    const { email, password } = this.state;
    axios.post(`${API_URL}/auth/login`, {email, password})
    .then(res => {
      console.log(res)
      cookies.set('token', res.data.token, { path: '/' });
      cookies.set('user', res.data.user, { path: '/' });
      window.location.href = '/dashboard';
    })
    .catch(error => {
      console.log(error)
    })
   
  }

  handleSubmit = (e) => {
    e.preventDefault();
 
    this.loginUser();

    // this.setState({
    //   loginOption: "", 
    //   email: "",
    //   username: "",
    //   password: ""
    // })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} value={email} name="email" label="Email Address" placeholder="Email Address" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} value={password} name="password" type="password" label="Password" placeholder="Password" />
        </Form.Group>
        <Button fluid>Submit</Button>
      </Form>
      </div>
    )
  }
}