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

const cookies = new Cookies();
const token = cookies.get('token');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }
  componentDidMount() {
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
          <Navigation />
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
