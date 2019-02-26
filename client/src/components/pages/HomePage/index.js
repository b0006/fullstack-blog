import React, { Component } from 'react';

import BlogList from '../../BlogList';

class HomePage extends Component {
  render() {
    return (
      <div className="uk-margin">
        <BlogList />
      </div>
    );
  }
}

export default HomePage;
