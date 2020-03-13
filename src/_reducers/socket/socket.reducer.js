import { socketConstants } from '../../_constants';

const initialState = {
  isSocketFetching: false,
};

const Socket = (state = initialState, action) => {
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

export default Socket;
