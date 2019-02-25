import React, { Component } from 'react';

import './BlogItem.css';

import nodejs from './nodejs.png';
import iconTemp from './spinner.svg';

class BlogItem extends Component {
  state = {
    showDesc: false
  };

  onChange = () => {
    this.setState({
      showDesc: !this.state.showDesc
    });
  }

  onShowDesc = () => {
    this.setState({
      showDesc: true
    });
  };

  onShowImg = () => {
    this.setState({
      showDesc: false
    });
  };

  render() {
    const { showDesc } = this.state;
    let { img, description, title, icon } = this.props;
    if (!img) {
      img = iconTemp;
    }

    if (!icon) {
      icon = nodejs;
    }

    // const img = iconTemp;
    // const description = 'Description of an article';
    // const title = 'Article title Article title Article title Article title Article title';
    // const icon = nodejs;

    const imgBody = showDesc ?
      <div className="card__desc">
        {description}
      </div>
      :
      <div className="card__img">
        <img src={img} alt='img' />
      </div>;

    return (
      <div className="card" onMouseEnter={this.onShowDesc} onMouseLeave={this.onShowImg} /*onClick={this.onChange}*/ >
        {imgBody}
        <div className="row">
          <div className="col-md-3">
            <span className="card__icon">
              <img src={icon} alt='icon' />
            </span>
          </div>
          <div className="col-md-9">
            <span className="card__title">
              {title}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogItem;
