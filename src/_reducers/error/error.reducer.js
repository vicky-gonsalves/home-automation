import { errorConstants } from '../../_constants';

const initialState = {
  message: null,
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case errorConstants.SET_ERROR:
      return {
        ...state,
        message: action.payload.error,
      };

    case errorConstants.CLEAR_ERROR:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default error;
