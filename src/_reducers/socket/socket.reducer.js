import { socketConstants } from '../../_constants';

const initialState = {
  isSocketFetching: false,
};

const socket = (state = initialState, action) => {
  switch (action.type) {
    case socketConstants.SOCKET_INIT:
      return {
        ...state,
        isSocketFetching: true,
      };
    default:
      return state;
  }
};

export default socket;
