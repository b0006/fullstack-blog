import React, { Component } from 'react';
import Spinner from '../../containers/Spinner';

import './Preloader.css';

class Preloader extends Component {
  render() {
    return (
      <div className="loader_outer">
        <span className="loader_inner">
          <Spinner />
        </span>
      </div>
    );
  }
}

export default Preloader;
