import { deviceConstants } from '../../_constants';

const initialState = {
  isFetchingDevice: true,
  hasError: false,
  devices: [],
};

const device = (state = initialState, action) => {
  switch (action.type) {
    case deviceConstants.DEVICE_UPDATE_FETCHING:
      return {
        ...state,
        isFetchingDevice: true,
      };
    case deviceConstants.DEVICE_STORE_ALL:
      return {
        ...state,
        isFetchingDevice: false,
        devices: action.payload,
      };
    case deviceConstants.DEVICE_GET_ERROR:
      return {
        ...state,
        isFetchingDevice: false,
        hasError: true,
        devices: [],
      };
    case deviceConstants.DEVICE_REMOVE_ALL:
      return {
        ...state,
        isFetchingDevice: false,
        hasError: false,
        devices: [],
      };
    case deviceConstants.DEVICE_UPDATED:
      return {
        ...state,
        devices: state.devices.map(device => (device.deviceId === action.payload.deviceId ? { ...action.payload } : device)),
      };
    case deviceConstants.DEVICE_DELETED:
      return {
        ...state,
        devices: state.devices.filter(device => device.deviceId !== action.payload.deviceId),
      };
    case deviceConstants.DEVICE_CREATED:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    default:
      return state;
  }
};

export default device;
