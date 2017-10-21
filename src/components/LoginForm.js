import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
 
    this.props.userLogin({email, password});

    this.setState({
      loginOption: "", 
      email: "",
      username: "",
      password: ""
    })
  }

  render() {
    const { email, password } = this.state;
    const { loginErrors } = this.props;
    return (
      <div>
        <Form error onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} value={email} name="email" label="Email Address" placeholder="Email Address" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input onChange={this.handleChange} value={password} name="password" type="password" label="Password" placeholder="Password" />
        </Form.Group>
        <Button fluid>Submit</Button>
        {loginErrors.length ? <Message 
          error
          header="Wrong login information"
          content="Must enter a correct email address or password"
        /> : null}
      </Form>
      </div>
    )
  }
}