import { authConstants } from '../constants';

const initialState = {
  loggedIn: false,
  user: {
    login: 'user'
  },
  errorMsg: null
};

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
    return initialState;
  case authConstants.AUTH_LOGOUT_FAILURE:
    return state;

  default:
    return state;
  }
};

export {
  authentication
};
