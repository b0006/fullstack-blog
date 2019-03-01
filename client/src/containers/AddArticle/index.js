import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AddArticle.css';

class AddArticle extends Component {
  render() {
    return (
      <div className="blog-item">
        <div className="uk-card uk-card-hover uk-card-default">
          <Link to={'/newArticle'}>
            <div className="uk-card-body icon-plus">
              <span data-uk-icon="icon: plus; ratio: 4" />
              <p className="blog-item__desc">You can create a new article with editor</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default AddArticle;
