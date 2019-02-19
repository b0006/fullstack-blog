import Cookies from 'js-cookie';

export default class AuthService {
  static signIn = async (login, password) => {
    const rawResponse = await fetch('http://localhost:5000/login', {
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
      setCookie(content.session.passport);
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
  const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookies.set('auth_user', session, { expires: inOneHour });
};

const removeCookie = () => {
  Cookies.remove('auth_user');
};
