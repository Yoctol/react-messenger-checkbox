import MessengerCheckbox from 'react-messenger-checkbox';
import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <MessengerCheckbox
            pageId="<PAGE_ID>"
            appId="<APP_ID>"
            origin="<ORIGIN>"
            userRef="<USER_REF>"
          />
          ,
          <input
            type="button"
            onClick={global.confirmOptIn}
            value="Confirm Opt-in"
          />
        </div>
      </div>
    );
  }
}

export default App;
