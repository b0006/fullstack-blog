import { combineReducers } from 'redux';
import { authentication } from '../reducers/auth';
import { article } from '../reducers/api/article';
import { header } from '../reducers/header';

const rootReducer = combineReducers({
  authentication,
  article,
  header
});

export default rootReducer;
