import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { errorMsg } = this.props;
    const { submitted } = this.state;

    const errorServer = submitted && errorMsg
      ? <span className="error">{errorMsg}</span>
      : null;

    return (
      <form className="login_form" onSubmit={this.onSubmit}>

        <div className="uk-margin">
          <h2>Sign in</h2>
        </div>

        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon" data-uk-icon="icon: user" />
            <input
              className="uk-input"
              type="text"
              onChange={this.onChangeLogin}
              placeholder="Login"
            />
          </div>
        </div>

        <div className="uk-margin">
          <div className="uk-inline">
            <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock" />
            <input
              className="uk-input"
              type="password"
              onChange={this.onChangePass}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="uk-margin error_block">
          {errorServer}
        </div>

        <div className="uk-margin">
          <input type="submit" className="uk-button uk-button-secondary" value="Sign in" />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMsg, user } = state.authentication;
  return {
    errorMsg,
    user
  };
};

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
