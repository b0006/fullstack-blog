import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../../actions';
import Preloader from '../Preloader';

class Article extends Component {
  componentDidMount() {
    const { getArticleByValue, match } = this.props;
    getArticleByValue(match.params.value);
  }

  render() {
    const { currentArticle, currentArticleLoading } = this.props;

    if (currentArticleLoading) {
      return <Preloader />;
    }

    return (
      <div>
        <h2>{currentArticle.title}</h2>
        <div>
          {currentArticle.text}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentArticle, currentArticleLoading } = state.article;
  return {
    currentArticle,
    currentArticleLoading
  };
};

const mapDispatchToProps = {
  getArticleByValue: articleActions.getArticleByValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
