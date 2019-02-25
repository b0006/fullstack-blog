import React, { Component } from 'react';

import icon from './spinner.svg';

class Spinner extends Component {
  render() {
    return (
      <img src={icon} alt="Loading..."/>
    );
  }
}

export default Spinner;
