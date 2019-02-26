import React, { Component } from 'react';

class ArticleAdmin extends Component {
  render() {
    const { action } = this.props;

    return (
      <div>
        {action}
      </div>
    );
  }
}

export default ArticleAdmin;
