import { adminUserConstants } from '../../_constants';

const initialState = {
  isFetchingUsersList: false,
  users: [],
  count: 0,
};

const adminUser = (state = initialState, action) => {
  switch (action.type) {
    case adminUserConstants.STORE_USERS:
      return {
        ...state,
        users: action.payload.users,
        count: action.payload.count,
      };

    case adminUserConstants.SET_FETCHING_USERS:
      return {
        ...state,
        isFetchingUsersList: action.payload,
      };

    default:
      return state;
  }
};

export default adminUser;
