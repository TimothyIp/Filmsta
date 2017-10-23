import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
 
 render() {
   const { userLogOut, test, id, username } = {...this.props};

   return (
    <div>
     
      Navigation Bar
      {
        !id ? <Link to="/">Home</Link>
            : <Link to={`/user/${username}`}>Home</Link>
      }
      <Link to="/register">Register</Link>
      { 
        !id ? <Link to="/login"><button>Login</button></Link> 
            :
              <Link to="/">
                <button onClick={userLogOut}>Logout</button>
              </Link>
      }
      <button onClick={test}>Test</button>
    </div>
   );
 }
}