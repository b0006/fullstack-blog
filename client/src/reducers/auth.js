import Cookies from 'js-cookie';
import { authConstants } from '../constants';

const session = Cookies.get(authConstants.COOKIE_KEY);
let user = null;
if (session) {
  user = JSON.parse(session).user;
}

const templateState = {
  errorMsg: null,
  loggedIn: false,
  user: {
    login: null
  }
};

const initialState = user ? {
  ...templateState,
  loggedIn: true,
  user: {
    login: user.login
  }
} : templateState;

const authentication = (state = initialState, action) => {
  switch (action.type) {
  case authConstants.AUTH_SIGN_IN_REQUEST:
    return state;
  case authConstants.AUTH_SIGN_IN_SUCCESS:
    return {
      ...state,
      loggedIn: true,
      user: action.user
    };
  case authConstants.AUTH_SIGN_IN_FAILURE:
    return {
      ...state,
      errorMsg: action.error
    };

  case authConstants.AUTH_LOGOUT_REQUEST:
    return state;
  case authConstants.AUTH_LOGOUT_SUCCESS:
    return templateState;
  case authConstants.AUTH_LOGOUT_FAILURE:
    return state;

  default:
    return state;
  }
};

export {
  authentication
};
