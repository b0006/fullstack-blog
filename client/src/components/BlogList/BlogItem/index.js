import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BlogItem.css';
import iconTemp from './nodejs-1440x900.png';
import { articleActions, modalActions } from '../../../actions';
import { articleConstants } from '../../../constants';

class BlogItem extends Component {
  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  onDeleteArticle = (articleId) => {
    const { deleteArticle } = this.props;
    deleteArticle(articleId);
  };

  openConfirmModal = (articleId, articleTitle) => {
    const { showModal } = this.props;
    showModal({
      action: articleConstants.ARTICLE_DELETE_REQUEST,
      articleId: articleId,
      open: true,
      title: 'Delete',
      text: `Are you sure you want to delete "${articleTitle}"?`,
      btnOkText: 'Delete',
      btnCancelText: 'Cancel',
      confirmAction: () => { this.onDeleteArticle(articleId); },
      closeModal: this.closeModal
    }, 'confirm');
  };

  render() {
    let { img, description, title, icon, value, id } = this.props;
    if (!img) {
      img = iconTemp;
    }
    const { loggedIn } = this.props;
    const deleteBtn = loggedIn
      ? <button className="uk-button uk-button-default" type="button" onClick={() => this.openConfirmModal(id, title)}>Delete</button>
      : null;

    return (
      <div className="blog-item">
        <div className="uk-card uk-card-hover uk-card-default">
          {deleteBtn}
          <Link to={'/article/' + value}>
            <div className="uk-card-media-top uk-text-center">
              <img src={img} alt={title} />
            </div>

            <div className="uk-card-body">
              <h3 className="uk-card-title">{title}</h3>
              <p className="blog-item__desc">{description}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal,
  deleteArticle: articleActions.deleteArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
