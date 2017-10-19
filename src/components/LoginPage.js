import React from 'react';
import LoginForm from './LoginForm';
import { Container } from 'semantic-ui-react';

const LoginPage = () => {
  return (
    <div>
      <Container text>
        <h1>LOGIN PAGE</h1>
        <LoginForm />
      </Container>
    </div>
  )
}

export default LoginPage;