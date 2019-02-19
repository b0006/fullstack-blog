import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { loggedIn } = this.props;

    const logoutLink = loggedIn
      ? <li><Link to="/logout">Logout</Link></li>
      : null;


    return (
      <div>
        <ul>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/">Home</Link></li>
          {logoutLink}
        </ul>
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
