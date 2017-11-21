import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor() {
    super()

    this.state = {
      navbarBackground: false
    }
  }

  changeNavbar = () => {
    this.setState(prevState => ({
      navbarBackground: !prevState.navbarBackground
    }))
  }
 
 render() {
   const { userLogOut, id, username, url } = {...this.props};

   return (
      <div className={`navigation__container ${(url.indexOf("/user/") >= 0) ? "nav__show" : null}`}>
        <div className="wrapper">
          <div className="logo">
            <Link to="/">Filmsta</Link>
          </div>
          <div className="navigation__links">
            {
              !id ? <Link to="/">Home</Link>
                  : <Link to={`/user/${username}`}>Home</Link>
            }
            {
              (id)
                ? null
                : <Link to="/register">Register</Link>
            }
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