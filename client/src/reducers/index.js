import { combineReducers } from 'redux';
import { authentication } from '../reducers/auth';
import { article } from '../reducers/api/article';

const rootReducer = combineReducers({
  authentication,
  article
});

export default rootReducer;
