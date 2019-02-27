import React, { Component } from 'react';

class ArticleInner extends Component {
  render() {
    const { title, text } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <div>
          <p dangerouslySetInnerHTML={{__html: text}} />
        </div>
      </div>
    );
  }
}

export default ArticleInner;
