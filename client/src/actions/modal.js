import UIkit from 'uikit';

import { modalConstants, articleConstants } from '../constants';

function showModal(modalProps, modalType) {
  const { action } = modalProps;
  if (action === articleConstants.ARTICLE_DELETE_REQUEST) {
    if(document.getElementById('test_id'))
      UIkit.modal(document.getElementById('test_id')).show();
  }

  return dispatch => {
    dispatch({
      type: modalConstants.SHOW_MODAL,
      modalProps,
      modalType
    });
  };
}

function hideModal() {
  return dispatch => {
    dispatch({
      type: modalConstants.HIDE_MODAL
    });
  };
}

export {
  showModal,
  hideModal
};
