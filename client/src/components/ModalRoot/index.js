import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { default as modalTypes } from './../Modals';

const MODAL_TYPES = {
  'alert': modalTypes.ModalAlert,
  'confirm': modalTypes.ModalConfirm
  // 'delete': modalTypes.deleteModal,
  // 'prompt': modalTypes.promptModal
};

class ModalContainer extends React.Component {
  state = {
    modalIsOpen: false
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      });
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { modalIsOpen } = this.state;
    const { modalType, modalProps } = this.props;

    if (!modalType) {
      return null;
    }
    const SpecifiedModal = MODAL_TYPES[modalType];
    return (
      <div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          overlayClassName="overlay"
          className="modal"
        >
          <SpecifiedModal
            closeModal={this.closeModal}
            {...modalProps}
          />
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { modalProps, modalType } = state.modal;
  return {
    modalProps,
    modalType
  };
};

export default connect(mapStateToProps)(ModalContainer);
