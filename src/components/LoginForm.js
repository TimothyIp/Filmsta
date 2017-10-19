import React from 'react';
import { Form, Button } from 'semantic-ui-react';

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
      loginOption : event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { loginOption } = this.state;
    const loginMethod = loginOption;
    const loginMethodCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      loginOption: "",
      email: "",
      username: ""
    })
    
    if (loginMethodCheck.test(loginMethod)) {
      this.setState({
        email: loginMethod
      });
    } else {
      this.setState({
        username: loginMethod
      });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="loginOption" label="Username or Email Address" placeholder="Username or Email Address" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} name="password" type="password" label="Password" placeholder="Password" />
        </Form.Group>
        <Button fluid>Submit</Button>
      </Form>
      </div>
    )
  }
}