import React from 'react';
import LoginForm from './LoginForm';
import { Container } from 'semantic-ui-react';

const LoginPage = (props) => {
  return (
    <div>
      <Container text>
        <h1>LOGIN PAGE</h1>
        <LoginForm 
        {...props}
        />
      </Container>
    </div>
  )
}

export default LoginPage;