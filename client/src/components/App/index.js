import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Logout from '../Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" exact component={LoginPage} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    );
  }
}

export default App;
