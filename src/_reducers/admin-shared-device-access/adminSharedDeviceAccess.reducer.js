import { adminSharedDeviceAccessConstants } from '../../_constants';

const initialState = {
  isFetchingSharedDeviceAccessList: false,
  fetchedSharedDeviceAccessList: false,
  sharedDeviceAccesses: [],
  sharedDeviceAccess: {},
  fetchedEditableSharedDeviceAccess: false,
  sharedDeviceAccessInProgress: false,
  count: 0,
};

const adminSharedDeviceAccess = (state = initialState, action) => {
  switch (action.type) {
    case adminSharedDeviceAccessConstants.STORE_SHARED_DEVICE_ACCESSES:
      return {
        ...state,
        sharedDeviceAccesses: action.payload.sharedDeviceAccesses,
        count: action.payload.count,
      };

    case adminSharedDeviceAccessConstants.SET_FETCHING_SHARED_DEVICE_ACCESSES:
      return {
        ...state,
        isFetchingSharedDeviceAccessList: action.payload,
      };

    case adminSharedDeviceAccessConstants.SET_FETCHED_SHARED_DEVICE_ACCESSES:
      return {
        ...state,
        fetchedSharedDeviceAccessList: action.payload,
      };

    case adminSharedDeviceAccessConstants.STORE_SHARED_DEVICE_ACCESS:
      return {
        ...state,
        sharedDeviceAccess: action.payload,
      };

    case adminSharedDeviceAccessConstants.SET_FETCHED_EDITABLE_SHARED_DEVICE_ACCESS:
      return {
        ...state,
        fetchedEditableSharedDeviceAccess: action.payload,
      };

    case adminSharedDeviceAccessConstants.SET_SHARED_DEVICE_ACCESS_PROGRESS:
      return {
        ...state,
        sharedDeviceAccessInProgress: action.payload,
      };

    case adminSharedDeviceAccessConstants.CLEAR_SHARED_DEVICE_ACCESS:
      return {
        ...state,
        sharedDeviceAccess: {},
        fetchedEditableSharedDeviceAccess: false,
      };

    case adminSharedDeviceAccessConstants.DELETE_SHARED_DEVICE_ACCESS:
      return {
        ...state,
        sharedDeviceAccesses: state.sharedDeviceAccesses.filter(
          sharedDeviceAccess => sharedDeviceAccess.id !== action.payload
        ),
      };

    case adminSharedDeviceAccessConstants.SET_SHARED_DEVICE_ACCESS_TO_BE_DELETED:
      const sharedDeviceAccesses = [];
      state.sharedDeviceAccesses.forEach(sharedDeviceAccess => {
        if (sharedDeviceAccess.id === action.payload) {
          sharedDeviceAccess.toBeDeleted = true;
        }
        sharedDeviceAccesses.push(sharedDeviceAccess);
      });

      return {
        ...state,
        sharedDeviceAccesses,
      };

    case adminSharedDeviceAccessConstants.UNSET_SHARED_DEVICE_ACCESS_TO_BE_DELETED:
      const resetDevices = [];
      state.sharedDeviceAccesses.forEach(sharedDeviceAccess => {
        if (sharedDeviceAccess.id === action.payload) {
          sharedDeviceAccess.toBeDeleted = false;
        }
        resetDevices.push(sharedDeviceAccess);
      });

      return {
        ...state,
        sharedDeviceAccesses: resetDevices,
      };

    default:
      return state;
  }
};

export default adminSharedDeviceAccess;
