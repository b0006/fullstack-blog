import React, { Component } from 'react';

import './ModalAlert.css';

class ModalAlert extends Component {
  render() {
    const { closeModal, title, text, btnOkText } = this.props;

    return (
      <div className="uk-modal-body">
        <h2 className="uk-modal-title">{title}</h2>
        <p>{text}</p>
        <p className="uk-text-right">
          <button className="uk-button uk-button-primary" type="button" onClick={closeModal}>{btnOkText}</button>
        </p>
      </div>
    );
  }
}

export default ModalAlert;
