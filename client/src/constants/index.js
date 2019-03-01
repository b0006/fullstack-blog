import keyMirror from 'keymirror';

export const apiBase = 'http://localhost:5000/api';

export const authConstants = keyMirror({
  AUTH_LOGOUT_FAILURE: null,
  AUTH_LOGOUT_REQUEST: null,
  AUTH_LOGOUT_SUCCESS: null,

  AUTH_SIGN_IN_FAILURE: null,
  AUTH_SIGN_IN_REQUEST: null,
  AUTH_SIGN_IN_SUCCESS: null,

  COOKIE_KEY: 'auth_user'
});

export const articleConstants = keyMirror({
  ARTICLE_GETLIST_FAILURE: null,
  ARTICLE_GETLIST_REQUEST: null,
  ARTICLE_GETLIST_SUCCESS: null,

  ARTICLE_GET_REQUEST: null,
  ARTICLE_GET_SUCCESS: null,
  ARTICLE_GET_FAILURE: null,

  ARTICLE_ADD_REQUEST: null,
  ARTICLE_ADD_SUCCESS: null,
  ARTICLE_ADD_FAILURE: null,

  ARTICLE_DELETE_REQUEST: null,
  ARTICLE_DELETE_SUCCESS: null,
  ARTICLE_DELETE_FAILURE: null,

  ARTICLE_END_DELETE: null
});

export const headerConstants = keyMirror({
  HEADER_SET_ACTIVE_ITEM_REQUEST: null,
  HEADER_SET_ACTIVE_ITEM_SUCCESS: null,
  HEADER_SET_ACTIVE_ITEM_FAILURE: null
});

export const modalConstants = keyMirror({
  SHOW_MODAL: null,
  HIDE_MODAL: null
});
