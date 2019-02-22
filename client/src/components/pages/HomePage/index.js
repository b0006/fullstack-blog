import React, { Component } from 'react';

import BlogList from '../../BlogList';

class HomePage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <BlogList />
        </div>
        <div className="col-md-4">
          sidebar
        </div>
      </div>
    );
  }
}

export default HomePage;
