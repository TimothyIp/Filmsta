import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default class Navigation extends React.Component {
 
 render() {
   const { userLogOut, test } = {...this.props};
   return (
    <div>
      Navigation Bar
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/">
        <Button onClick={userLogOut}>Logout</Button>
      </Link>
      <Button onClick={test}>Test</Button>
    </div>
   );
 }
}