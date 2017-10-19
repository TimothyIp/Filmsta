import React from 'react';
import RegisterForm from './RegisterForm';
import { Container } from 'semantic-ui-react';

export default class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>REGISTER PAGE</h1>
        <Container className="registerform__container" text>
          <RegisterForm />
        </Container>
      </div>
    )
  }
}