import React, { Component } from 'react';
import Main from './components/Main';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Filmsta</h1>
        <p>You can showoff what you've watched and your review about them.</p>
        <CookiesProvider>
          <Main />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
