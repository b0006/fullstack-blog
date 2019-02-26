import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
  };

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

    const { loggedIn } = this.props;
    const updateArticleBtn = loggedIn
      ? <Link to={'/updateArticle?id=1'}><button className="uk-button uk-button-secondary">Изменить</button></Link>
      : null;

    // const img = iconTemp;
    // const description = 'Description of an article';
    // const title = 'Article title Article title Article title Article title Article title';
    // const icon = nodejs;

    return (
      <div className="blog-item" onMouseEnter={this.onShowDesc} onMouseLeave={this.onShowImg}>
        <div className="uk-card uk-card-hover uk-card-default">
          <div className="uk-card-media-top uk-text-center">
            <img src={img} alt="" />
          </div>
          <div className="uk-card-body">
            <h3 className="uk-card-title">{title}</h3>
            <p className="blog-item__desc">{description}</p>
            <div className="blog-item__button">
              {updateArticleBtn}
              <button className="uk-button uk-button-primary">Читать ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(BlogItem);
