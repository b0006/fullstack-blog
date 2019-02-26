import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ArticleAdmin from '../../containers/ArticleAdmin';

class NewArticle extends Component {
  render() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <ArticleAdmin action="add" />
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(NewArticle);
