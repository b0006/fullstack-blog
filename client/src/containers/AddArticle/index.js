import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AddArticle.css';

class AddArticle extends Component {
  render() {
    return (
      <div className="blog-item">
        <div className="uk-inline uk-margin uk-card uk-card-hover uk-card-default">
          <div className="uk-card-body">
            <Link to="/newArticle">
              <span className="uk-position-medium uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle" data-uk-icon="icon: file-edit; ratio: 15" />
              <div className="uk-position-medium uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
                <span data-uk-icon="icon: plus; ratio: 3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AddArticle;
