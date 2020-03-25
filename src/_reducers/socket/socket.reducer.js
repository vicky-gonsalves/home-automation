import { socketConstants } from '../../_constants';

const initialState = {
  isSocketFetching: false,
  connected: false,
};

const socket = (state = initialState, action) => {
  switch (action.type) {
    case socketConstants.SOCKET_INIT:
      return {
        ...state,
        isSocketFetching: true,
      };
    case socketConstants.CONNECTED:
      return {
        ...state,
        isSocketFetching: false,
        connected: true,
      };
    case socketConstants.DISCONNECTED:
      return {
        ...state,
        connected: false,
        isSocketFetching: false,
      };
    default:
      return state;
  }
};

export default socket;
