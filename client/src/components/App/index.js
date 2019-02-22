import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Navbar from '../Navbar';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Logout from '../Logout';
import Preloader from '../Preloader';

import './App.css';

class App extends Component {
  state = { isLoading: true };
  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return <Preloader />;

    return (
      <div className='container'>
        <Header />
        <Navbar />
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
