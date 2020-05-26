import { adminSubDeviceConstants } from '../../_constants';

const initialState = {
  isFetchingSubDevicesList: false,
  fetchedDevicesList: false,
  subDevices: [],
  subDevice: {},
  fetchedEditableDevice: false,
  subDeviceInProgress: false,
  count: 0,
};

const adminSubDevice = (state = initialState, action) => {
  switch (action.type) {
    case adminSubDeviceConstants.STORE_SUB_DEVICES:
      return {
        ...state,
        subDevices: action.payload.subDevices,
        count: action.payload.count,
      };

    case adminSubDeviceConstants.SET_FETCHING_SUB_DEVICES:
      return {
        ...state,
        isFetchingSubDevicesList: action.payload,
      };

    case adminSubDeviceConstants.SET_FETCHED_SUB_DEVICES:
      return {
        ...state,
        fetchedDevicesList: action.payload,
      };

    case adminSubDeviceConstants.STORE_SUB_DEVICE:
      return {
        ...state,
        subDevice: action.payload,
      };

    case adminSubDeviceConstants.SET_FETCHED_EDITABLE_SUB_DEVICE:
      return {
        ...state,
        fetchedEditableDevice: action.payload,
      };

    case adminSubDeviceConstants.SET_SUB_DEVICE_PROGRESS:
      return {
        ...state,
        subDeviceInProgress: action.payload,
      };

    case adminSubDeviceConstants.CLEAR_SUB_DEVICE:
      return {
        ...state,
        subDevice: {},
        fetchedEditableDevice: false,
      };

    case adminSubDeviceConstants.DELETE_SUB_DEVICE:
      return {
        ...state,
        subDevices: state.subDevices.filter(subDevice => subDevice.subDeviceId !== action.payload),
      };

    case adminSubDeviceConstants.SET_SUB_DEVICE_TO_BE_DELETED:
      const subDevices = [];
      state.subDevices.forEach(subDevice => {
        if (subDevice.subDeviceId === action.payload) {
          subDevice.toBeDeleted = true;
        }
        subDevices.push(subDevice);
      });

      return {
        ...state,
        subDevices,
      };

    case adminSubDeviceConstants.UNSET_SUB_DEVICE_TO_BE_DELETED:
      const resetDevices = [];
      state.subDevices.forEach(subDevice => {
        if (subDevice.subDeviceId === action.payload) {
          subDevice.toBeDeleted = false;
        }
        resetDevices.push(subDevice);
      });

      return {
        ...state,
        subDevices: resetDevices,
      };

    default:
      return state;
  }
};

export default adminSubDevice;
