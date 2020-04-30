import { adminUserConstants } from '../../_constants';

const initialState = {
  isFetchingUsersList: false,
  fetchedUsersList: false,
  users: [],
  user: {},
  fetchedEditableUser: false,
  userInProgress: false,
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

    case adminUserConstants.SET_FETCHED_USERS:
      return {
        ...state,
        fetchedUsersList: action.payload,
      };

    case adminUserConstants.STORE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case adminUserConstants.SET_FETCHED_EDITABLE_USER:
      return {
        ...state,
        fetchedEditableUser: action.payload,
      };

    case adminUserConstants.SET_USER_PROGRESS:
      return {
        ...state,
        userInProgress: action.payload,
      };

    case adminUserConstants.CLEAR_USER:
      return {
        ...state,
        fetchedEditableUser: false,
        fetchedUsersList: false,
        users: [],
        user: {},
        count: 0,
      };

    default:
      return state;
  }
};

export default adminUser;
