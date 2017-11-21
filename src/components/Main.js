import React from 'react';
import Navigation from './Navigation';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import IntroPage from './IntroPage';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import UserPage from './UserPage';
import { withCookies } from 'react-cookie';

const API_URL = "http://localhost:3000/api";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      authenticated: false,
      loginErrors: []
    }
  }

  userLogin = ({email, password}) => {
    const { cookies } = this.props;
    axios.post(`${API_URL}/auth/login`, {email, password})
    .then(res => {
      console.log(res)
      const userInfo = res.data.user;
      cookies.set('token', res.data.token, { path: '/' });
      cookies.set('user', res.data.user, { path: '/' });
      window.location.href = `/user/${res.data.user.username}`;
      this.setState({
        username: userInfo.username,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        id: userInfo._id,
        authenticated: true,
        loginErrors: []
      })
    })
    .catch(error => {
      const errorLog = Array.from(this.state.loginErrors);
      errorLog.push(error)
      this.setState({
        loginErrors: errorLog
      })
    })
  }

  userLogOut = () => {
    const { cookies } = this.props;
    console.log("LOGGED OUT")
    cookies.remove('token', { path: '/' });
    cookies.remove('user', { path: '/' });
    this.setState({
      authenticated: false
    });
    window.location.href = "/"
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get('token')
    const tokenUser = cookies.get('user')
    let hasToken = () => {
      if (token) {
        this.setState({
          username: tokenUser.username,
          firstName: tokenUser.firstName,
          lastName: tokenUser.lastName,
          id: tokenUser._id,
          authenticated: true
        })
      }
    }
    hasToken();
  }

  render() {

    return (
        <BrowserRouter>
          <div>
            <div className="wrapper">
              <Route path="/*"
                render={({ match }) => 
                <Navigation
                  {...this.state}
                  {...match} 
                  userLogin={this.userLogin}
                  userLogOut={this.userLogOut}
                />
              }
              />
            </div>
            <Route exact path="/" component={IntroPage}/>
            <Route path="/register" 
                  render={(props) => 
                    <RegisterPage 
                      {...this.props}
                    />}
            />
            <Route path="/login" 
                  render={(props) => 
                  <LoginPage 
                      {...this.state}
                      {...this.props}
                      userLogin={this.userLogin} 
                  />}
            />
            <Route  exact strict path="/user/:username"
                    render={({ match }) => 
                    <UserPage
                      {...this.state}
                      {...this.props}
                      {...match}
                    />
                    }
            />
          </div>
        </BrowserRouter>
    )
  }
}

export default withCookies(Main);