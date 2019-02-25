import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions';

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render () {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, errorMsg, user } = state.authentication;
  return {
    errorMsg,
    loggedIn,
    user
  };
};

const mapDispatchToProps = {
  logout: authActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
