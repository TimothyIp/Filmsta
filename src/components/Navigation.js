import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
 
 render() {
   const { userLogOut, id, username } = {...this.props};

   return (
      <div className="navigation__container">
        <div className="wrapper">
          <div className="logo">
            Filmsta
          </div>
          <div className="navigation__links">
            {
              !id ? <Link to="/">Home</Link>
                  : <Link to={`/user/${username}`}>Home</Link>
            }
            <Link to="/register">Register</Link>
            { 
              !id ? <Link to="/login"><button>Login</button></Link> 
                  :
                    <Link to="/">
                      <button onClick={() => {userLogOut()}}>Logout</button>
                    </Link>
            }
          </div>
        </div>
      </div>
   )
 }
}