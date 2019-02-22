import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authActions } from '../../actions';

import './Login.css';

class Login extends Component {
  state = {
    clientError: [],
    login: '',
    password: '',
    submitted: false
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
      ? <div><span className="error">{errorMsg}</span><br /></div>
      : null;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="row login_form">
          <div className="col-md-12">
            <h1>Login</h1>
          </div>

          <div className="col-md-12">
            <label><b>Username</b></label>
            <input className="login_form__input_text" type="text" onChange={this.onChangeLogin} placeholder="Username" required />
          </div>
          <div className="col-md-12">
            <label><b>Password</b></label>
            <input className="login_form__input_text" type="password" onChange={this.onChangePass} placeholder="Password" required />
          </div>

          <div className="col-md-12">
            <div className="error_block">
              {errorServer}
            </div>
          </div>

          <div className="col-md-12">
            <button className="btn_green" type="submit">Sign in</button>
          </div>

        </div>
      </form>
    );
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
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
