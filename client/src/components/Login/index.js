import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../actions';

class Login extends Component {
  state = {
    submitted: false,
    login: '',
    password: ''
  };

  onChangeLogin = (event) => {
    this.setState({
      login: event.target.value
    });
  };

  onChangePass = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { login, password } = this.state;
    const { signIn } = this.props;

    if (login.length > 0 && password.length > 0) {
      signIn(login, password);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login</h2>
        <input type="text" onChange={this.onChangeLogin} placeholder="Login" />
        <input type="password" onChange={this.onChangePass} placeholder="Password" />
        <input type="submit" defaultValue="Sign in" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, errorMsg, user } = state.authentication;
  return {
    loggedIn,
    errorMsg,
    user
  };
};

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
