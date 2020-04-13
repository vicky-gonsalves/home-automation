import { sharedDeviceConstants } from '../../_constants';

const initialState = {
  sharedDevices: [],
};

const sharedDevice = (state = initialState, action) => {
  switch (action.type) {
    case sharedDeviceConstants.SHARED_DEVICE_STORE_ALL:
      return {
        ...state,
        sharedDevices: action.payload,
      };

    case sharedDeviceConstants.SHARED_DEVICE_CREATED:
      return {
        ...state,
        sharedDevices: [...state.sharedDevices, action.payload],
      };

    case sharedDeviceConstants.SHARED_DEVICE_DELETED:
      return {
        ...state,
        sharedDevices: state.sharedDevices.filter(device => device.deviceId !== action.payload.deviceId),
      };

    case sharedDeviceConstants.SHARED_DEVICE_REMOVE_ALL:
      return {
        ...state,
        sharedDevices: [],
      };

    default:
      return state;
  }
};

export default sharedDevice;
