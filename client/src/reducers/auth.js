import Cookies from 'js-cookie';
import { authConstants } from '../constants';

let user = Cookies.get('auth_user');
if (user) {
  user = JSON.parse(user).user;
}

const templateState = {
  loggedIn: false,
  user: {
    login: null
  },
  errorMsg: null
};

const initialState = user ? {
  loggedIn: true,
  user: {
    login: user.login
  },
  errorMsg: null
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
