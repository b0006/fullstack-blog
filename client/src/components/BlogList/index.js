import React, { Component } from 'react';
import { connect } from 'react-redux';

import { articleActions } from '../../actions';

import BlogItem from './BlogItem';

class BlogList extends Component {

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  render() {
    const { articleList } = this.props;

    return (
      <div className="row">
        {
          articleList.map(item => (
            <div key={'article_item_' + item.id} className="col-md-6">
              <BlogItem
                title={item.title}
                img={null}
                description={item.description}
                icon={null}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {  articleGetError, articleList} = state.article;
  return {
    articleGetError,
    articleList
  };
};

const mapDispatchToProps = {
  getList: articleActions.getList
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
