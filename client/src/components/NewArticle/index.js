import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EmailEditor from 'react-email-editor';

import { articleActions } from '../../actions';

class NewArticle extends Component {
  state = {
    title: '',
    content: ''
  };

  exportHtml = (event) => {
    event.preventDefault();

    this.editor.exportHtml(data => {
      const { /*design,*/ html } = data;

      this.setState({
        content: html
      });
    });
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  onAddArticle = () => {
    const { addArticle } = this.props;
    const { title, content } = this.state;

    addArticle(title, content);
  };

  render() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return <Redirect to="/" />;
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

          <h1>react-email-editor Demo</h1>

          <input type="button" value="Add" onClick={this.onAddArticle} />

          <div>
            <button onClick={this.exportHtml}>Export HTML</button>
          </div>

          <div>
            <p dangerouslySetInnerHTML={{__html: this.state.content}} />
          </div>

          <EmailEditor
            ref={editor => this.editor = editor}
          />
        </fieldset>
      </form>
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
  addArticle: articleActions.addArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
