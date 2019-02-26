import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    const { loggedIn } = this.props;

    const logoutLink = loggedIn
      ? <li><Link to="/logout">Logout</Link></li>
      : null;

    const newArticle = loggedIn
      ? <li><Link to="/newArticle">New article</Link></li>
      : null;

    return (
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="active-menu"><Link to='/'>Home</Link></li>
            {newArticle}
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {logoutLink}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, activeMenu } = state.authentication;
  return {
    loggedIn,
    activeMenu
  };
};

export default connect(mapStateToProps)(Header);
