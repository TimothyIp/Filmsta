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
    this.userLogOut = this.userLogOut.bind(this);
    this.state = {
      authenticated: false
    }
  }

  userLogOut = () => {
    cookies.remove('token', { path: '/' });
    cookies.remove('user', { path: '/' });
    console.log(token);
    this.setState({
      authenticated: false
    });
    window.location.href = "/"
  }

  test = () => {
    console.log(tokenUser._id);
    axios.get(`${API_URL}/user/${tokenUser._id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    console.log("token", token)
    let hasToken = () => {
      if (token) {
        this.setState({
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
            userLogOut={this.userLogOut}
            test={this.test}
          />
          <Route exact path="/" component={App} />
          <Route path="/register" component={RegisterPage}/>
          <Route path='/login' component={LoginPage} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
