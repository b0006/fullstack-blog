import { ArticleService } from '../../services';
import { articleConstants } from '../../constants';

const articleStoreService = new ArticleService();

function getList() {
  return dispatch => {
    dispatch(request());

    articleStoreService.getList()
      .then(
        articleList => {
          dispatch(success(articleList));
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: articleConstants.ARTICLE_GETLIST_REQUEST }; }
  function success(articleList) { return { type: articleConstants.ARTICLE_GETLIST_SUCCESS, articleList }; }
  function failure(error) { return { type: articleConstants.ARTICLE_GETLIST_FAILURE, error }; }
}

export {
  getList
};
