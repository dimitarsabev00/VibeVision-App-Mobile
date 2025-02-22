import { CLEAR_MODAL, MODAL_OPEN_COMMENT_SECTION } from "../constants";

export const openCommentModal = (open, data) => (dispatch) => {
  return dispatch({
    type: MODAL_OPEN_COMMENT_SECTION,
    open,
    data,
    modalType: 0,
  });
};

export const clearModal = () => (dispatch) => {
  return dispatch({
    type: CLEAR_MODAL,
  });
};
