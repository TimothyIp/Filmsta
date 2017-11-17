import React, { Component } from 'react';
import Main from './components/Main';
import './App.css'
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CookiesProvider>
          <Main />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
