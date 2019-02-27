import React, { Component } from 'react';
import { connect } from 'react-redux';

class UpdateArticle extends Component {
  componentDidMount() {
    console.log(this.props.match.params);
  }

  render() {
    return (
      <div>update</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(UpdateArticle);
