import { adminDeviceConstants } from '../../_constants';

const initialState = {
  isFetchingDevicesList: false,
  fetchedDevicesList: false,
  devices: [],
  device: {},
  fetchedEditableDevice: false,
  deviceInProgress: false,
  count: 0,
};

const adminDevice = (state = initialState, action) => {
  switch (action.type) {
    case adminDeviceConstants.STORE_DEVICES:
      return {
        ...state,
        devices: action.payload.devices,
        count: action.payload.count,
      };

    case adminDeviceConstants.SET_FETCHING_DEVICES:
      return {
        ...state,
        isFetchingDevicesList: action.payload,
      };

    case adminDeviceConstants.SET_FETCHED_DEVICES:
      return {
        ...state,
        fetchedDevicesList: action.payload,
      };

    case adminDeviceConstants.STORE_DEVICE:
      return {
        ...state,
        device: action.payload,
      };

    case adminDeviceConstants.SET_FETCHED_EDITABLE_DEVICE:
      return {
        ...state,
        fetchedEditableDevice: action.payload,
      };

    case adminDeviceConstants.SET_DEVICE_PROGRESS:
      return {
        ...state,
        deviceInProgress: action.payload,
      };

    case adminDeviceConstants.CLEAR_DEVICE:
      return {
        ...state,
        fetchedEditableDevice: false,
        device: {},
      };

    case adminDeviceConstants.DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device.deviceId !== action.payload),
      };

    case adminDeviceConstants.SET_DEVICE_TO_BE_DELETED:
      const devices = [];
      state.devices.forEach(device => {
        if (device.deviceId === action.payload) {
          device.toBeDeleted = true;
        }
        devices.push(device);
      });

      return {
        ...state,
        devices,
      };

    case adminDeviceConstants.UNSET_DEVICE_TO_BE_DELETED:
      const resetDevices = [];
      state.devices.forEach(device => {
        if (device.deviceId === action.payload) {
          device.toBeDeleted = false;
        }
        resetDevices.push(device);
      });

      return {
        ...state,
        devices: resetDevices,
      };

    default:
      return state;
  }
};

export default adminDevice;
