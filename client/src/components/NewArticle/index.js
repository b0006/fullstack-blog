import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './NewArticle.css';
import { articleActions, modalActions } from '../../actions';

class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    errorMsg: null,
    submitted: false
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  onAddArticle = (article) => {
    const { title, content } = article;
    const { addArticle } = this.props;

    addArticle(title, content);
  };

  onShowModal = () => {
    const {title, content} = this.state;
    const {showModal, hideModal} = this.props;

    const article = {
      title,
      content
    };

    let errorMsg = null;
    if (!title.length && !content.length) {
      errorMsg = 'Title and content are empty';
    } else if (!title.length && content.length) {
      errorMsg = 'Title is empty';
    } else if (title.length && !content.length) {
      errorMsg = 'Content is empty';
    }

    if (!errorMsg) {
      showModal({
        article,
        open: true,
        title: 'Message',
        text: `Are you sure you want to add "${title}"?`,
        btnOkText: 'Add',
        btnCancelText: 'Cancel',
        confirmAction: () => { this.onAddArticle(article); },
        closeModal: () => { hideModal(); }
      }, 'confirm');
    } else {
      this.setState({
        errorMsg
      });
    }
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    const { title, content } = nextState;
  }

  onContentChange = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data
    });
  };

  render() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    const { errorMsg, content } = this.state;
    const error = errorMsg ? errorMsg : null;

    return (
      <form>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">New article</legend>
          <div className="uk-margin">
            <input
              className="uk-input"
              type="text"
              placeholder="Title"
              maxLength="80"
              onChange={this.onChangeTitle}
            />
          </div>

          <div className="uk-margin">
            <div className="editor_block">
              <CKEditor
                editor={ ClassicEditor }
                data={content}
                onInit={ editor => {
                  console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                  this.onContentChange(event, editor);
                } }
              />
            </div>
          </div>

          <div className="uk-margin">
            {error}
          </div>

          <div className="uk-margin">
            <input className="uk-button uk-button-primary" type="button" value="Add" onClick={this.onShowModal} />
          </div>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  const { addArticleSuccess } = state.article;
  return {
    loggedIn,
    addArticleSuccess
  };
};

const mapDispatchToProps = {
  addArticle: articleActions.addArticle,
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
