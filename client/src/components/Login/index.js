import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authActions } from '../../actions';

class Login extends Component {
  state = {
    submitted: false,
    login: '',
    password: '',
    clientError: []
  };

  componentDidMount() {
    console.log(this.props);
  }

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

    this.setState({
      submitted: true
    });

    const { login, password } = this.state;
    const { signIn } = this.props;

    if (login.length <= 0 || password.length <= 0) {
      return false;
    }

    signIn(login, password);
  };

  render() {
    const { errorMsg, loggedIn } = this.props;
    const { submitted } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    const errorServer = submitted && errorMsg
      ? <div><span>{errorMsg}</span><br /></div>
      : null;

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login</h2>
        {errorServer}
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
