import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './components/Navigation';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const token = cookies.get('token');
const tokenUser = cookies.get('user')
const API_URL = "http://localhost:3000/api";

class Main extends React.Component {
  constructor() {
    super();

    this.userLogin = this.userLogin.bind(this);
    this.userLogOut = this.userLogOut.bind(this);

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
    axios.post(`${API_URL}/auth/login`, {email, password})
    .then(res => {
      console.log(res)
      const userInfo = res.data.user;
      cookies.set('token', res.data.token, { path: '/' });
      cookies.set('user', res.data.user, { path: '/' });
      window.location.href = `/${res.data.user.username}`;
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
    console.log("LOGGED OUT")
    cookies.remove('token', { path: '/' });
    cookies.remove('user', { path: '/' });
    console.log(token);
    this.setState({
      authenticated: false
    });
    window.location.href = "/"
  }

  // test = () => {
  //   axios.get(`${API_URL}/user/${tokenUser._id}`, {
  //     headers: {
  //       Authorization: token
  //     }
  //   })
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  componentDidMount() {
    console.log("token", cookies.get('user'), token)
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
          <Navigation 
            userLogin={this.userLogin}
            userLogOut={this.userLogOut}
            test={this.test}
          />
          <Route exact path="/" component={App} />
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" 
                 render={(props) => 
                 <LoginPage 
                  {...this.state}
                  userLogin={this.userLogin} 
                 />}
          />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
