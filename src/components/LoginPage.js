import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = (props) => {
  const imageUrl = require('../assets/formbackdrop.jpeg');
  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover"
  }
  return (
    <div>
      <div className="shadow"></div>
      <div className="form" style={style}></div>
        <div className="form__container">
          <h1>Sign In</h1>
          <LoginForm 
          {...props}
          />
        </div>
    </div>
  )
}

export default LoginPage;