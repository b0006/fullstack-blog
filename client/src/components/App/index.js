import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" exact component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
