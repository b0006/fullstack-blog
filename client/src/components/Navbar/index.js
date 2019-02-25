import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-right">
          <Link to="/">Node.js</Link>
          <Link to="/">React</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
