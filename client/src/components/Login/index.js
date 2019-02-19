import React, { Component } from 'react';

class Login extends Component {
  state = {
    submitted: false,
    login: '',
    password: ''
  };

  onChangeLogin = (event) => {
    this.setState({
      login: event.target.value
    })
  };

  onChangePass = (event) => {
    this.setState({
      password: event.target.value
    })
  };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    const { login, password } = this.state;

    const rawResponse = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login: login, password: password})
    });
    const content = await rawResponse.json();

    console.log(content);
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

export default Login;
