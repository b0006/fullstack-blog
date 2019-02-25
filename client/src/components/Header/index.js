import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    const { loggedIn } = this.props;

    const logoutLink = loggedIn
      ? <Link to="/logout">Выйти</Link>
      : null;

    return (
      <div className="header">
        <Link to="/" className="logo">Logo</Link>
        <div className="header-right">
          <Link to="/" className="active">Главная</Link>
          {logoutLink}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(Header);
