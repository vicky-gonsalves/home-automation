import { errorConstants } from '../../_constants';

const clearError = () => dispatch => {
  dispatch({
    type: errorConstants.CLEAR_ERROR,
  });
};

const setError = error => {
  return {
    type: errorConstants.SET_ERROR,
    payload: { error },
  };
};

export const errorActions = {
  clearError,
  setError,
};
