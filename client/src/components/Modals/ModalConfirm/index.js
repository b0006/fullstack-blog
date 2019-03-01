import React, { Component } from 'react';

class ModalConfirm extends Component {
  render() {
    const { closeModal, title, text, btnOkText, btnCancelText, confirmAction } = this.props;

    return (
      <div className="uk-modal-body">
        <h2 className="uk-modal-title">{title}</h2>
        <p>{text}</p>
        <p className="uk-text-right">
          <button className="uk-button uk-button-default uk-modal-close" type="button" onClick={closeModal}>{btnCancelText}</button>
          <button className="uk-button uk-button-primary" type="button" onClick={() => { closeModal(); confirmAction(); }}>{btnOkText}</button>
        </p>
      </div>
    );
  }
}

export default ModalConfirm;
