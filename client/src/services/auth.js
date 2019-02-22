import Cookies from 'js-cookie';
import { authConstants } from '../constants';

export default class AuthService {
  static signIn = async (login, password) => {
    const rawResponse = await fetch('http://localhost:5000/login', {
      body: JSON.stringify({
        login: login,
        password: password
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const content = await rawResponse.json();

    if (content.status) {
      setCookie(content.session);
      return { login };
    } else {
      throw content.message;
    }
  };

  static logout = async () => {
    const rawResponse = await fetch('http://localhost:5000/logout', {
      method: 'GET'
    });
    const content = await rawResponse.json();
    if (content.status) {
      removeCookie();
      return true;
    } else {
      throw content;
    }
  };
}

const setCookie = (session) => {
  const oneHour = 3600000;
  const inOneHour = new Date(new Date().getTime() + oneHour);
  Cookies.set(authConstants.COOKIE_KEY, session, { expires: inOneHour });
};

const removeCookie = () => {
  Cookies.remove(authConstants.COOKIE_KEY);
};
