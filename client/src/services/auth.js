export default class AuthService {
  constructor() {
    this._apiBase = 'http://localhost:5000';
  }

  static signIn = async (login, password) => {
    const rawResponse = await fetch(this._apiBase + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    });
    const content = await rawResponse.json();

    if (content.status) {
      return { login };
    } else {
      throw content.message;
    }
  };

  static logout = () => {

  };
}
