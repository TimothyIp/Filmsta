import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPage = (props) => {
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
          <h1>Sign Up</h1>
          <RegisterForm 
              {...props}
          />
        </div>
      </div>
    )
}

export default RegisterPage;