import { articleConstants } from '../../constants';

const initialState = {
  articleGetError: null,
  articleList: []
};

const article = (state = initialState, action) => {
  switch (action.type) {
  case articleConstants.ARTICLE_GETLIST_REQUEST:
    return state;
  case articleConstants.ARTICLE_GETLIST_SUCCESS:
    return {
      ...state,
      articleList: action.articleList,
      articleGetError: false
    };
  case articleConstants.ARTICLE_GETLIST_FAILURE:
    return {
      ...state,
      articleGetError: action.error
    };
  default:
    return state;
  }
};

export {
  article
};
