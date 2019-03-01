import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EmailEditor from 'react-email-editor';

import './NewArticle.css';
import { articleActions } from '../../actions';

class NewArticle extends Component {
  state = {
    title: '',
    errorMsg: null,
    submitted: false
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  onAddArticle = () => {
    const { addArticle } = this.props;
    const { title } = this.state;

    this.setState({
      submitted: false
    });

    if (title.length) {

      this.editor.exportHtml(data => {
        const { /*design,*/ html } = data;

        if (html.length) {
          this.setState({
            content: html,
            errorMsg: null,
            submitted: true
          });

          addArticle(title, html);
        } else {
          this.setState({
            errorMsg: 'Empty content'
          });
        }

      });
    } else {
      this.setState({
        errorMsg: 'Empty title'
      });
    }
  };

  render() {
    const { loggedIn, addArticleSuccess } = this.props;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    const { errorMsg, submitted } = this.state;
    const error = errorMsg ? errorMsg : null;

    if (addArticleSuccess && submitted) {
      alert('Ok');
    }

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
              <EmailEditor
                ref={editor => this.editor = editor}
              />
            </div>
          </div>

          <div className="uk-margin">
            {error}
          </div>

          <div className="uk-margin">
            <input className="uk-button uk-button-primary" type="button" value="Add" onClick={this.onAddArticle} />
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
  addArticle: articleActions.addArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
