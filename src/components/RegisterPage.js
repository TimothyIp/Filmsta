import React from 'react';
import RegisterForm from './RegisterForm';

export default class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <h1>REGISTER PAGE</h1>
        <div className="registerform__container">
          <RegisterForm 
            {...this.props}
          />
        </div>
      </div>
    )
  }
}