import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = (props) => {
  return (
    <div>
        <h1>LOGIN PAGE</h1>
        <LoginForm 
        {...props}
        />
    </div>
  )
}

export default LoginPage;