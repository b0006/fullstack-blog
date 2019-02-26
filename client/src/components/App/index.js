import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Logout from '../Logout';
import Preloader from '../Preloader';
import NewArticle from '../NewArticle';
import UpdateArticle from '../UpdateArticle';

import '../../assets/css/uikit.css';
import '../../assets/css/uikit-rtl.css';

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
      <div className='uk-container'>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" exact component={LoginPage} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/newArticle" exact component={NewArticle} />
          <Route path="/updateArticle" exact component={UpdateArticle} />
        </Switch>
      </div>
    );
  }
}

export default App;
