import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddArticle from '../../containers/AddArticle';
import {articleActions, modalActions} from '../../actions';

import BlogItem from './BlogItem';

class BlogList extends Component {
  componentWillUpdate(nextProps, nextState, nextContext) {
    const { deleteArticleSuccess, showModal, hideModal } = nextProps;

    if (deleteArticleSuccess) {
      showModal({
        open: true,
        title: 'Delete',
        text: 'Article successfully deleted',
        btnOkText: 'Ok',
        closeModal: () => {
          hideModal();
        }
      }, 'alert');
    }
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  render() {
    const { articleList, loggedIn } = this.props;

    const newArticle = loggedIn
      ? <AddArticle />
      : null;

    return (
      <div className="uk-child-width-1-3@s uk-grid-match" data-uk-grid>
        {newArticle}
        {
          articleList.map(item => (
            <BlogItem
              key={'article_item_' + item.id}
              id={item.id}
              value={item.value}
              title={item.title}
              img={null}
              description={item.description}
              icon={null}
            />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  const { articleGetError, articleList, deleteArticleSuccess } = state.article;
  return {
    articleGetError,
    articleList,
    loggedIn,
    deleteArticleSuccess
  };
};

const mapDispatchToProps = {
  getList: articleActions.getList,
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
