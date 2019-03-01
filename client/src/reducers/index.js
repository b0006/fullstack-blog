import { combineReducers } from 'redux';
import { authentication } from './auth';
import { article } from './api/article';
import { header } from './header';
import { modal } from './modal';

const rootReducer = combineReducers({
  authentication,
  article,
  header,
  modal
});

export default rootReducer;
